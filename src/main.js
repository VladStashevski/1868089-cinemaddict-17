import AvatarIcon from './view/avatar.js';
import NewNavMenu from './view/nav-menu.js';
import NewSort from './view/sort.js';
import NewFilms from './view/film-list.js';
import NewButtonShowMore from './view/button-show-more.js';
import NewFilmsRated from './view/films-rated.js';
import NewFilmsMostComment from './view/films-most-commented.js';
import { render } from './render.js';
import NewFilmsCatalog from './presenter/films-presenter.js';
import NewFilmsCatalogRated from './presenter/rated-films-precenter.js';
import NewFilmsCatalogMostComment from './presenter/most-comment-films-presenter.js';
import NewFilmCardModel from './model/film-card-model.js';
import NewFilmPopup from './presenter/popup-presenter.js';
import NewComment from './model/film-coment-model.js';

const header = document.querySelector('.header');

const main = document.querySelector('.main');

const footer = document.querySelector('.footer');

const filmsCatalogPresenter = new NewFilmsCatalog();

const filmsCatalogRatedPresenter = new NewFilmsCatalogRated();

const filmsCatalogMostCommentPresenter = new NewFilmsCatalogMostComment();

const filmsCardModel = new NewFilmCardModel();

const filmPopupPresenter = new NewFilmPopup();

const filmCommentPresenter = new NewComment();

render( new AvatarIcon (), header);
render( new NewNavMenu(), main);
render(new NewSort(), main);
render(new NewFilms(), main);

const filmsContainer = main.querySelector('.films-list__container');
filmsCatalogPresenter.init(filmsContainer, filmsCardModel);
const films = main.querySelector('.films');

render(new NewButtonShowMore, films);
render(new NewFilmsRated, films);
render(new NewFilmsMostComment, films);

const topRated = main.querySelector('.rated');
filmsCatalogRatedPresenter.init(topRated, filmsCardModel);
const mostCommented = main.querySelector('.most_commented');
filmsCatalogMostCommentPresenter.init(mostCommented, filmsCardModel);
filmPopupPresenter.init(footer, filmsCardModel, filmCommentPresenter);
