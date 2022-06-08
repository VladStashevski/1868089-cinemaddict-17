import AbstractView from '../framework/view/abstract-view.js';

const createContainerFilms = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmContainerView extends AbstractView {
  get template() {
    return createContainerFilms();
  }
}
