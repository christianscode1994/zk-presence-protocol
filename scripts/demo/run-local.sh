#!/usr/bin/env bash
set -e
echo "Run web locally (install pnpm globally if needed)."
pnpm install
pnpm dev:web
