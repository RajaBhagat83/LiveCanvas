FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate 

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./  

COPY /apps/ws-backend/package.json ./apps/ws-backend/

COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY /apps/ws-backend/ ./apps/ws-backend/

WORKDIR /app/apps/ws-backend/

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 8080

CMD [ "pnpm","run","dev" ]