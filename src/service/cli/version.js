'use strict';

const chalk = require(`chalk`);
const packageFileJson = require(`../../../package-lock.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageFileJson.version;
    console.info(chalk.blue(version));
  }
};
