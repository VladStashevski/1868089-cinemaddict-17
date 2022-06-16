import AbstractView from '../framework/view/abstract-view.js';

const footerStatisticsElement = (filmCount) => (`
    <p>${filmCount} movies inside</p>
`);

export default class FooterStatisticsView extends AbstractView {
  #filmCount = 0;

  constructor(filmCount) {
    super();
    this.#filmCount = filmCount;
  }

  get template() {
    return footerStatisticsElement(this.#filmCount);
  }
}
