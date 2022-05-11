import { createElement } from '../../render.js';

const createFilmPopupTemplate = () => ('<section class="film-details"></section>');

export default class FilmPopupSectionView {
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
