import { getSomeComment } from './fish-film-coment.js';
export default class NewComment {
  comments = Array.from({length:1}, getSomeComment);
  getComments = () => this.comments;
}
