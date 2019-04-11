docker stop ifttt-server || true 
docker rm ifttt-server || true 

docker run \
	-d \
	--name ifttt-server \
	--mount type=bind,source="$(pwd)/src",target=/var/www/src \
	-p 12345:12345 \
	ifttt-server;
