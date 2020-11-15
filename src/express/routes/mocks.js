"use strict";

const news = [{name: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`, quantity: 12}, {name: `Сервис для аналитики Telegram-чатов Combot попал под блокировку из-за информации на служебной`, quantity: 15}, {name: `Модель Кайли Дженнер продаст 51% своей компании Kylie Cosmetics владельцу Factor за $600 млн`, quantity: 52}, {name: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`, quantity: 153}];
const themesList = [{name: `Автомобили`, quantity: 88}, {name: `Удаленная работа`, quantity: 13}, {name: `Бизнес`, quantity: 13}, {name: `Путешествие`, quantity: 13}, {name: `Дизайн и обустройство`, quantity: 13}, {name: `Производство игрушек`, quantity: 22}, {name: `UX & UI`, quantity: 22}];
const latestComments = [{
  userAvatar: `/img/avatar-small-1.png`,
  userName: `Анна Артамонова`,
  text: `Сервис аренды жилья Airbnb стал глобальным партнером Международного олимпийского комитета (МОК) на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году.`,
},
{
  userAvatar: `/img/avatar-small-2.png`,
  userName: `Александр Петров`,
  text: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
},
{
  userAvatar: `/img/avatar-small-3.png`,
  userName: `Игорь Шманский`,
  text: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
}];


module.exports = {
  news, themesList, latestComments
};
