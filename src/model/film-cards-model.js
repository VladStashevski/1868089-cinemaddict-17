import { MAX_FILMS } from '../const.js';
import { generateFilm } from '../mock/film.js';

export default class FilmCardsModel {
  #cards = Array.from({length: MAX_FILMS}, generateFilm);

  get cards() {
    return this.#cards;
  }
}
