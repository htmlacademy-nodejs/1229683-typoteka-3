"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {isNeedComments, offset, limit} = req.query;
    let result;
    if (limit || offset) {
      result = await articleService.findPage({limit, offset, isNeedComments});
    } else {
      result = await articleService.findAll(isNeedComments);
    }
    res.status(HttpCode.OK).send(result);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);
    res.status(HttpCode.CREATED).send(article);
  });

  route.get(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.delete(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).send(article);
  });

  route.put(`/:articleId`, articleValidator, async (req, res) => {
    const {articleId} = req.params;
    const existArticle = await articleService.findOne(articleId);

    if (!existArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    const updatedArticle = await articleService.update(articleId, req.body);

    return res.status(HttpCode.OK).send(updatedArticle);
  });

  route.get(
      `/:articleId/comments`,
      articleExists(articleService),
      async (req, res) => {
        const {article} = await res.locals;
        const {id: articleId} = article;
        const comments = await commentService.findAll(articleId);

        res.status(HttpCode.OK).send(comments);
      }
  );

  route.delete(
      `/:articleId/comments/:commentId`,
      articleExists(articleService),
      async (req, res) => {
        const {commentId} = req.params;

        const deletedComment = await commentService.drop(commentId);

        if (!deletedComment) {
          return res.status(HttpCode.NOT_FOUND).send(`Not found with`);
        }

        return res.status(HttpCode.OK).send(deletedComment);
      }
  );

  route.post(
      `/:articleId/comments`,
      [articleExists(articleService), commentValidator],
      async (req, res) => {
        const {article} = res.locals;
        const {id: articleId} = article;
        const comment = await commentService.create(articleId, req.body);

        return res.status(HttpCode.CREATED).send(comment);
      }
  );
};
