import { createElement } from '../../render.js';

const createFilmPopupTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';

export default class FilmPopupFormView {
  #element = null;

  get template() {
    return createFilmPopupTemplate();
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
