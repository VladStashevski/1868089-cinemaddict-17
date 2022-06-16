import {render, remove} from '../framework/render.js';
import {SHOW_FILM_COUNT_STEP, SortType, UpdateType, UserAction, FilterType} from '../const.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmContainerView from '../view/film-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './films-list-presenter.js';
import {sortFilmsByRating, sortFilmsByDate} from '../utils/task.js';
import {filter} from '../utils/filter.js';

export default class FilmsPresenter {

  #filmSection = new FilmSectionView;
  #filmContainer = new FilmContainerView;
  #loadMoreButtonComponent = null;
  #noFilmComponent = null;
  #sortComponent = null;
  #openedFilmPresenter = null;

  #filmModel = null;
  #filmListContainer = null;
  #renderedFilmCount = SHOW_FILM_COUNT_STEP;

  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  #filterModel = null;

  constructor(filmListContainer, filmModel, filterModel) {
    this.#filmListContainer = filmListContainer;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.RATING:
        return filteredFilms.sort(sortFilmsByRating);
      case SortType.DATE:
        return filteredFilms.sort(sortFilmsByDate);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderFilm();
  };

  #handleLoadMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + SHOW_FILM_COUNT_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #renderFilms = (films) => {
    films.forEach((element) => this.#createFilm(element));
  };

  #renderNoFilms = () => {
    this.#noFilmComponent = new NoFilmCardView(this.#filterType);
    render(this.#noFilmComponent, this.#filmSection.element);
  };

  #renderLoadMoreButton = () => {
    this.#loadMoreButtonComponent = new LoadMoreButtonView();
    this.#loadMoreButtonComponent.setClickLoadHandler(this.#handleLoadMoreButtonClick);

    render(this.#loadMoreButtonComponent, this.#filmSection.element);
  };

  #clearFilm = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.film.length;

    this.#filmPresenter.forEach((presenter) => {
      if (presenter.isOpened) {
        presenter.destroyOnlyCard();
        this.#openedFilmPresenter = presenter;
      } else {
        presenter.destroy();
      }
    });

    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noFilmComponent);
    remove(this.#loadMoreButtonComponent);

    if (this.#noFilmComponent) {
      remove(this.#noFilmComponent);
    }

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = SHOW_FILM_COUNT_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_Film:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilm();
        this.#renderFilm();
        break;
      case UpdateType.MAJOR:
        this.#clearFilm({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderFilm();
        break;
    }
  };

  #createFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmContainer.element, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilm({resetRenderedFilmCount: true});

    this.#renderFilm();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#filmListContainer);
  };

  #renderFilmsList = () => {
    render(this.#filmSection, this.#filmListContainer);
  };

  #updateOpenedModal = () => {
    if (!this.#openedFilmPresenter) {
      return;
    }
    if (!this.#openedFilmPresenter.isOpened) {
      this.#openedFilmPresenter = null;
    }
    const currentModalData = this.#filmModel.films.find((film) => film.id === this.#openedFilmPresenter?.filmId);
    if (currentModalData) {
      this.#openedFilmPresenter.init(currentModalData);
    }
  };

  #renderFilm = () => {
    const films = this.films;
    const filmCount = films.length;

    if (filmCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    render(this.#filmContainer, this.#filmSection.element);
    this.#renderFilmsList();

    this.#updateOpenedModal();

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderLoadMoreButton();
    }
  };
}
