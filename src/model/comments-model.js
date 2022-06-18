import Observable from '../framework/observable.js';
import {COMMENT_COUNT} from '../const.js';
import {generateComment} from '../mock/comments-template.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: COMMENT_COUNT}, generateComment);

  get comments() {
    return this.#comments;
  }

  getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Cannot delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
