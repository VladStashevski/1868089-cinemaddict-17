import AbstractView from '../framework/view/abstract-view';

const createFilmsListMostCommentedTemplate = (heading) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
  </section>`
);

export default class FilmsListMostCommentedView extends AbstractView {
  #heading = null;

  constructor(heading) {
    super();
    this.#heading = heading;
  }

  get template() {
    return createFilmsListMostCommentedTemplate(this.#heading);
  }
}
