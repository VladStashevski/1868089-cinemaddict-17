import {getRandomInteger} from '../utils/common.js';
import CommentsModel from '../model/comments-model.js';
import {nanoid} from 'nanoid';

const titles = [
  'Made for Each other',
  'Popeye meets sinbad',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The dance of life',
  'The great flamarion',
  'The Man with the Golden Arm'
];

const description = [
  'Oscar-winning film, a war drama about two young people, from the creators of timeless classic',
  'Nu, Pogodi!',
  'and',
  'Alice in Wonderland',
  'with the best fight scenes since Bruce Lee.'
];

const postersSrc = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg'
];

const actors = [
  'Morgan Freeman',
  'Carole Lombard',
  'James Stewart',
  'Charles Coburn',
  'Frank Sinatra'
];

const genreFilm = [
  'Comedy',
  'Triller',
  'Adventure',
  'Detective',
  'Melodrama'
];

const country = [
  'Russia',
  'Finland',
  'Germany',
  'Norway',
  'Sweden'
];

const directors = [
  'Tom Ford',
  'Frank Dorabont',
  'Stiven Spilberg',
  'Kventin Torantino',
  'David Fincher'
];

const writers = [
  'Takeshi Kitano',
  'Jim Uls',
  'Hayao Midziyaki',
  'Guy Ritchie',
  'Ivan Atkinson'
];

const dates = [
  '2019-04-12T16:12:32.554Z',
  '2019-03-12T16:12:32.554Z',
  '2019-04-12T16:10:32.554Z',
  '2020-04-12T16:12:32.554Z',
  '2020-04-12T16:12:32.554Z'
];

const timeFilms = [
  90,55,70,48,84,160
];

const getRuntime = (offer) => {
  const runtime = [];
  for (let i = 0; i < offer.length; i++) {
    if(offer[i] % 60 === 0) {
      runtime.push(`${offer[i]/60}h`);
    }
    runtime.push(`${Math.ceil(offer[i]/60)}h ${offer[i] % 60}m`);
  }
  return runtime[getRandomInteger(0, runtime.length - 1)];
};

const commentsList = new CommentsModel();

export const genetateMovieCard = () => {
  const id = getRandomInteger(1, 5);
  return {

    'id': nanoid(),
    'comments': [
      ...commentsList.getCommentsById(id)
    ],
    'filmInfo': {
      'title': titles[getRandomInteger(0, 5)],
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': getRandomInteger(0, 10),
      'poster': `${postersSrc[getRandomInteger(0, 5)]}`,
      'ageRating': getRandomInteger(0, 10),
      'director': directors[getRandomInteger(0, 5)],
      'writers': writers.slice(0,[getRandomInteger(1, actors.length)]),
      'actors': actors.slice(0,[getRandomInteger(0, actors.length - 1)]),
      'release': {
        'date': dates[getRandomInteger(0, 5)],
        'releaseCountry': country.slice(0,[getRandomInteger(0, country.length - 1)])
      },
      'runtime': getRuntime(timeFilms),
      'genre': genreFilm.slice().splice(getRandomInteger(0, genreFilm.length - 1),[getRandomInteger(1, 2)]),
      'description': description[getRandomInteger(0, 5)],
    },
    'userDetails': {
      'watchlist': Boolean(getRandomInteger(0, 1)),
      'alreadyWatched': Boolean(getRandomInteger(0, 1)),
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': Boolean(getRandomInteger(0, 1))
    }
  };
};
