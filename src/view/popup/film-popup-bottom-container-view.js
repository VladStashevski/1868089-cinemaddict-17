import { createElement } from '../../render.js';

const createFilmPopupBottomTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class FilmPopupBottomContainerView {
  #element = null;

  get template() {
    return createFilmPopupBottomTemplate();
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
