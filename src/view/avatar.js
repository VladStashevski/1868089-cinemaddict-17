import { createElement } from '../render.js';

const getDomAvatar = () => '<section class="header__profile profile"><p class="profile__rating"> Rick Deckard</p><img class="profile__avatar" src="images/bitmap.png" alt="Avatar" width="35" height="35"></section>';
export default class AvatarIcon {
  createDomElement() {
    return getDomAvatar ();
  }

  getElement () {
    if(!this.element){
      this.element = createElement(this. createDomElement());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
