#!/bin/bash
yes | cp -rf ./backend/.env.docker.development.sample ./backend/.env.development
yes | cp -rf ./frontend/.env.docker.development.sample ./frontend/.env.development
if [ ! -f .env ]; then yes | cp -rf .env.sample .env; fi
source .env && docker compose -f docker-compose.dev.yml up --build --force-recreate --pull always