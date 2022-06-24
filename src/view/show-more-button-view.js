import AbstractView from '../framework/view/abstract-view';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setShowMoreClickHandler = (callback) => {
    this._callback.showFilmsClick = callback;
    this.element.addEventListener('click', this.#showMoreClickHandler);
  };

  #showMoreClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showFilmsClick();
  };
}
