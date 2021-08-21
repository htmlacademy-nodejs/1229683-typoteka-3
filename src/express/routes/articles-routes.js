"use strict";

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const api = require(`../api`).getAPI();

const articlesRouter = new Router();
const {themesList} = require(`./mocks.js`);

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

articlesRouter.get(`/category/:id`, (req, res) =>
  res.render(`articles-by-category`, {themesList})
);

articlesRouter.get(`/add`, (req, res) => res.render(`add-article`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);
  res.render(`edit-article`, {article, categories});
});
articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`article`, {article});
});
articlesRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const {body, file} = req;
  const articleData = {
    picture: file.filename,
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    categories: body.category,
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

module.exports = articlesRouter;
