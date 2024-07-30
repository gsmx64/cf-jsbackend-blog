#!/bin/bash
echo -----------------------------------------
echo > Runing App Backend - Development
echo -----------------------------------------
cd backend
if [ ! -f .env.development ]; then yes | cp -rf .env.development.sample .env.development; fi
source .env.development && npm run start:dev && cd.. && exit 0