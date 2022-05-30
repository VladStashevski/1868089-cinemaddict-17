import AbstractView from '../../framework/view/abstract-view.js';

const createFilmPopupCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class FilmPopupCommentsListView extends AbstractView {
  get template() {
    return createFilmPopupCommentsListTemplate();
  }
}
