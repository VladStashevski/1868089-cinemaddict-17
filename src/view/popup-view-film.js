import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDueDate} from '../utils/tasks.js';
import CommentPopupView from './popup-view-comment.js';

const createFilmDetailsPopupTemplate = (movie) => {

  const {
    filmInfo: {
      title,
      totalRating,
      poster,
      director,
      writers,
      actors,
      runtime,
      description,
      release: {
        date,
        releaseCountry
      },
      ageRating
    },
    comments,
    userDetails,
    emotionId
  } = movie;

  const createEmotion = () => (emotionId)
    ? `<img src="./images/emoji/${emotionId.split('-')[1]}.png" width="55" height="55" alt="emoji">`
    : '';

  const createDescription = () => (description)
    ? `${description}`
    : '';

  const getControlClassName = (option) => option
    ? 'film-details__control-button--active'
    : '';

  return (`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="${title}">
            <p class="film-details__age">${ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDueDate(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">Drama</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span></td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getControlClassName(userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${getControlClassName(userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${getControlClassName(userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${comments.reduce((template, comment) => {
      template += new CommentPopupView(comment).template;
      return template;
    }, '')}
          </ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${createEmotion()}
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">
                ${createDescription()}
              </textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

export default class PopupFilmView extends AbstractStatefulView {

  constructor (movie) {
    super();
    this._state = PopupFilmView.parseCommentToState(movie);

    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsPopupTemplate(this._state);
  }

  #textInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
    });
  };

  #emojiChangeHandler = (evt) => {
    if (evt.target.nodeName === 'INPUT') {
      evt.preventDefault();
      const scrollPosition = this.element.scrollTop;
      this.updateElement({
        emotionId: evt.target.id,
      });
      this.element.scrollTop = scrollPosition;
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiChangeHandler);

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#textInputHandler);
  };

  reset = (movie) => {
    this.updateElement(
      PopupFilmView.parseCommentToState(movie),
    );
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
    document.body.classList.remove('hide-overflow');
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.toWatchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.toWatchListClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.setCloseClickHandler(this._callback.closeClick);
    this.setWatchlistClickHandler(this._callback.toWatchListClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

  static parseCommentToState = (movie) => ({...movie, emotionId: null});
  static parseStateToComment = (state) => ({...state});
}
