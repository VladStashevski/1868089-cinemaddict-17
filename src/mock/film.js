import { getRandomInteger, getRandomIndex, getRandomFloat, getRandomIntegerArray, generateSentences } from '../util.js';
import { MAX_COMMENT_ID, MAX_COMMENTS, MAX_SENTENCES, MOCK_TITLES } from '../const.js';

const MAX_FILM_ID = 100;
const MAX_RATING = 10;
const MAX_AGE = 18;
const MIN_RUNTIME = 60;
const MAX_RUNTIME = 240;
const MIN_YEAR = 1940;
const MAX_YEAR = 2022;

const getPosterURLFromTitle = (title) => `images/posters/${  title.replace(/ /gi, '-').toLowerCase()  }.jpg`;

const generateFilm = () => {
  const commentQuantity = getRandomInteger(0, MAX_COMMENTS);
  const title = getRandomIndex(MOCK_TITLES);
  const poster = getPosterURLFromTitle(title);

  return {
    id: String(getRandomInteger(0, MAX_FILM_ID)),
    comments: getRandomIntegerArray(commentQuantity, MAX_COMMENT_ID),
    filmInfo: {
      title: title,
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: String(getRandomFloat(0, MAX_RATING)),
      poster: poster,
      ageRating: getRandomInteger(0, MAX_AGE),
      director: 'Tom Ford',
      writers: [
        'Takeshi Kitano'
      ],
      actors: [
        'Morgan Freeman'
      ],
      release: {
        date: `${getRandomInteger(MIN_YEAR, MAX_YEAR)}-05-11T00:00:00.000Z`,
        releaseCountry: 'Finland'
      },
      runtime: getRandomInteger(MIN_RUNTIME, MAX_RUNTIME),
      genre: [
        'Comedy',
        'Thriller'
      ],
      description: generateSentences(getRandomInteger(1, MAX_SENTENCES))
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  };
};
export {generateFilm};
