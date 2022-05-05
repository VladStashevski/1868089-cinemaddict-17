import { createElement } from '../render.js';
const getDomFilmsRatedList = () =>
  `<section class="films-list films-list--extra ">
<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container rated">
</div>
</section>`;

export default class NewFilmsRated {
  createDomElement() {
    return getDomFilmsRatedList();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.createDomElement());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
