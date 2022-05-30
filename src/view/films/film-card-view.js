import AbstractView from '../../framework/view/abstract-view.js';
import { getReleaseYear, humanizeRuntime } from '../../utils/film-view.js';

const FILM_CARD_LINK_CLASS = '.film-card__link';

const createFilmCardTemplate = (film) => {
  const {comments, filmInfo} = film;
  const {title, totalRating, poster, release, runtime, genre, description} = filmInfo;
  const duration = humanizeRuntime(runtime);

  return (
    `<article class="film-card">
    <a class="film-card__link">
     <h3 class="film-card__title">${title}</h3>
     <p class="film-card__rating">${totalRating}</p>
     <p class="film-card__info">
      <span class="film-card__year">${getReleaseYear(release.date)}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  get template() {
    return createFilmCardTemplate(this.film);
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector(FILM_CARD_LINK_CLASS).addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
