"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const {getRandomInt, shuffle} = require(`../../utils`);
const {MAX_COMMENTS} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `fill-db.sql`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.err(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments, articleId, userCount) =>
  Array(count)
    .fill({})
    .map(() => ({
      userId: getRandomInt(1, userCount),
      articleId,
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));

const getPictureFileName = (number) =>
  `item${number.toString().padStart(2, 0)}.jpg`;

const generateArticles = (
    count,
    titles,
    categoryCount,
    userCount,
    sentences,
    comments
) =>
  Array(count)
    .fill({})
    .map((_, index) => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences).slice(0, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(0, getRandomInt(1, sentences.length - 1))
        .join(` `),
      picture: getPictureFileName(getRandomInt(1, 10)),
      category: [getRandomInt(1, categoryCount)],
      comments: generateComments(
          getRandomInt(1, MAX_COMMENTS),
          comments,
          index + 1,
          userCount,
      ),
    }));

module.exports = {
  name: `--fill`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const commentSentences = await readContent(FILE_COMMENTS_PATH);
    const [count] = args;
    const countArticle = Number(parseInt(count, 10)) || DEFAULT_COUNT;

    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`,
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`,
      },
    ];

    const articles = generateArticles(
        countArticle,
        titles,
        categories.length,
        users.length,
        sentences,
        commentSentences
    );

    const comments = articles.flatMap((article) => article.comments);

    const articleCategories = articles.map((article, index) => ({
      articleId: index + 1,
      categoryId: article.category[0],
    }));

    const userValues = users
      .map(
          ({email, passwordHash, firstName, lastName, avatar}) =>
            `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
      )
      .join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const articleValues = articles
      .map(
          ({title, announce, fullText, picture}) =>
            `('${title}', '${announce}', '${fullText}', '${picture}')`
      )
      .join(`,\n`);

    const articleCategoryValues = articleCategories
      .map(({articleId, categoryId}) => `(${articleId}, ${categoryId})`)
      .join(`,\n`);

    const commentValues = comments
      .map(
          ({text, userId, articleId}) => `('${text}', ${userId}, ${articleId})`
      )
      .join(`,\n`);

    const content = `
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
${userValues};

INSERT INTO categories(name) VALUES
${categoryValues};

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, full_text, picture) VALUES
${articleValues};
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
${articleCategoryValues};
ALTER TABLE articles_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
${commentValues};
ALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
