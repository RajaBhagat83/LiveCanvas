FROM node:22-alpine

WORKDIR /app

# //bring pnpm in the container using node
RUN corepack enable && corepack prepare pnpm@latest --activate 

#  //needed to configure workspace in the package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./  

COPY apps/http-backend/package.json ./apps/http-backend/ 

# //copy all packages folder of the turbo-repo
COPY packages/ ./packages   

  # //--fronzen-lockfile means install all the depe without modifying it
RUN pnpm install --frozen-lockfile 

  # //copy rest of  the code
COPY /apps/http-backend/ ./apps/http-backend/  

#  // this is the working directory for the container
WORKDIR /app/apps/http-backend 

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm --filter @repo/db run generate

EXPOSE 8001

CMD ["pnpm","run","dev:docker"]