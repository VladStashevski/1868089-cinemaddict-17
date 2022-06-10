import {render} from './framework/render.js';
import {FilterType} from './const.js';
import ProfileView from './view/profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/main-presenter.js';
import MovieModel from './model/movie-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const movieModel = new MovieModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, movieModel);

render(new ProfileView, pageHeader);
render(new MainNavigationView(movieModel.filtered, FilterType.ALL), pageMain);
render(new FooterStatisticsView(movieModel.count), pageFooter);

containerFilmsPresenter.init();
