
#
# run this container on your server to keep the labeled containers up to date
#
# run 'docker login' to authenticate with your docker hub account
# label your containers with 'com.centurylinklabs.watchtower.enable=true' to enable watchtower
#
docker run -d \
  --name watchtower \
  -v $HOME/.docker/config.json:/config.json \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower -s "*/30 * * * * *" --label-enable
