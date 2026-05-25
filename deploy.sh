#!/bin/bash
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
SITE_DIR=/data/websites/lanos-logic.com
LOG=/var/log/lanos-logic-deploy.log

echo "[$(date)] Starting deployment..." >> $LOG
cd $SITE_DIR/repo
/usr/bin/git fetch origin && git reset --hard origin/main >> $LOG 2>&1

# Sync nginx.conf from repo to site dir
if [ -f "$SITE_DIR/repo/nginx.conf" ]; then
    cp $SITE_DIR/repo/nginx.conf $SITE_DIR/nginx.conf
    echo "[$(date)] nginx.conf synced from repo" >> $LOG
fi

if [ -d "$SITE_DIR/repo/frontend" ]; then
    cd $SITE_DIR/repo/frontend
    echo "[$(date)] Installing dependencies..." >> $LOG
    /usr/bin/yarn install >> $LOG 2>&1

    echo "[$(date)] Building React app..." >> $LOG
    /usr/bin/yarn build >> $LOG 2>&1

    echo "[$(date)] Copying build to html..." >> $LOG
    rm -rf $SITE_DIR/html/*
    cp -r build/* $SITE_DIR/html/

    echo "[$(date)] Removing Emergent badge..." >> $LOG
    sed -i 's|<script src="https://assets.emergent.sh/scripts/emergent-main.js"></script>||g' $SITE_DIR/html/index.html
    sed -i 's|<a id="emergent-badge"[^>]*>.*</a>||g' $SITE_DIR/html/index.html

    docker cp $SITE_DIR/nginx.conf lanos-logic-com:/etc/nginx/conf.d/default.conf 2>/dev/null && \
    docker exec lanos-logic-com nginx -s reload >> $LOG 2>&1
else
    echo "[$(date)] Static site - copying files..." >> $LOG
    cp -r $SITE_DIR/repo/* $SITE_DIR/html/ 2>/dev/null || true
fi

# Rebuild and restart MCP server if mcp-server/ changed
if [ -d "$SITE_DIR/repo/mcp-server" ]; then
    echo "[$(date)] Rebuilding MCP server..." >> $LOG
    cd $SITE_DIR/repo/mcp-server

    # Regenerate data.json from JS source files
    if [ -f "extract_data.mjs" ]; then
        /usr/bin/node extract_data.mjs >> $LOG 2>&1
        echo "[$(date)] data.json regenerated" >> $LOG
    fi

    docker build -t lanos-mcp-server:latest . >> $LOG 2>&1
    cd /data/websites && docker compose up -d --force-recreate lanos-mcp >> $LOG 2>&1
    echo "[$(date)] MCP server restarted" >> $LOG
fi

echo "[$(date)] Deployment complete" >> $LOG
