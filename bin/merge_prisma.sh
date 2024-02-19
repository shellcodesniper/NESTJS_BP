#!/usr/bin/env bash
# NOTE : Merge All Partial Prisma Schema Files Into One File

if [ ! -d $(PWD)/prisma/ ]; then
  echo "[ERROR] Maybe You Are Not In The Project Root Directory"
  exit 1
else
  cat $(PWD)/prisma/base.prisma > $(PWD)/prisma/schema.prisma
  cat $(PWD)/prisma/partial_models/*.model.prisma >> $(PWD)/prisma/schema.prisma
  echo "[SUCCESS] Merge All Partial Prisma Schema Files Into One File"
  exit 0
fi

