#!/usr/bin/env bash
docker build -t auth0-react-01-login .
docker run --init -p 30001:3001 -it auth0-react-01-login