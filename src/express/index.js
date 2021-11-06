'use strict';

const express = require(`express`);
const path = require(`path`);
const session = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const sequelize = require(`../service/lib/sequelize`);
const articlesRouter = require(`./routes/articles-routes`);
const myRouter = require(`./routes/my-routes`);
const mainRouter = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

const {SESSION_SECRET} = process.env;
if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}

const app = express();

const mySessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 1800000,
  checkExpirationInterval: 60000
});

sequelize.sync({force: false});

app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: SESSION_SECRET,
  store: mySessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
}));

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));

app.set(`view engine`, `pug`);


app.listen(DEFAULT_PORT);
