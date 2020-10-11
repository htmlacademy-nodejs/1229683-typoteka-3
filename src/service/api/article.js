"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK).send(articles);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    res.status(HttpCode.CREATED).send(article);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const existArticle = articleService.findOne(articleId);

    if (!existArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    const updatedArticle = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  route.get(
      `/:articleId/comments`,
      articleExists(articleService),
      (req, res) => {
        const {article} = res.locals;
        const comments = commentService.findAll(article);

        res.status(HttpCode.OK).send(comments);
      }
  );

  route.delete(
      `/:articleId/comments/:commentId`,
      articleExists(articleService),
      (req, res) => {
        const {commentId} = req.params;
        const {article} = res.locals;
        const deletedComment = commentService.drop(article, commentId);

        if (!deletedComment) {
          return res.status(HttpCode.NOT_FOUND).send(`Not found with`);
        }

        return res.status(HttpCode.OK).send(deletedComment);
      }
  );

  route.post(
      `/:articleId/comments`,
      [articleExists(articleService), commentValidator],
      (req, res) => {
        const {article} = res.locals;
        const comment = commentService.create(article, req.body);

        return res.status(HttpCode.CREATED).send(comment);
      }
  );
};
