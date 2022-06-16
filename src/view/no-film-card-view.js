import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoFilmCardTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies in our watchlist',
  [FilterType.HISTORY]: 'There are no watched movies',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const emptyFilmSection = (filterType) => {
  const noFilmCardTextValue = NoFilmCardTextType[filterType];

  return (`
    <h2 class="films-list__title">
      ${noFilmCardTextValue}
    </h2>`);
};

export default class NoFilmCardView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return emptyFilmSection(this.#filterType);
  }
}
