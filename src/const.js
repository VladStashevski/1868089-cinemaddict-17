export const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite'
};

export const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

export const UserRank = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  FILM_BUFF: 'Movie Buff'
};

export const UserHistory = {
  NOVICE: 1,
  FAN: 11,
  FILM_BUFF: 21
};
