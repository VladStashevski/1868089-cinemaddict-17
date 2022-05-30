import AbstractView from '../../framework/view/abstract-view.js';

const createFilmPopupSectionTemplate = () => ('<section class="film-details"></section>');

export default class FilmPopupSectionView extends AbstractView{
  get template() {
    return createFilmPopupSectionTemplate();
  }
}
