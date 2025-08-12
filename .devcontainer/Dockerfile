FROM node:20

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Installer NestJS CLI et pnpm en root
RUN npm install -g @nestjs/cli pnpm

WORKDIR /workspace

# Switch vers l’utilisateur node pour coder en sécurité
USER node
