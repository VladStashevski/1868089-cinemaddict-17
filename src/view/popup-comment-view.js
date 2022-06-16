import AbstractView from '../framework/view/abstract-view.js';
import {humanizeCommentDateTime} from '../utils/task.js';
import he from 'he';

const createComment = (comments) => {
  const {comment, date, emotion, author, id} = comments;

  return (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${humanizeCommentDateTime(date)}</span>
        <button class="film-details__comment-delete" data-button-id="${id}">Delete</button>
      </p>
    </div>
  </li>`);
};

export default class CommentPopupView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createComment(this.#comment);
  }
}

export {createComment};
