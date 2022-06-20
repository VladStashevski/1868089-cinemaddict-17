export const FilterType = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

export const NoFilmCardTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies in our watchlist',
  [FilterType.HISTORY]: 'There are no watched movies',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

export const Time = {
  HOUR: 60,
  DAY: 1440,
  MONTH: 43200,
  YEAR: 525600,
};

export const SHAKE_CLASS_NAME = 'shake';
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const CARDS_PER_STEP = 5;
export const body = document.querySelector('body');

export const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const Method = {
  POST: 'POST',
  DELETE: 'DELETE',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
