#!/usr/bin/env bash
#
# Publish the Lanos Logic MCP server to the official MCP Registry.
#
# Namespace ownership is proven with HTTP authentication: a public key is served
# at https://lanos-logic.com/.well-known/mcp-registry-auth. That is easier than
# the DNS method here, because /.well-known/ is already part of this repo and
# ships with the normal deploy — no registrar access needed.
#
# The private key (key.pem) NEVER leaves your machine and is gitignored. Only the
# public key is published.
#
# Run in two steps:
#
#   ./mcp-server/publish-to-registry.sh keygen     # then commit + push + deploy
#   ./mcp-server/publish-to-registry.sh publish    # after the file is live
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOMAIN="lanos-logic.com"
KEY_FILE="$REPO_ROOT/mcp-server/key.pem"
AUTH_FILE="$REPO_ROOT/frontend/public/.well-known/mcp-registry-auth"
AUTH_URL="https://$DOMAIN/.well-known/mcp-registry-auth"

need() { command -v "$1" >/dev/null 2>&1 || { echo "ERROR: '$1' not found. $2" >&2; exit 1; }; }

case "${1:-}" in
  keygen)
    need openssl "Install it with: brew install openssl"
    if [ -f "$KEY_FILE" ]; then
      echo "ERROR: $KEY_FILE already exists. Delete it first if you really want a new key." >&2
      echo "       (Regenerating invalidates the key the registry has on file.)" >&2
      exit 1
    fi
    openssl genpkey -algorithm Ed25519 -out "$KEY_FILE"
    chmod 600 "$KEY_FILE"
    PUBLIC_KEY="$(openssl pkey -in "$KEY_FILE" -pubout -outform DER | tail -c 32 | base64)"
    mkdir -p "$(dirname "$AUTH_FILE")"
    printf 'v=MCPv1; k=ed25519; p=%s\n' "$PUBLIC_KEY" > "$AUTH_FILE"
    echo
    echo "Wrote private key : $KEY_FILE   (gitignored — do not commit, do not lose)"
    echo "Wrote public proof: $AUTH_FILE"
    echo
    cat "$AUTH_FILE"
    echo
    echo "Next:"
    echo "  git add frontend/public/.well-known/mcp-registry-auth && git commit -m 'chore(mcp): registry auth proof' && git push"
    echo "  # wait for the deploy, confirm it is live:"
    echo "  curl -s $AUTH_URL"
    echo "  # then:"
    echo "  ./mcp-server/publish-to-registry.sh publish"
    ;;

  publish)
    need openssl "Install it with: brew install openssl"
    need mcp-publisher "Install it with: brew install mcp-publisher"
    [ -f "$KEY_FILE" ] || { echo "ERROR: $KEY_FILE missing. Run '$0 keygen' first." >&2; exit 1; }

    echo "Checking the proof file is live at $AUTH_URL ..."
    LIVE="$(curl -fsS "$AUTH_URL" || true)"
    if ! printf '%s' "$LIVE" | grep -q '^v=MCPv1;'; then
      echo "ERROR: $AUTH_URL is not serving the proof yet." >&2
      echo "       Got: ${LIVE:-<empty or non-200>}" >&2
      echo "       Commit + push the .well-known/mcp-registry-auth file and let the deploy finish." >&2
      exit 1
    fi
    if ! diff -q <(printf '%s\n' "$LIVE") "$AUTH_FILE" >/dev/null 2>&1; then
      echo "WARNING: the live proof differs from the local one. The registry will use the live copy." >&2
    fi
    echo "  live: $LIVE"

    PRIVATE_KEY="$(openssl pkey -in "$KEY_FILE" -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
    mcp-publisher login http --domain "$DOMAIN" --private-key "$PRIVATE_KEY"

    cd "$REPO_ROOT/mcp-server"
    mcp-publisher publish

    echo
    echo "Verifying it is listed..."
    curl -s "https://registry.modelcontextprotocol.io/v0.1/servers?search=com.lanos-logic" | head -c 800
    echo
    ;;

  *)
    sed -n '2,20p' "$0"
    exit 1
    ;;
esac
