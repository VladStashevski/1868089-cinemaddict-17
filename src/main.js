import {render} from './framework/render.js';
import {FilterType} from './const.js';
import ProfileView from './view/profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmModel from './model/film-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const filmModel = new FilmModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, filmModel);

render(new ProfileView, pageHeader);
render(new MainNavigationView(filmModel.filtered, FilterType.ALL), pageMain);
render(new FooterStatisticsView(filmModel.count), pageFooter);

containerFilmsPresenter.init();
