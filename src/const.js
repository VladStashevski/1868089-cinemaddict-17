const COMMENT_COUNT = 50;

const CARD_COUNT = 20;

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const FilterName = {
  [FilterType.ALL]: 'All movies',
  [FilterType.WATCHLIST]: 'Watchlist',
  [FilterType.HISTORY]: 'History',
  [FilterType.FAVORITES]: 'Favorites'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const SHOW_FILM_COUNT_STEP = 5;

export {CARD_COUNT, COMMENT_COUNT, FilterType, FilterName, SHOW_FILM_COUNT_STEP, SortType};
