"use strict";

const axios = require(`axios`);
const {HttpMethod} = require(`../constants`);
const {getLogger} = require(`../service/lib/logger`);

const logger = getLogger({name: `api`});

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const PUBLIC_URL = process.env.PUBLIC_URL;
const API_URL = `${PUBLIC_URL}:${port}/api`;

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
      logger.error(err);
      throw err;
    }
  }

  getArticles({isNeedComments, offset, limit}) {
    return this._load(`/articles`, {params: {isNeedComments, offset, limit}});
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  editArtcile(id, data) {
    return this._load(`/articles/${id}`, {
      method: HttpMethod.PUT,
      data,
    });
  }

  createComment(id, data) {
    return this._load(`/articles/${id}/comments`, {
      method: HttpMethod.POST,
      data,
    });
  }

  removeComment({articleId, commentId}) {
    return this._load(`/articles/${articleId}/comments/${commentId}`, {
      method: HttpMethod.DELETE,
    });
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategory({id, limit, offset}) {
    return this._load(`/categories/${id}`, {params: {limit, offset}});
  }

  createCategory(data) {
    return this._load(`/categories/`, {
      method: `POST`,
      data
    });
  }

  getCategories(needCount) {
    return this._load(`/categories`, {params: {needCount}});
  }

  getComments() {
    return this._load(`/comments`);
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data,
    });
  }

  removeArticle({id, userId}) {
    return this._load(`/articles/${id}`, {
      method: HttpMethod.DELETE,
      data: {
        userId
      }
    });
  }

  createUser({data}) {
    return this._load(`/user`, {
      method: HttpMethod.POST,
      data
    });
  }

  auth({email, password}) {
    return this._load(`/user/auth`, {
      method: HttpMethod.POST,
      data: {email, password}
    });
  }
}

const defaultAPI = new API(API_URL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
