import FilmsView from '../view/films-view';
import SortView from '../view/sort-view';
import FilmsList from '../view/films-list-view';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsListContainerView from '../view/film-container-view';
import FilmsExtraView from '../view/films-list-most-commented-view';
import {remove, render, RenderPosition} from '../framework/render';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListEmptyView from '../view/no-film-card-view';
import FilmPresenter from './films-list-presenter';
import {sortByDate, sortByRating, sortByCommentsAmount} from '../utils/helper';
import {SortType, UserAction, UpdateType, FilterType, TimeLimit} from '../const';
import {Filter} from '../utils/filter';
import LoadingFilmsView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import FilmsStaticticsView from '../view/footer-statistics-view';
import UserRankView from '../view/profile-rank-view';
import {getRandomFilms, getRatedFilmsCount, getCommentedFilmsCount} from '../utils/helper';

const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const siteHeaderElement = document.querySelector('.header');
const FILMS_COUNT_PER_STEP = 5;
const MAX_EXTRA_FILMS_COUNT = 2;

export default class FilmDetailsPresenter {
  #footerElement = null;
  #filmsContainer = null;
  #filterModel = null;
  #filmsModel = null;
  #commentsModel = null;
  #popupContainer = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(footerElement, filmsContainer, filterModel, filmsModel, commentsModel, popupContainer) {
    this.#footerElement = footerElement;
    this.#filmsContainer = filmsContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#popupContainer = popupContainer;
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsList();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsExtraListRatedComponent = new FilmsExtraView('Top rated');
  #filmsExtraListCommentedComponent = new FilmsExtraView('Most commented');
  #filmsListContainerRatedComponent = new FilmsListContainerView();
  #filmsListContainerCommentedComponent = new FilmsListContainerView();
  #buttonShowMoreComponent = null;
  #sortComponent = null;
  #filmsListEmptyComponent = null;
  #filmsListTitleComponent = new FilmsListTitleView();
  #loadingFilmsComponent = new LoadingFilmsView();
  #userRankComponent = null;
  #filmsStatisticsComponent = null;
  #filmPresenter = new Map();
  #filmPresenterRated = new Map();
  #filmPresenterCommented = new Map();
  #filmPresenters = [this.#filmPresenter, this.#filmPresenterRated, this.#filmPresenterCommented];
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #isLoading = true;

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = [];

    for (const film of films) {
      if(Filter[this.#filterType](film)) {
        filteredFilms.push(film);
      }
    }

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  init() {
    this.#renderBoard();
  }

  #renderLoading() {
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#loadingFilmsComponent, this.#filmsListComponent.element);
  }

  #renderSorting() {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeClickHandler(this.#handleSortTypeClick);
    render(this.#sortComponent, this.#filmsContainer);
  }

  #renderFilm(film, container, mapPresenters) {
    if (mapPresenters.has(film.id)) {
      mapPresenters.get(film.id).init(film);
      return;
    }

    const filmPresenter = new FilmPresenter(container, this.#footerElement, this.#handleViewAction, this.#resetPopup, this.#commentsModel, this.#popupContainer);

    filmPresenter.init(film);
    mapPresenters.set(film.id, filmPresenter);
  }

  #renderFilms = (films, container, mapPresenters) => {
    films.forEach((film) => this.#renderFilm(film, container, mapPresenters));
  };

  #renderShowMoreButton() {
    this.#buttonShowMoreComponent = new ButtonShowMoreView();
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
    this.#buttonShowMoreComponent.setShowMoreClickHandler(this.#handleShowFilmsClick);
  }

  #renderMostRated() {
    const films = this.films.slice();

    if (getRatedFilmsCount(films) === 0) {
      return;
    }

    const isRepeatingFilms = films
      .map((film) => film.comments.length)
      .filter((item) => item === films[0].comments).length === films.length;

    const ratedFilms = isRepeatingFilms ?
      getRandomFilms(films, MAX_EXTRA_FILMS_COUNT) :
      films.sort(sortByRating).slice(0, MAX_EXTRA_FILMS_COUNT);

    render(this.#filmsExtraListRatedComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerRatedComponent, this.#filmsExtraListRatedComponent.element);
    this.#renderFilms(ratedFilms, this.#filmsListContainerRatedComponent, this.#filmPresenterRated);
  }

  #renderMostCommented() {
    const films = this.films.slice();

    if (getCommentedFilmsCount(films) === 0) {
      return;
    }

    const isRepeatingFilms = films
      .map((film) => film.comments.length)
      .filter((item) => item === films[0].comments).length === films.length;

    const commentedFilms = isRepeatingFilms ?
      getRandomFilms(films, MAX_EXTRA_FILMS_COUNT) :
      films.sort(sortByCommentsAmount).slice(0, MAX_EXTRA_FILMS_COUNT);

    render(this.#filmsExtraListCommentedComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerCommentedComponent, this.#filmsExtraListCommentedComponent.element);
    this.#renderFilms(commentedFilms, this.#filmsListContainerCommentedComponent, this.#filmPresenterCommented);
  }

  #renderBoard() {
    const films = this.films;
    const filmsCount = films.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#userRankComponent = new UserRankView(this.#filmsModel.films);
    render(this.#userRankComponent, siteHeaderElement);

    if (filmsCount === 0) {
      this.#filmsListEmptyComponent = new FilmsListEmptyView(this.#filterType);
      render(this.#filmsComponent, this.#filmsContainer);
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsListEmptyComponent, this.#filmsListComponent.element);
      return;
    }

    this.#renderSorting();
    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);
    render(this.#filmsListTitleComponent, this.#filmsListComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    if (filmsCount > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }

    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)), this.#filmsListContainerComponent, this.#filmPresenter);
    this.#renderMostRated();
    this.#renderMostCommented();
    this.#filmsStatisticsComponent = new FilmsStaticticsView(filmsCount);
    render(this.#filmsStatisticsComponent, siteFooterStatisticsElement);
  }

  #clearBoard({resetPresenters = true, resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    const filmsCount = this.films.length;

    if (resetPresenters) {
      this.#filmPresenters
        .forEach((map) => {
          [...map.values()].forEach((presenter) => presenter.destroy());
          map.clear();
        });
    }

    remove(this.#sortComponent);
    remove(this.#buttonShowMoreComponent);
    remove(this.#loadingFilmsComponent);
    remove(this.#filmsExtraListCommentedComponent);
    remove(this.#filmsExtraListRatedComponent);
    remove(this.#userRankComponent);
    remove(this.#filmsStatisticsComponent);

    this.#filmsListContainerComponent.clear();
    this.#filmsListContainerRatedComponent.clear();
    this.#filmsListContainerCommentedComponent.clear();

    if (this.#filmsListEmptyComponent) {
      remove(this.#filmsListEmptyComponent);
    }

    if (resetRenderedFilmsCount) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #resetPopup = () => {
    this.#filmPresenters
      .forEach((map) => [...map.values()]
        .forEach((presenter) => presenter.resetPopupView()));
  };

  #updatePopup(data) {
    this.#filmPresenters.forEach((presenters) => {
      const filmPresenter = presenters.get(data.id);
      if (filmPresenter && filmPresenter.isOpenedPopup()) {
        filmPresenter.openPopup(data);
      }
    });
  }

  #clearMostCommented() {
    this.#filmsListContainerCommentedComponent.clear();
  }

  #handleShowFilmsClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);
    this.#renderFilms(films, this.#filmsListContainerComponent, this.#filmPresenter);

    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmsCount) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.forEach((presenters) => {
          const filmPresenter = presenters.get(data.id);
          if (filmPresenter) {
            filmPresenter.init(data);
          }
        });
        this.#clearMostCommented();
        this.#renderMostCommented();
        break;
      case UpdateType.MINOR:
        this.#clearBoard({resetPresenters: false});
        this.#renderBoard();
        this.#updatePopup(data);
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingFilmsComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#uiBlocker.block();
        await this.#filmsModel.updateFilm(updateType, updateFilm);
        this.#uiBlocker.unblock();
        break;
      case UserAction.ADD_COMMENT:
        this.#uiBlocker.block();
        this.#filmPresenters.forEach((presenters) => {
          if (presenters.has(updateFilm.id)) {
            const filmPresenter = presenters.get(updateFilm.id);
            if (filmPresenter.isOpenedPopup()) {
              filmPresenter.setSaving();
            }
          }
        });
        try {
          await this.#commentsModel.addComment(updateType, updateFilm, updateComment);
          await this.#filmsModel.updateFilm(updateType, updateFilm);
        } catch(err) {
          this.#filmPresenters.forEach((presenters) => {
            if (presenters.has(updateFilm.id)) {
              const filmPresenter = presenters.get(updateFilm.id);
              if (filmPresenter.isOpenedPopup()) {
                filmPresenter.setAborting();
              }
            }
          });
        }
        this.#uiBlocker.unblock();
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPresenters.forEach((presenters) => {
          if (presenters.has(updateFilm.id)) {
            const filmPresenter = presenters.get(updateFilm.id);
            if (filmPresenter.isOpenedPopup()) {
              filmPresenter.setDeleting(updateComment);
            }
          }
        });
        try {
          await this.#commentsModel.deleteComment(updateType, updateFilm, updateComment);
          await this.#filmsModel.updateFilm(updateType, updateFilm);
        } catch(err) {
          this.#filmPresenters.forEach((presenters) => {
            if (presenters.has(updateFilm.id)) {
              const filmPresenter = presenters.get(updateFilm.id);
              if (filmPresenter.isOpenedPopup()) {
                filmPresenter.setAborting();
              }
            }
          });
        }
        break;
    }
  };

  #handleSortTypeClick = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmsCount: true});
    this.#renderBoard();
  };
}
