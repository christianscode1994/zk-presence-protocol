#!/usr/bin/env bash
# scripts/run-local-chain.sh
# Quick script to run a Substrate dev node with your pallet for local testing.
# Adjust NODE_BINARY to the path of your built Substrate node that includes pallet-root-anchoring.

set -e

NODE_BINARY=${NODE_BINARY:-substrate-node-template}  # replace with your node binary name or full path
PORT=${PORT:-9944}
LOG="${LOG:-dev-node.log}"

echo "Starting local Substrate dev node (endpoint ws://127.0.0.1:${PORT})"
echo "Logfile: ${LOG}"

if command -v "${NODE_BINARY}" >/dev/null 2>&1; then
  "${NODE_BINARY}" --dev --ws-port "${PORT}" > "${LOG}" 2>&1 &
  NODE_PID=$!
else
  echo "Node binary '${NODE_BINARY}' not found in PATH."
  echo "Trying Docker fallback (requires docker)."
  docker run --rm -d --name substrate-dev -p "${PORT}":9944 ghcr.io/substrate-developer-hub/substrate-node:latest --dev > "${LOG}" 2>&1 || true
  NODE_PID=$(docker ps -q -f name=substrate-dev)
fi

echo "Node started with PID: ${NODE_PID}"
echo "Sleeping 4s to let node initialize..."
sleep 4

echo
echo "Run the anchor demo now:"
echo "  node examples/anchor-demo.js --endpoint ws://127.0.0.1:${PORT} --seed //Alice"
echo
echo "To stop the node: kill ${NODE_PID} or docker stop substrate-dev"

# wait for process so script doesn't exit if used in foreground
wait ${NODE_PID} || true
