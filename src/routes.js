const { Router } = require('express');

const routes = Router();

const controller = require('./controller')

routes.get('/transaction/:key/status', controller.status);
routes.get('/transaction/:key/from', controller.from);
routes.get('/transaction/:key/to', controller.to);
routes.get('/transaction/:key/amount', controller.amount);
routes.get('/transaction/:key/origin', controller.origin);
routes.get('/transaction/:key/target', controller.target);

routes.get('/history/:account', controller.account);

module.exports = { routes };