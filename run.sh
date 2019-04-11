docker stop node_server
docker rm node_server

docker run \
	-it \
	--name node_server \
	--mount type=bind,source="$(pwd)/html",target=/var/www/html \
	-p 12345:12345 \
	node_server;
