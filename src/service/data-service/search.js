'use strict';


const {Op} = require(`sequelize`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.article;
    this._User = sequelize.models.user;
  }

  async findAll(searchText) {

    const articles = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [`categories`, {
        model: this._User,
        attributes: {
          exclude: [`passwordHash`]
        }
      }],
      order: [
        [`createdAt`, `DESC`]
      ]
    });
    return articles.map((article) => article.get());
  }

}

module.exports = SearchService;
