#!/bin/bash
yes | cp -rf ./backend/.env.docker.production.sample ./backend/.env.production
yes | cp -rf ./frontend/.env.docker.production.sample ./frontend/.env.production
if [ ! -f .env ]; then yes | cp -rf .env.sample .env; fi
source .env && docker compose -f docker-compose.prod.yml up --build --force-recreate --pull always