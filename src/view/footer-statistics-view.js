import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = (count) => `<p>${count} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createStatisticsTemplate(this.#films.length);
  }
}
