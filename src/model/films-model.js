import Observable from '../framework/observable.js';
import {CARD_COUNT} from '../const.js';
import {generateFilmCard} from '../mock/film-template.js';

export default class FilmModel extends Observable {
  #films = Array.from({length: CARD_COUNT}, generateFilmCard);

  get films() {
    return this.#films;
  }

  get count() {
    return this.#films.length;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
