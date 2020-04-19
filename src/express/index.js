'use strict';

const express = require(`express`);
const articlesRouter = require(`./routes/articles-routes`);
const myRouter = require(`./routes/my-routes`);
const mainRouter = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);


app.listen(DEFAULT_PORT);
