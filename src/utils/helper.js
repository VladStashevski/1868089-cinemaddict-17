import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {UserRank, UserHistory} from '../const';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const getRatedFilmsCount = (films) => films.filter((film) => film.filmInfo.totalRating !== 0).length;

export const getCommentedFilmsCount = (films) => films.filter((film) => film.comments.length !== 0).length;

export const sortByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

export const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export const sortByCommentsAmount = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

export const getWatchedFilmsCount = (films) => films.filter((film) => film.userDetails.alreadyWatched).length;

export const getUserRank = (watchedFilmsCount) => {
  if (watchedFilmsCount >= UserHistory.FILM_BUFF) {
    return UserRank.FILM_BUFF;
  } else if (watchedFilmsCount < UserHistory.FILM_BUFF && watchedFilmsCount >= UserHistory.FAN) {
    return UserRank.FAN;
  }

  return UserRank.NOVICE;
};

export const humanizeFilmReleaseYearDate = (date) => dayjs(date).format('YYYY');
export const humanizeFilmReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
export const humanizeCommentDate = (date) => dayjs(date).fromNow();

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getTimeFromMins = (mins) => {
  const runtime = dayjs.duration(mins, 'minutes');
  return runtime.hours() !== 0 ? `${runtime.hours()}h ${runtime.minutes()}m` : `${runtime.minutes()}m`;
};

export const getRandomFilms = (films, amount) => {
  const randomFilms = [];
  while (randomFilms.length < amount) {
    const element = films[getRandomInteger(0, films.length - 1)];
    if (!randomFilms.find((el) => el.id === element.id)) {
      randomFilms.push(element);
    }
  }

  return randomFilms;
};
