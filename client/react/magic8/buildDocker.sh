#! /bin/sh

REACT_APP_API_URL=https://magic8service.malcolm.io/magic8/predict yarn build

docker build -t malcolmpereira/magic8react:1.0.0 .