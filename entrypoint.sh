#!/bin/sh
npm run db:migrate && npm run db:generate

pm2 start --no-daemon --name patterns npm -- start