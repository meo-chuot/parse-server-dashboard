const express = require('express');
const ParseDashboard = require('parse-dashboard');

const apps = JSON.parse(
  process.env.DASHBOARD_APP_CONFIG || JSON.stringify({
    "apps": [{
        "serverURL": "http://localhost:1337/parse",
        "appId": "myAppId",
        "masterKey": "myMasterKey",
        "appName": "MyApp"
    }],
    "users": [{
      "user":"user",
      "pass":"password"
    }]
  })
);

const dashboard = new ParseDashboard(apps, {
  allowInsecureHTTP: true
});

const app = express();

app.use('/', dashboard);

const httpServer = require('http').createServer(app);
httpServer.listen(process.env.PORT || 4040);
