import AbstractView from '../framework/view/abstract-view';

const createStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class  FooterStatisticsView extends AbstractView {
  #filmsCount = null;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createStatisticsTemplate(this.#filmsCount);
  }
}
