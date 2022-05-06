#!/bin/sh
npm run db:migrate

pm2 start --no-daemon --name patterns npm -- start