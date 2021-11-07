"use strict";

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const csrf = require(`csurf`);
const auth = require(`../middlewares/auth`);
const isAdmin = require(`../middlewares/isAdmin`);
const upload = require(`../middlewares/upload`);

const articlesRouter = new Router();
const csrfProtection = csrf();


const ARTICLES_PER_PAGE = 8;


articlesRouter.get(`/category/:id`, async (req, res) =>{
  const {user} = req.session;
  const {id} = req.params;

  let {page = 1} = req.query;
  page = +page;

  const limit = ARTICLES_PER_PAGE;
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const [categories, {category, count, articlesByCategory}] = await Promise.all([
    api.getCategories(true),
    api.getCategory({id, limit, offset})
  ]);


  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  const articles = {
    category,
    current: articlesByCategory
  };


  res.render(`articles-by-category`, {
    categories,
    category,
    count,
    articles: articles.current,
    page,
    totalPages,
    user
  });

}
);

articlesRouter.get(`/add`, auth, csrfProtection, async (req, res) => {
  const {error} = req.query;
  const {user} = req.session;

  const categories = await api.getCategories();
  res.render(`add-article`, {categories, error, user, csrfToken: req.csrfToken()});
});

articlesRouter.get(`/edit/:id`, auth, csrfProtection, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const {user} = req.session;

  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);
  res.render(`edit-article`, {id, article, categories, error, user, csrfToken: req.csrfToken()});
});

articlesRouter.get(`/:id`, csrfProtection, async (req, res) => {
  const {id} = req.params;
  const {user} = req.session;
  const article = await api.getArticle(id);
  res.render(`article`, {article, id, user, csrfToken: req.csrfToken()});
});

articlesRouter.post(`/add`, auth, isAdmin, upload.single(`picture`), csrfProtection, async (req, res) => {
  const {body, file} = req;
  const {user} = req.session;
  const articleData = {
    userId: user.id,
    picture: file ? file.filename : ``,
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    categories: Object.keys(body).filter((it) => body[it] === `checked`),
    date: body.date ? body.date : new Date(),
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my-articles`);
  } catch (error) {
    const categories = await api.getCategories();

    res.render(`add-article`, {messages: error.response.data || null, categories, user, csrfToken: req.csrfToken()});
  }
});

articlesRouter.post(`/edit/:id`, auth, isAdmin, csrfProtection, upload.single(`picture`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;
  const articleData = {
    picture: file.filename,
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    categories: body.category,
  };
  try {
    await api.editArtcile(articleData);
    res.redirect(`/my-articles`);
  } catch (error) {
    res.redirect(`/articles/edit/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});


articlesRouter.post(`/:id/comments`, auth, csrfProtection, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;
  const {user} = req.session;
  try {
    await api.createComment(id, {text: comment, userId: user.id});
    res.redirect(`/articles/${id}`);
  } catch (error) {
    const article = await api.getArticle(id);
    res.render(`article`, {article, id, error: error.response.data || null, user, csrfToken: req.csrfToken()});
  }
});

articlesRouter.post(`/:articleId/comments/:commentId`, auth, isAdmin, csrfProtection, async (req, res) => {
  const {articleId, commentId} = req.params;
  try {
    await api.removeComment({commentId, articleId});
    res.redirect(`/my/comments`);
  } catch (error) {
    res.redirect(`/articles/?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRouter.post(`/:id`, auth, async (req, res) => {
  const {user} = req.session;
  const {id} = req.params;

  try {
    await api.removeArticle({id, userId: user.id});

    res.redirect(`/my/articles`);
  } catch (errors) {
    res.status(errors.response.status).send(errors.response.statusText);
  }
});

module.exports = articlesRouter;
