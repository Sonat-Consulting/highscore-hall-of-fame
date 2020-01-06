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

This is forked from https://github.com/sius/hall-of-fame

## Welcome to "The Hall Of Fame" (<= 90min)

Presentation storyboard for a simple highscore application using the **API first (top-down)** approach.

### Intro and promo

### The API (<= 5min)

```
git clone git@github.com:sius/hall-of-fame.git
cd hall-of-fame
```

### Install Some Npm Tools Globally (<= 5min)

```
npm i -g swagger-nodegen-cli@2.4.4
npm i -g @angular/cli
```

### Highscore Server - Part 1 (<= 30min)

Generate nodejs-server and implement service

```
swagger-nodegen-cli generate \
  -i ./api/swagger.yaml \
  -o ./highscore-server \
  -l nodejs-server

cd highscore-server
npm install
npm audit fix
npm install nedb
```

`Live Coding`

### Highscore Client - Part 1 (<= 5min)

Generate Angular Application

```
ng new highscore-client
cd highscore-client
npm audit fix
ng serve
```

### Highscore Service Module (<= 5min)

```
mkdir config
touch config/typescript-angular.json

swagger-nodegen-cli config-help \
  -l typescript-angular

swagger-nodegen-cli generate \
  -i ./api/swagger.yaml \
  -o ./highscore-client/src/lib/highscore-service \
  -c ./config/typescript-angular.json \
  -l typescript-angular
```

### Highscore Client - Part 2 (<= 30 min)

Implement Angular Client using the data service module and the highscore-server

```
npm i rxjs-compat
npm audit fix
```

`Live Coding`

### Highscore Server - Part 2 (<= 5min)

Update with express middleware and restart server

```
cd ./highscore-server
npm i express cors helmet
```

`Live Coding`

### Highscore Client - Part 3 (optional)

Add custom Style (e.g. bootstrap), use CSS preprocessors (e.g. LESS)

```
npm i bootstrap
ng config schematics.@schematics/angular:component.styleext less
```

`Live Coding`
