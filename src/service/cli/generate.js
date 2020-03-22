'use strict';

const fs = require(`fs`).promises;
const dayjs = require(`dayjs`);
const chalk = require(`chalk`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const {
  getRandomInt,
  getRandomDate,
  shuffle,
} = require(`../../utils`);
const {ExitCode, MAX_MESSAGE_COUNT} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.err(chalk.red(err));
    return [];
  }
};


const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, 5).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    createdDate: dayjs(getRandomDate()).format(`YYYY-DD-MM HH:mm:ss`),
    category: shuffle(categories).slice(0, 3),
  }))
);


module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const [count] = args;
    const countOffer = Number(parseInt(count, 10)) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    if (count > MAX_MESSAGE_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_MESSAGE_COUNT} объявлений`));
      process.exit(ExitCode.error);
    }
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};

