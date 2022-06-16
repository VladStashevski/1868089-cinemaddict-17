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

  #movieModel = null;
  #filmListContainer = null;
  #renderedMovieCount = SHOW_FILM_COUNT_STEP;

  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  #filterModel = null;

  constructor(filmListContainer, movieModel, filterModel) {
    this.#filmListContainer = filmListContainer;
    this.#movieModel = movieModel;
    this.#filterModel = filterModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    this.#filterType = this.#filterModel.filter;
    const movies = this.#movieModel.movies;
    const filteredMovies = filter[this.#filterType](movies);

    switch (this.#currentSortType) {
      case SortType.RATING:
        return filteredMovies.sort(sortFilmsByRating);
      case SortType.DATE:
        return filteredMovies.sort(sortFilmsByDate);
    }

    return filteredMovies;
  }

  init = () => {
    this.#renderMovie();
  };

  #handleLoadMoreButtonClick = () => {
    const movieCount = this.movies.length;
    const newRenderedMovieCount = Math.min(movieCount, this.#renderedMovieCount + SHOW_FILM_COUNT_STEP);
    const movies = this.movies.slice(this.#renderedMovieCount, newRenderedMovieCount);

    this.#renderFilms(movies);
    this.#renderedMovieCount = newRenderedMovieCount;

    if (this.#renderedMovieCount >= movieCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #renderFilms = (movies) => {
    movies.forEach((element) => this.#createFilm(element));
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

  #clearFilm = ({resetRenderedMovieCount = false, resetSortType = false} = {}) => {
    const movieCount = this.movies.length;

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

    if (resetRenderedMovieCount) {
      this.#renderedMovieCount = SHOW_FILM_COUNT_STEP;
    } else {
      this.#renderedMovieCount = Math.min(movieCount, this.#renderedMovieCount);
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
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#movieModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#movieModel.updateFilm(updateType, update);
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
        this.#renderMovie();
        break;
      case UpdateType.MAJOR:
        this.#clearFilm({resetRenderedMovieCount: true, resetSortType: true});
        this.#renderMovie();
        break;
    }
  };

  #createFilm = (movie) => {
    const filmPresenter = new FilmPresenter(this.#filmContainer.element, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(movie);
    this.#filmPresenter.set(movie.id, filmPresenter);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilm({resetRenderedMovieCount: true});

    this.#renderMovie();
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
    const currentModalData = this.#movieModel.movies.find((movie) => movie.id === this.#openedFilmPresenter?.movieId);
    if (currentModalData) {
      this.#openedFilmPresenter.init(currentModalData);
    }
  };

  #renderMovie = () => {
    const movies = this.movies;
    const movieCount = movies.length;

    if (movieCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    render(this.#filmContainer, this.#filmSection.element);
    this.#renderFilmsList();

    this.#updateOpenedModal();

    this.#renderFilms(movies.slice(0, Math.min(movieCount, this.#renderedMovieCount)));

    if (movieCount > this.#renderedMovieCount) {
      this.#renderLoadMoreButton();
    }
  };
}
