import { MOCK_SENTENCES } from '../const.js';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
//Функция взята со StackOverflow: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers и доработана
const getRandomFloat = (a, b, decimal = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));

  return Number(Math.random() * (max - min) + min).toFixed(decimal);
};

//https://stackoverflow.com/a/46382735
const getRandomIntegerArray = (length, max) => Array(length).fill().map(() => Math.round(Math.random() * max));

const getRandomIndex = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getRandomArrayElements = (arr, amount) => {
  const elements = [];
  for (let i = 0; i <= amount; i++) {
    elements.push(getRandomIndex(arr));
  }
  return elements;
};

const generateSentences = (amount) => getRandomArrayElements(MOCK_SENTENCES, amount).join(' ');

const makeArrayOfKeyValues = (arr, key) => arr.map((element) => element.get(key));

export {getRandomInteger, getRandomFloat, getRandomIntegerArray, getRandomIndex, getRandomArrayElements, generateSentences, makeArrayOfKeyValues};
