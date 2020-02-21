'use strict';

const packageFileJson = require(`../../package-lock.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageFileJson.version;
    console.info(version);
  }
}
