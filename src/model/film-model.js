import {genetateMovieCard} from '../mock/film.js';

const CARD_COUNT = 20;

export default class MovieModel {
  #movie = Array.from({length: CARD_COUNT}, genetateMovieCard);

  get movie() {
    return this.#movie;
  }
}
