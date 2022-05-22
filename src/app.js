const express = require("express");
const { routes } = require("./routes");
var cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/v1/', routes);

module.exports = { app };