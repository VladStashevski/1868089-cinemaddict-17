import { createElement } from '../render.js';
const getDomButtonShowMore = () => '<button class="films-list__show-more">Show more</button>';
export default class NewButtonShowMore {
  createDomElement() {
    return getDomButtonShowMore();
  }

  getElement() {
    if(!this.element){
      this.element = createElement(this. createDomElement());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
