docker buildx build --platform linux/arm64 -t shellcodesniper/luna-x-api:latest --push .
docker buildx build --platform linux/arm64 -t shellcodesniper/luna-x-api:stable --push .
#docker buildx build --platform linux/arm64 -t shellcodesniper/luna-x-api:rollback --push .
