from node:20-alpine as builder
workdir /app
copy package*.json ./
run npm install
copy tsconfig.json ./
copy src ./src
run npm run build

from node:20-alpine
workdir /app
copy --from=builder /app/package*.json ./
copy --from=builder /app/node_modules ./node_modules
copy --from=builder /app/dist ./dist
expose 3000
cmd ["node", "dist/index.js"]