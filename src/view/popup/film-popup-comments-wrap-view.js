import { createElement } from '../../render.js';

const createCommentsWrapTemplate = (comments) => (
  `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  </section>`
);

export default class FilmPopupCommentsWrapView {
  #element = null;

  constructor(comments) {
    this.comments = comments;
  }

  get template() {
    return createCommentsWrapTemplate(this.comments);
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
