'use strict';

const express = require(`express`);
const sequelize = require(`../lib/sequelize`);

const {HttpCode, API_PREFIX} = require(`../../constants`);
const routes = require(`../api`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  console.log(err.message);
  logger.error(`An error occured on processing request: ${err.message}`);
});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    try {
      logger.info(`Trying to connect to database`);

      await sequelize.authenticate();
    } catch (err) {
      console.log(err.message);
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(
              `An error occured on server creation: ${err.message}`
          );
        }
        console.log(`Listening to connections on ${port}`);
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  },
};
