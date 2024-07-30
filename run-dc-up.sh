#!/bin/bash
cp -f ./backend/.env.docker.production.sample ./backend/.env.production
cp -f ./frontend/.env.docker.production.sample ./frontend/.env.production
if [ ! -f .env ]; then cp -f .env.sample .env; fi
source .env && docker compose up --pull always