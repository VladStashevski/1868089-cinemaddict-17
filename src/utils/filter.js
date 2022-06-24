import {FilterType} from '../const';

export const Filter = {
  [FilterType.ALL]: () => true,
  [FilterType.WATCHLIST]: (film) => film.userDetails.watchlist,
  [FilterType.HISTORY]: (film) => film.userDetails.alreadyWatched,
  [FilterType.FAVORITE]: (film) => film.userDetails.favorite
};
