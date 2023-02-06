#! /bin/sh
REACT_APP_API_URL=https://magic8-servic.heroku.com/magic8/predict yarn build

#User BuildX to build linux/amd64 on M1 Apple Silicon 
docker buildx build --platform linux/amd64 -t malcolmpereira/magic8react:1.0.0 --file Dockerfile.heroku .

#heroku create --app magic8-client
#heroku stack:set container --app magic8-client
# tag image to match Heroku naming conventions
#docker tag malcolmpereira/magic8react:1.0.0 registry.heroku.com/magic8-client/web
# push
#docker push registry.heroku.com/magic8-client/web
#heroku container:release web --app magic8-client
#https://medium.com/geekculture/from-apple-silicon-to-heroku-docker-registry-without-swearing-36a2f59b30a3

#docker run -e PORT=80 -p 80:80 registry.heroku.com/magic8-client/web