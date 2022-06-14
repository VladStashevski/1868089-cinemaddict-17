import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-view-film.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #filmComponent = null;
  #popupComponent = null;
  #changeData = null;
  #changeMode = null;

  #movie = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (movie) => {
    this.#movie = movie;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmCardView(movie);
    this.#popupComponent = new PopupFilmView(movie);

    this.#filmComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    this.#filmComponent.setClickHandler(this.#openPopup);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#initPopup();
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  };

  #initPopup = () => {
    this.#popupComponent.setCloseClickHandler(this.#closePopup);
    this.#popupComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(this.#onFavoriteClick);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
      this.#popupComponent.reset(this.#movie);
    }
  };

  #openPopup = () => {
    render(this.#popupComponent, document.body);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#changeMode();
    this.#mode = Mode.OPENED;

    this.#initPopup();
  };

  #closePopup = () => {
    remove(this.#popupComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    this.#mode = Mode.DEFAULT;
    this.#popupComponent.reset(this.#movie);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      this.#closePopup();
    }
  };

  #onWatchListClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };

  #onAlreadyWatchedClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #onFavoriteClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };
}
