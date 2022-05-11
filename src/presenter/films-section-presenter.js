import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmPopupSectionView from '../view/popup/film-popup-section-view.js';
import FilmPopupFormView from '../view/popup/film-popup-form-view.js';
import FilmPopupTopContainerView from '../view/popup/film-popup-top-container-view.js';
import FilmPopupCommentView from '../view/popup/film-popup-comment-view.js';
import FilmPopupBottomContainerView from '../view/popup/film-popup-bottom-container-view.js';
import FilmPopupCommentsWrapView from '../view/popup/film-popup-comments-wrap-view.js';
import FilmPopupCommentsListView from '../view/popup/film-popup-comments-list-view.js';
import FilmPopupNewCommentView from '../view/popup/film-popup-new-comment-view.js';
import CommentsModel from '../model/comments-model.js';

import { render } from '../render.js';

const FILM_CARD_LINK_CLASS = '.film-card__link';
const POPUP_SECTION_CLASS = 'film-details';
const POPUP_CLOSE_BUTTON_CLASS = '.film-details__close-btn';
const DOCUMENT_NO_SCROLL_CLASS = 'hide-overflow';

export default class FilmsSectionPresenter {
  #popupCommentsList = null;
  #popupBottomContainer = null;
  #newCommentForm = null;
  #popupFormComponent = null;
  #popupSectionComponent = null;
  #filmsSectionContainer = null;
  #popupContainer = null;
  #popupTopContainer = null;
  #popupCommentsWrap = null;
  #filmCardsModel = null;
  #commentsModel = null;
  #filmCards = [];
  #comments = [];

  #filmsSectionComponent = new FilmsSectionView();
  #filmsListComponent = new FilmsListSectionView();
  #filmsListContainer = new FilmsListContainerView();

  constructor(filmsSectionContainer, popupContainer, filmCardsModel) {
    this.#filmsSectionContainer = filmsSectionContainer;
    this.#popupContainer = popupContainer;
    this.#filmCardsModel = filmCardsModel;
    this.#filmCards = [...this.#filmCardsModel.cards];
  }

  init = () => {
    render(this.#filmsSectionComponent, this.#filmsSectionContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);
    render(this.#filmsListContainer, this.#filmsListComponent.element);
    for (let i = 0; i < this.#filmCards.length; i++) {
      this.#renderCard(this.#filmCards[i]);
    }
    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
  };

  #renderCard = (film) => {
    const cardComponent = new FilmCardView(film);
    const filmCardClickHandler = () => this.#renderPopup(film);

    cardComponent.element.querySelector(FILM_CARD_LINK_CLASS).addEventListener('click', filmCardClickHandler);
    render(cardComponent, this.#filmsListContainer.element);
  };

  #renderPopup = (film) => {
    this.#hidePopup();
    this.#popupContainer.classList.add(DOCUMENT_NO_SCROLL_CLASS);
    this.#commentsModel = new CommentsModel(film);
    this.#comments = [...this.#commentsModel.comments];
    this.#popupCommentsWrap = new FilmPopupCommentsWrapView(film.comments);
    this.#popupFormComponent = new FilmPopupFormView();
    this.#newCommentForm = new FilmPopupNewCommentView();
    this.#popupSectionComponent = new FilmPopupSectionView();
    this.#popupBottomContainer = new FilmPopupBottomContainerView();
    this.#popupCommentsList = new FilmPopupCommentsListView();
    this.#popupTopContainer = new FilmPopupTopContainerView(film);

    render(this.#popupFormComponent, this.#popupSectionComponent.element);
    render(this.#popupTopContainer, this.#popupFormComponent.element);
    render(this.#popupBottomContainer, this.#popupFormComponent.element);
    render(this.#popupCommentsWrap, this.#popupBottomContainer.element);
    for (let i = 0; i < this.#comments.length; i++) {
      this.#renderComment(this.#comments[i]);
    }
    render(this.#newCommentForm, this.#popupCommentsWrap.element);
    render(this.#popupSectionComponent, this.#popupContainer);

    this.#popupSectionComponent.element.querySelector(POPUP_CLOSE_BUTTON_CLASS).addEventListener('click', this.#popupCloseButtonClickHandler);
    document.addEventListener('keydown', this.#popupEscKeydownHandler);

  };

  #hidePopup = () => {
    if (this.#popupContainer.lastChild.className === POPUP_SECTION_CLASS) {
      this.#popupContainer.removeChild(this.#popupContainer.lastChild);
      this.#popupContainer.classList.remove(DOCUMENT_NO_SCROLL_CLASS);
      document.removeEventListener('keydown', this.#popupEscKeydownHandler);
    }
  };

  #renderComment = (comment) => {
    const commentComponent = new FilmPopupCommentView(comment);

    render(commentComponent, this.#popupCommentsWrap.element);
  };

  #popupEscKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#hidePopup();
    }
  };

  #popupCloseButtonClickHandler = () => this.#hidePopup();
}
