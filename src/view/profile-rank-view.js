import AbstractView from '../framework/view/abstract-view';
import {getUserRank} from '../utils/helper';
import {getWatchedFilmsCount} from '../utils/helper';

const createUserRankNameTemplate = (films) => {
  const watchedFilmsCount = getWatchedFilmsCount(films);
  const userRank = getUserRank(watchedFilmsCount);

  return `<p class="profile__rating">${userRank}</p>`;
};

const createUserRankTemplate = (watchedFilms) => {
  const userRankNameTemplate = createUserRankNameTemplate(watchedFilms);

  return `<section class="header__profile profile">
              ${userRankNameTemplate}
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
};

export default class UserRankView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createUserRankTemplate(this.#films);
  }
}
