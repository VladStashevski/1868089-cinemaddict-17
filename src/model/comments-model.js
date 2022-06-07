import {generateComment} from '../mock/comments.js';

const COMMENT_COUNT = 50;

export default class CommentsModel {
  #comments = Array.from({length: COMMENT_COUNT}, generateComment);

  get comments() {
    return this.#comments;
  }

  getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);
}
