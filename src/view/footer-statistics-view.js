import AbstractView from '../framework/view/abstract-view.js';

const footerStatisticsElement = () => (`
  <section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>
`);

export default class FooterStatisticsView extends AbstractView {
  get template() {
    return footerStatisticsElement();
  }
}
