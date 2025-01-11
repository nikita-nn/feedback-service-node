FROM oven/bun:latest

COPY package.json ./
COPY src ./

RUN bun install

RUN bun build ./server.ts --outdir ./build --target bun

CMD ["bun", "./build/server.js"]