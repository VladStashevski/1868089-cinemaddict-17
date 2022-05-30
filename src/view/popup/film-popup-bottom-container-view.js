import AbstractView from '../../framework/view/abstract-view.js';

const createFilmPopupBottomTemplate = () => '<div class="film-details__bottom-container"></div>';

export default class FilmPopupBottomContainerView extends AbstractView {
  get template() {
    return createFilmPopupBottomTemplate();
  }
}
