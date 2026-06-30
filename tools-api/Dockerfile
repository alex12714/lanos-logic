FROM node:20-alpine
WORKDIR /app
COPY package.json server.js ./
ENV PORT=8090 NODE_ENV=production
EXPOSE 8090
USER node
CMD ["node", "server.js"]
