import FilmCardView from '../view/films/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/films/films-section-view.js';
import FilmsListSectionView from '../view/films/films-list-section-view.js';
import FilmsListContainerView from '../view/films/films-list-container-view.js';
import FilmPopupSectionView from '../view/popup/film-popup-section-view.js';
import FilmPopupFormView from '../view/popup/film-popup-form-view.js';
import FilmPopupTopContainerView from '../view/popup/film-popup-top-container-view.js';
import FilmPopupCommentView from '../view/popup/film-popup-comment-view.js';
import FilmPopupBottomContainerView from '../view/popup/film-popup-bottom-container-view.js';
import FilmPopupCommentsWrapView from '../view/popup/film-popup-comments-wrap-view.js';
import FilmPopupCommentsListView from '../view/popup/film-popup-comments-list-view.js';
import FilmPopupNewCommentView from '../view/popup/film-popup-new-comment-view.js';
import FilmsListEmptyView from '../view/films/films-list-empty-view.js';
import CommentsModel from '../model/comments-model.js';
import { render } from '../render.js';
import { CARDS_PER_STEP } from '../const.js';

const DOCUMENT_NO_SCROLL_CLASS = 'hide-overflow';

export default class FilmsSectionPresenter {
  #popupFormComponent = null;
  #popupSectionComponent = null;
  #popupCommentsListComponent = null;
  #popupBottomContainerComponent = null;
  #popupContainerComponent = null;
  #popupTopContainerComponent = null;
  #popupCommentsWrapComponent = null;
  #popupNewCommentFieldComponent = null;
  #popupCommentsModel = null;
  #filmsSectionContainer = null;
  #filmCardsModel = null;

  #renderedFilmIndex = 0;
  #films = [];
  #popupComments = [];

  #filmsSectionComponent = new FilmsSectionView();
  #filmsListComponent = new FilmsListSectionView();
  #filmsListContainer = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsListEmpty = new FilmsListEmptyView();

  constructor(filmsSectionContainer, popupContainer, filmCardsModel) {
    this.#filmsSectionContainer = filmsSectionContainer;
    this.#popupContainerComponent = popupContainer;
    this.#filmCardsModel = filmCardsModel;
    this.#films = [...this.#filmCardsModel.cards];
  }

  init = () => {
    render(this.#filmsSectionComponent, this.#filmsSectionContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);
    render(this.#filmsListContainer, this.#filmsListComponent.element);
    this.#renderCardsList();
  };

  #renderCard = (film) => {
    const cardComponent = new FilmCardView(film);
    const handleFilmCardClick = () => this.#renderPopup(film);

    cardComponent.setClickHandler(handleFilmCardClick);
    render(cardComponent, this.#filmsListContainer.element);
  };

  #renderCards = () => {
    for (let i = 0; i < CARDS_PER_STEP && this.#renderedFilmIndex < this.#films.length; i++) {
      this.#renderCard(this.#films[this.#renderedFilmIndex]);
      this.#renderedFilmIndex++;
    }
  };

  #renderCardsList = () => {
    if (this.#films.length === 0) {
      render(this.#filmsListEmpty, this.#filmsListContainer.element);
    }
    this.#renderCards();
    this.#renderShowMoreButton();
  };


  #renderShowMoreButton = () => {
    if (this.#films.length > CARDS_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #renderPopup = (film) => {
    if (this.#popupSectionComponent) {
      this.#hidePopup();
    }

    this.#popupSectionComponent = new FilmPopupSectionView();
    this.#popupFormComponent = new FilmPopupFormView();
    this.#popupTopContainerComponent = new FilmPopupTopContainerView(film);
    this.#popupBottomContainerComponent = new FilmPopupBottomContainerView();
    this.#popupCommentsListComponent = new FilmPopupCommentsListView();
    this.#popupNewCommentFieldComponent = new FilmPopupNewCommentView();
    this.#popupCommentsWrapComponent = new FilmPopupCommentsWrapView(film.comments);
    this.#popupCommentsModel = new CommentsModel(film);
    this.#popupComments = [...this.#popupCommentsModel.comments];

    this.#popupContainerComponent.classList.add(DOCUMENT_NO_SCROLL_CLASS);

    render(this.#popupFormComponent, this.#popupSectionComponent.element);
    render(this.#popupTopContainerComponent, this.#popupFormComponent.element);
    render(this.#popupBottomContainerComponent, this.#popupFormComponent.element);
    render(this.#popupCommentsWrapComponent, this.#popupBottomContainerComponent.element);
    for (let i = 0; i < this.#popupComments.length; i++) {
      this.#renderComment(this.#popupComments[i]);
    }
    render(this.#popupNewCommentFieldComponent, this.#popupCommentsWrapComponent.element);
    render(this.#popupSectionComponent, this.#popupContainerComponent);

    this.#popupTopContainerComponent.setCloseButtonClickHandler(this.#handlePopupCloseButtonClick);
    document.addEventListener('keydown', this.#popupEscKeydownHandler);
  };

  #hidePopup = () => {
    this.#popupSectionComponent.element.remove();
    this.#popupSectionComponent.removeElement();
    this.#popupContainerComponent.classList.remove(DOCUMENT_NO_SCROLL_CLASS);
    document.removeEventListener('keydown', this.#popupEscKeydownHandler);
  };

  #renderComment = (comment) => {
    const commentComponent = new FilmPopupCommentView(comment);

    render(commentComponent, this.#popupCommentsWrapComponent.element);
  };

  #handleShowMoreButtonClick = () => {
    if (this.#films.length - this.#renderedFilmIndex <= CARDS_PER_STEP) {
      this.#filmsListComponent.element.removeChild(this.#showMoreButtonComponent.element);
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
    this.#renderCards();
  };

  #popupEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#hidePopup();
    }
  };

  #handlePopupCloseButtonClick = () => this.#hidePopup();
}
