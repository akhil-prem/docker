#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Login to Docker Hub using token
echo $DOCKER_ACCESS_TOKEN | docker login --username $DOCKER_USERNAME --password-stdin

# Start the Docker Compose services
docker-compose up
