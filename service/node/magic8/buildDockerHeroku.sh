#! /bin/sh

yarn install


docker buildx build --platform linux/amd64 -t malcolmpereira/magic8service:1.0.0 --file Dockerfile.heroku .

#heroku create --app magic8-service
#heroku stack:set container --app magic8-service
# tag image to match Heroku naming conventions
#docker tag malcolmpereira/magic8service:1.0.0 registry.heroku.com/magic8-service/web
# push
#docker push registry.heroku.com/magic8-service/web
#heroku container:release web --app magic8-service
#https://medium.com/geekculture/from-apple-silicon-to-heroku-docker-registry-without-swearing-36a2f59b30a3

#docker run -e PORT=8080 -p 8080:8080 registry.heroku.com/magic8-service/web
#docker run -e PORT=8080 -p 8080:8080 malcolmpereira/magic8service:1.0.0