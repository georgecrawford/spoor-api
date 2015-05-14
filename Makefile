
run:
	@export accessKey=`cat ~/.aws-access`; \
	 export secretAccessKey=`cat ~/.aws-secret`; \
	 node server.js
