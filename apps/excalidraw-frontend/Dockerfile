FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace config files first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json files for all workspaces (needed for pnpm install)
COPY apps/excalidraw-frontend/package.json ./apps/excalidraw-frontend/
COPY packages/ ./packages/

# Install dependencies (node_modules excluded from build context via .dockerignore)
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY apps/excalidraw-frontend/ ./apps/excalidraw-frontend/

WORKDIR /app/apps/excalidraw-frontend

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
