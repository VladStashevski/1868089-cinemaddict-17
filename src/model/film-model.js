import {CARD_COUNT, FilterType} from '../const.js';
import {genetateMovieCard} from '../mock/film.js';

export default class FilmModel {
  #films = Array.from({length: CARD_COUNT}, genetateMovieCard);

  get movie() {
    return this.#films;
  }

  get count() {
    return this.#films.length;
  }

  get filtered() {
    return ({
      [FilterType.ALL]: () => this.#films,
      [FilterType.WATCHLIST]: () => this.#films.filter((movie) => movie.userDetails.watchlist),
      [FilterType.HISTORY]: () => this.#films.filter((movie) => movie.userDetails.alreadyWatched),
      [FilterType.FAVORITES]: () => this.#films.filter((movie) => movie.userDetails.favorite)
    });
  }
}
