import {CARD_COUNT, FilterType} from '../const.js';
import {genetateMovieCard} from '../mock/movie-template.js';

export default class MovieModel {
  #movies = Array.from({length: CARD_COUNT}, genetateMovieCard);

  get movie() {
    return this.#movies;
  }

  get count() {
    return this.#movies.length;
  }

  get filtered() {
    return ({
      [FilterType.ALL]: () => this.#movies,
      [FilterType.WATCHLIST]: () => this.#movies.filter((movie) => movie.userDetails.watchlist),
      [FilterType.HISTORY]: () => this.#movies.filter((movie) => movie.userDetails.alreadyWatched),
      [FilterType.FAVORITES]: () => this.#movies.filter((movie) => movie.userDetails.favorite)
    });
  }
}
