const db = require('@metamathstudios/redis-wrapper');

const { app } = require("./app");
var package = require('../package.json');

require('dotenv').config()

var listener = app.listen(process.env.SERVER_PORT);

if(listener.address() != null) {
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