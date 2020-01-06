# Welcome to Hall of Fame

This repo contains a Angular client and Nodejs server which relies on MongoDb database.
Navigate to highscore-server folder and execute the following:
`npm run prestart` Install all the node modules.
`npm run checkMongo` Check if mongo is installed on standard port.
`npm run createDb` Create the needed database for the backend.
`npm run start` Start the nodejs backend.

Start a new terminal window and navigate to the highscore-client folder.
`npm install` Install all the node modules.
`ng serve` boots up the client for use in a browser.

This code is mostly from https://github.com/sius/hall-of-fame

```
git clone git@github.com:sius/hall-of-fame.git
```

### Install Npm Tools Globally

```
npm i -g swagger-nodegen-cli@2.4.4
npm i -g @angular/cli
```

### Highscore Server

Generate nodejs-server and implement service

```
swagger-nodegen-cli generate \
  -i ./api/swagger.yaml \
  -o ./highscore-server \
  -l nodejs-server

cd highscore-server
npm install
npm install nedb
```
