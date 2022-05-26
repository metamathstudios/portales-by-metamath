const db = require('@metamathstudios/redis-wrapper');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./cert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('./cert/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const { app } = require("./app");
var package = require('../package.json');

require('dotenv').config()

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var httpListener = httpServer.listen(process.env.HTTP_SERVER_PORT);
var httpsListener = httpsServer.listen(process.env.HTTPS_SERVER_PORT);

if(httpListener.address() != null && httpsListener.address() != null) {
    db.start().then(() => {
        console.log('  ')
        console.log(' MetaMath - Portales - Backend')
        console.log('  ')
        console.log('  📢')
        console.log('  ')
        console.log('   Rest API: \x1b[30m\x1b[4m\x1b[42mRunning\x1b[0m')
        console.log('   Redis database: \x1b[30m\x1b[4m\x1b[42mConnected\x1b[0m')
        console.log('   Running with version \x1b[30m\x1b[4m\x1b[42m' + package.version + "\x1b[0m")
        console.log('  ')
    })
}