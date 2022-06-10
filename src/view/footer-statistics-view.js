import AbstractView from '../framework/view/abstract-view.js';

const footerStatisticsElement = (movieCount) => (`
  <section class="footer__statistics">
    <p>${movieCount} movies inside</p>
  </section>
`);

export default class FooterStatisticsView extends AbstractView {
  #movieCount = 0;

  constructor(movieCount) {
    super();
    this.#movieCount = movieCount;
  }

  get template() {
    return footerStatisticsElement(this.#movieCount);
  }
}
