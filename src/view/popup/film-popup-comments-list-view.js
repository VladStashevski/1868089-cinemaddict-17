import { createElement } from '../../render.js';

const createFilmPopupCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class FilmPopupCommentsListView {
  #element = null;

  get template() {
    return createFilmPopupCommentsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
