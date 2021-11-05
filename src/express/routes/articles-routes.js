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
    // fullView: true,
    categories,
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
  const {error} = req.query;
  const {user} = req.session;
  const article = await api.getArticle(id);
  res.render(`article`, {article, id, error, user, csrfToken: req.csrfToken()});
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
    res.redirect(`/my`);
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
    res.redirect(`/my`);
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
    res.redirect(`/articles/${id}/?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = articlesRouter;
