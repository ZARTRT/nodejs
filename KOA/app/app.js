'use strict';

const Koa = require('koa');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const apmMiddleware = require('./middlewares/apm');
const bodyParser = require('./middlewares/body-parser');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const corsConfig = require('./config/cors');
const logger = require('./logger');
const router = require('./routes');
const mongoose = require('mongoose');

class App extends Koa {
  constructor(...params) {
    super(...params);

    // Trust proxy
    this.proxy = true;
    // Disable `console.errors` except development env
    this.silent = this.env !== 'development';

    this.servers = [];

    this._connectDB();
    this._configureMiddlewares();
    this._configureRoutes();
  }

  _configureMiddlewares() {
    this.use(errorHandler());
    this.use(apmMiddleware());
    this.use(requestId());
    this.use(
      logging({
        logger,
        overrideSerializers: false
      })
    );
    this.use(
      bodyParser({
        enableTypes: ['json'],
        jsonLimit: '10mb'
      })
    );
    this.use(
      cors({
        origins: corsConfig.origins,
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
      })
    );
  }

  _configureRoutes() {
    // Bootstrap application router
    this.use(router.routes());
    this.use(router.allowedMethods());
  }

  listen(...args) {
    const server = super.listen(...args);
    this.servers.push(server);
    return server;
  }

  async terminate() {
    // TODO: Implement graceful shutdown with pending request counter
    for (const server of this.servers) {
      server.close();
    }
    // mongoose.disconnect();
  }

  _connectDB() {
    mongoose
      .connect('mongodb://admin:123456@127.0.0.1:27017/koatables?authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(_res => {
        logger.info('DB Connected!');
      })
      .catch(_err => {
        logger.info(Error, _err.message);
      });
  }
}

module.exports = App;
