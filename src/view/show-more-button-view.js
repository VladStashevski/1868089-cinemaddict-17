import AbstractView from '../framework/view/abstract-view.js';

const createLoadMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class LoadMoreButtonView extends AbstractView {
  get template() {
    return createLoadMoreButtonTemplate();
  }

  setClickLoadHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickLoadHandler);
  };

  #clickLoadHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
