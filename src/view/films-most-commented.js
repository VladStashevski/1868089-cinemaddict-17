import { createElement } from '../render.js';
const getDomFilmsMostComment = () =>
  `<section class="films-list films-list--extra">
<h2 class="films-list__title ">Most commented</h2>
<div class="films-list__container most_commented">
</div>
</section>`;
export default class NewFilmsMostComment {
  createDomElement() {
    return getDomFilmsMostComment();
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
