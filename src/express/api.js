"use strict";

const axios = require(`axios`);
const {getLogger} = require(`../service/lib/logger`);

const logger = getLogger({name: `api`});

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const PUBLIC_URL = process.env.PUBLIC_URL;
const API_URL = `${PUBLIC_URL}/${port}/api`;

class API {
  constructor(baseUrl, timeout) {
    this._http = axios.create({
      timeout,
    });
  }

  async _load(url, options) {
    try {
      const response = await this._http.request({
        url: `${API_URL}${url}`,
        ...options,
      });
      return response.data;
    } catch (err) {
      return logger.error(err);
    }
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  async getCategories() {
    return this._load(`/categories`);
  }

  async createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data,
    });
  }
}

const defaultAPI = new API(API_URL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
