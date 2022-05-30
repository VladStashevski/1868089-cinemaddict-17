import { getRandomInteger, getRandomIndex, generateSentences } from '../utils/common.js';
import { MAX_COMMENT_ID, MAX_SENTENCES, EMOJIS } from '../const.js';

const generateComment = () => ({
  id: getRandomInteger(0, MAX_COMMENT_ID),
  author: 'Ilya O\'Reilly',
  comment: generateSentences(MAX_SENTENCES),
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomIndex(EMOJIS)
});

const COMMENTS = Array.from({length: MAX_COMMENT_ID}, generateComment);

export { COMMENTS, generateComment };
