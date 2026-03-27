#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
: "${DEPLOY_IMAGE:?DEPLOY_IMAGE is required}"
: "${ACR_REGISTRY:?ACR_REGISTRY is required}"
: "${ACR_USERNAME:?ACR_USERNAME is required}"
: "${ACR_PASSWORD:?ACR_PASSWORD is required}"

COMPOSE_FILE="${DEPLOY_PATH}/docker-compose.prod.yml"
HOST_PORT="${HOST_PORT:-25001}"
APP_DOMAIN="${APP_DOMAIN:-next.admin.bzsh.fun}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://127.0.0.1:${HOST_PORT}/api/health}"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Compose file not found: $COMPOSE_FILE" >&2
  exit 1
fi

cd "$DEPLOY_PATH"

echo "$ACR_PASSWORD" | docker login "$ACR_REGISTRY" -u "$ACR_USERNAME" --password-stdin
export DEPLOY_IMAGE CONTAINER_NAME HOST_PORT APP_PORT APP_DOMAIN

docker compose -f "$COMPOSE_FILE" pull

docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

for _ in $(seq 1 30); do
  if curl -fsS "$HEALTHCHECK_URL" >/dev/null; then
    echo "Deploy succeeded: next-admin is responding on ${HEALTHCHECK_URL}."
    echo "Suggested public URL: https://${APP_DOMAIN}"
    exit 0
  fi
  sleep 2
done

echo "Health check failed, dumping container state..." >&2
docker compose -f "$COMPOSE_FILE" ps >&2 || true
docker compose -f "$COMPOSE_FILE" logs --no-color --tail=200 >&2 || true
exit 1
