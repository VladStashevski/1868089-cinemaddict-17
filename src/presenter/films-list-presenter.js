import FilmCardView from '../view/film-card-view';
import PopupSectionView from '../view/film-popup-section-view';
import {render, replace, remove, RenderPosition} from '../framework/render';
import {UserAction, UpdateType} from '../const';
import PopupFormView from '../view/film-details-view';

export default class FilmPresenter {
  #container = null;
  #footerElement = null;
  #filmCardComponent = null;
  #popupFormComponent = null;
  #changeData = null;
  #film = null;
  #resetPopup = null;
  #commentsModel = null;
  #popupSectionComponent = null;
  #scrollPosition = null;
  #popupFormInfo = null;
  #popupContainer = null;

  constructor(container, footerElement, changeData, resetPopup, commentsModel, popupContainer) {
    this.#container = container;
    this.#footerElement = footerElement;
    this.#changeData = changeData;
    this.#resetPopup = resetPopup;
    this.#commentsModel = commentsModel;
    this.#popupContainer = popupContainer;
    this.#commentsModel.addObserver(this.#changeData);
  }

  setSaving() {
    this.#popupFormComponent.updateElement({isFormDisabled: true, isButtonDisabled: true});
  }

  setDeleting(comment) {
    this.#popupFormComponent.updateElement({isFormDisabled: true, isButtonDisabled: true, deletingId: comment});
  }

  setAborting() {
    const resetPopupForm = () => {
      this.#popupFormComponent.updateElement({isFormDisabled: false, isButtonDisabled: false, deletingId: ''});
    };

    this.#popupFormComponent.shake(resetPopupForm);
  }

  init(film) {
    this.#film = film;
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(film, this.#film.comments);

    this.#filmCardComponent.setOpenPopupClickHandler(() => {
      this.#handleFilmClick();
    });

    this.#filmCardComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmCardComponent.setAddToWatchedClickHandler(this.#handleAddToWatchedClick);
    this.#filmCardComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#container.element);
      return;
    }

    if (this.#container.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    } else {
      render(this.#filmCardComponent, this.#container.element);
    }

    remove(prevFilmCardComponent);

    if (this.#popupSectionComponent) {
      this.openPopup();
    }
  }

  openPopup = async (data = this.#film) => {
    const comments = await this.#commentsModel.init(this.#film.id).then(() => this.#commentsModel.comments);
    this.#film = data;
    this.#resetPopup();
    const prevPopupSectionComponent = this.#popupSectionComponent;
    this.#popupSectionComponent = new PopupSectionView();
    this.#popupFormComponent = new PopupFormView(this.#film, comments, this.#commentsModel);
    this.#popupFormComponent.setClosePopupClickHandler(this.#handleClosePopupClick);
    this.#popupFormComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#popupFormComponent.setAddToWatchedClickHandler(this.#handleAddToWatchedClick);
    this.#popupFormComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoriteClick);
    this.#popupFormComponent.setDeleteCommentClickHandlers(this.#handleDeleteCommentClick);
    this.#popupFormComponent.setAddCommentKeyDownHandler(this.#handleAddCommentKeyDown);
    this.#popupContainer.classList.add('hide-overflow');

    document.addEventListener('keydown', this.#escKeyDownHandler);

    if (prevPopupSectionComponent === null) {
      render(this.#popupSectionComponent, this.#footerElement, RenderPosition.AFTEREND);
      render(this.#popupFormComponent, this.#popupSectionComponent.element);
      this.#popupSectionComponent.element.scrollTo(0, this.#scrollPosition);
      this.#popupFormComponent.updateElement(this.#popupFormInfo);
    }
  };

  resetPopupView = () => {
    if (this.#popupSectionComponent === null) {
      return;
    }

    this.#closePopup(this.#escKeyDownHandler);
  };

  isOpenedPopup() {
    return !!this.#popupSectionComponent;
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupSectionComponent);
  };

  #closePopup() {
    remove(this.#popupSectionComponent);
    this.#popupContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#popupSectionComponent = null;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closePopup(this.#escKeyDownHandler);
    }
  };

  #handleFilmClick() {
    this.openPopup();
  }

  #handleClosePopupClick = () => {
    this.#closePopup(this.#escKeyDownHandler);
  };

  #handleAddToWatchlistClick = () => {
    this.#customUpdateElement(
      true,
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  };

  #handleAddToWatchedClick = () => {
    this.#customUpdateElement(
      true,
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  };

  #handleAddToFavoriteClick = () => {
    this.#customUpdateElement(
      true,
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  };

  #handleAddCommentKeyDown = (film, comment) => {
    this.#customUpdateElement(
      false,
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      film, comment);
  };

  #handleDeleteCommentClick = (film, comment) => {
    this.#customUpdateElement(
      true,
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      film, comment);
  };

  #customUpdateElement(isSavingUserInfo, userAction, updateType, film, comment) {
    if (this.#popupSectionComponent) {
      this.#scrollPosition = this.#popupSectionComponent.element.scrollTop;
      this.#popupFormInfo = isSavingUserInfo ? this.#popupFormComponent._state : '';
    }

    this.#changeData(userAction, updateType, film, comment);
  }
}
