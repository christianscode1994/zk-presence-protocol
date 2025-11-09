#!/usr/bin/env bash
DB_FILE="apps/web/data/db.json"
if [ -f "$DB_FILE" ]; then
  rm "$DB_FILE"
  echo "Removed $DB_FILE"
else
  echo "DB not found"
fi
