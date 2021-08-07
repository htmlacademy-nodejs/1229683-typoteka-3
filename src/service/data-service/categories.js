"use strict";

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.сategory;

  }

  findAll() {
    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoryService;
