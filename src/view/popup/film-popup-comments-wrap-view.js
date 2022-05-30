import AbstractView from '../../framework/view/abstract-view.js';

const createCommentsWrapTemplate = (comments) => (
  `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  </section>`
);

export default class FilmPopupCommentsWrapView extends AbstractView {
  constructor(comments) {
    super();
    this.comments = comments;
  }

  get template() {
    return createCommentsWrapTemplate(this.comments);
  }
}
