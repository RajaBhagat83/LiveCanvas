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

# Client-side URLs — baked into the JS bundle at build time (browser-accessible)
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:8001
ARG NEXT_PUBLIC_WS_URL=ws://localhost:8080
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}

# Build the Next.js app (required – without this, `next start` fails)
RUN pnpm run build

# Server-side URLs — resolved at runtime inside the container (not baked at build time)
# Override these when running the container in Docker so SSR fetches reach the right services:
#   e.g. docker run -e SERVER_BACKEND_URL=http://http-backend:8001 ...
ENV SERVER_BACKEND_URL=http://http-backend:8001

EXPOSE 3000

CMD ["pnpm", "run", "start"]
