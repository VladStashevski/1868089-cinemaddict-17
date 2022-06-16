import Observable from '../framework/observable.js';
import {CARD_COUNT} from '../const.js';
import {generateFilmCard} from '../mock/film-template.js';

export default class MovieModel extends Observable {
  #movies = Array.from({length: CARD_COUNT}, generateFilmCard);

  get movies() {
    return this.#movies;
  }

  get count() {
    return this.#movies.length;
  }

  updateFilm = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
