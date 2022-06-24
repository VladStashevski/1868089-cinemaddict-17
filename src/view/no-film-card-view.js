import AbstractView from '../framework/view/abstract-view';
import {NoFilmsTextType} from '../const';

const createFilmsListEmptyTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTextType[filterType];

  return (
    `<h2 class="films-list__title">${noFilmsTextValue}</h2>`
  );
};

export default class FilmsListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createFilmsListEmptyTemplate(this.#filterType);
  }
}
