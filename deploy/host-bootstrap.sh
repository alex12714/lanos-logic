#!/bin/bash
# Thin bootstrap (host-only). Pulls the latest repo, then hands off to the
# canonical, git-tracked deploy script at repo/deploy.sh. All deploy LOGIC now
# lives in git — change repo/deploy.sh and it takes effect on the next deploy,
# so this host copy never drifts again. Older standalone versions are kept as
# deploy.sh.bak.* on this host.
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SITE_DIR=/data/websites/lanos-logic.com
LOG=/var/log/lanos-logic-deploy.log

echo "[$(date)] Bootstrap: pulling repo + handing off to repo/deploy.sh..." >> $LOG
cd "$SITE_DIR/repo" && /usr/bin/git fetch origin && git reset --hard origin/main >> $LOG 2>&1

if [ -f "$SITE_DIR/repo/deploy.sh" ]; then
    exec /bin/bash "$SITE_DIR/repo/deploy.sh"
else
    echo "[$(date)] ERROR: repo/deploy.sh missing — aborting (site left untouched)." >> $LOG
    exit 1
fi
