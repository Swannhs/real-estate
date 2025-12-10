#!/bin/bash

# Function to check if .env file exists
check_env() {
    if [ ! -f .env ]; then
        echo "Creating .env from .env.example..."
        if [ -f .env.example ]; then
            cp .env.example .env
        else
            echo "Error: .env.example not found!"
            exit 1
        fi
    fi
}

# Function to start the development environment
start_dev() {
    echo "Starting development environment..."
    docker compose \
        -f docker-compose.yml \
        -f docker-compose-services.yml \
        -f docker-compose-ui.yml \
        -f docker-compose-discovery.yml \
        up -d --build --remove-orphans
}

# Function to stop the development environment
stop_dev() {
    echo "Stopping development environment..."
    docker compose \
        -f docker-compose.yml \
        -f docker-compose-services.yml \
        -f docker-compose-ui.yml \
        -f docker-compose-discovery.yml \
        down
}

# Main script logic
check_env

if [ "$1" == "stop" ]; then
    stop_dev
else
    start_dev
fi
