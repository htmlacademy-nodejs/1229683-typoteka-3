"use strict";

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const api = require(`../api`).getAPI();
const csrf = require(`csurf`);
const auth = require(`../../service/middlewares/auth`);
const {themesList} = require(`./mocks.js`);

const articlesRouter = new Router();
const csrfProtection = csrf();


const UPLOAD_DIR = `../../../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) =>{
  const {user} = req.session;

  res.render(`articles-by-category`, {themesList, user});
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

articlesRouter.post(`/add`, auth, upload.single(`picture`), csrfProtection, async (req, res) => {
  const {body, file} = req;
  const {user} = req.session;
  const articleData = {
    userId: user.id,
    picture: file.filename,
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    categories: body.category,
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`/articles/add?error=${encodeURIComponent(error.response.data)}`);
  }
});

articlesRouter.post(`/edit/:id`, auth, upload.single(`picture`), csrfProtection, async (req, res) => {
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
