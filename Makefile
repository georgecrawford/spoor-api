app := spoor-api
HEROKU_AUTH_TOKEN := `heroku auth:token`

deploy:
    @haikro build deploy \
        --app $(app) \
        --heroku-token $(HEROKU_AUTH_TOKEN) \
        --commit `git rev-parse HEAD`

run:
	@export accessKey=`cat ~/.aws-access.spoor`; \
	 export secretAccessKey=`cat ~/.aws-secret.spoor`; \
	 export SQS_URL=`cat ~/.aws-sqs.spoor`; \
	 node --harmony server.js

test:
	mocha -R spec tests/http
