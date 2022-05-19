const { app } = require("./app");
require('dotenv').config()

app.listen(process.env.SERVER_PORT, () => console.log("Server started."));