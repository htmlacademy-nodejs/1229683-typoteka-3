'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object.assign({id: nanoid(MAX_ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((articleItem) => articleItem.id === id);
  }

  drop(id) {
    const article = this._articles.find((articleItem) => articleItem.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((articleItem) => articleItem.id !== id);
    return article;
  }

  update(id, article) {
    const oldArticle = this._articles.find((articleItem) => articleItem.id === id);

    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticleService;
