'use strict';

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};


module.exports.getRandomDate = () => {
  const date = new Date();
  const startDate = date.setMonth(date.getMonth() - 3);
  return new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime()));
};
