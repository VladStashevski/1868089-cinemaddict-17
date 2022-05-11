import { COMMENTS } from '../mock/comment.js';

const getCommentByID = (id) => COMMENTS[id];

export default class CommentsModel {
  #comments = [];

  constructor(film) {
    this.#comments = film.comments.map(getCommentByID);
  }

  get comments() {
    return this.#comments;
  }
}
