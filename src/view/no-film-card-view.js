import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoFilmCardTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const emptyMovieSection = (filterType) => {
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
    return emptyMovieSection(this.#filterType);
  }
}
