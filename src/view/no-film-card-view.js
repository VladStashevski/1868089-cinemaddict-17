import AbstractView from '../framework/view/abstract-view.js';
import {NoFilmCardTextType} from '../const.js';

const createNoFilmTemplate = (filterType) => {
  const noFilmCardTextValue = NoFilmCardTextType[filterType];

  return (
    `<section class="films-list"><h2 class="films-list__title">
      ${noFilmCardTextValue}
    </h2></section>`);
};

export default class NoFilmCardView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmTemplate(this.#filterType);
  }
}

