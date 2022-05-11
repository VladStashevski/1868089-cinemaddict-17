import { MAX_CARDS } from '../const.js';
import { generateFilm } from '../mock/film.js';

export default class FilmCardsModel {
  #cards = Array.from({length: MAX_CARDS}, generateFilm);

  get cards() {
    return this.#cards;
  }
}
