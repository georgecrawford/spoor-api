app := spoor-api
HEROKU_AUTH_TOKEN := `heroku auth:token`
.PHONY: build

deploy:
    @haikro build deploy \
        --app $(app) \
        --heroku-token $(HEROKU_AUTH_TOKEN) \
        --commit `git rev-parse HEAD`

compile:
	gulp compile

run: compile 
	@export accessKey=`cat ~/.aws-access.spoor`; \
	 export secretAccessKey=`cat ~/.aws-secret.spoor`; \
	 export SQS_URL=`cat ~/.aws-sqs.spoor`; \
	 node --harmony dist/api.js

test:
	@gulp compile-tests; mocha -R spec dist-tests/api

