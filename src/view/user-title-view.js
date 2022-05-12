import { createElement } from '../render.js';

const createUserTitleTemplate = () => (`
<section class="header__profile profile">
<p class="profile__rating">Duncan Idaho</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>
`);

export default class UserTitleView {
  #element = null;

  get template() {
    return createUserTitleTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

