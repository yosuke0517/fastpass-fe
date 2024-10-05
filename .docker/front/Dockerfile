# 開発環境
FROM node:20.18.0-bullseye-slim AS dev

WORKDIR /app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get autoremove -y && \
    yarn set version berry && \
    # DockleのCRITICAL対策
    rm -rf /var/lib/apt/lists

COPY ./src/ /app

# ベースイメージ
FROM node:20.18.0-bullseye-slim AS base

# ビルド環境
FROM base AS builder

WORKDIR /app
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get autoremove -y && \
    # Yarnのバージョンを上げる
    yarn set version berry && \
    # DockleのCRITICAL対策
    rm -rf /var/lib/apt/lists

COPY . .
RUN yarn --immutable && \
    yarn build

# 実行環境
FROM builder AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN groupadd -r nodejs &&  \
    useradd -r -u 1001 -g nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]

# 実行環境 (開発用)
FROM runner AS dev-runner
ENV NODE_ENV=development
