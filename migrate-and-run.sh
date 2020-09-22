#!/bin/bash
set -a . ".env$ENVIRONMENT_NAME" set +a
# create the db for local builds
sleep 10
if [ "$ENVIRONMENT_NAME" == "local" ]
    then 
        npx sequelize db:create
fi

# run migrations
npx sequelize db:migrate

# seed data for local builds 
npx sequelize db:seed:all

yarn start:$ENVIRONMENT_NAME