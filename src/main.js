import {render} from './framework/render.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/film-details-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const filmModel = new FilmModel();
const filterModel = new FilterModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, filmModel, filterModel);
const filterPresenter = new FilterPresenter(pageMain, filterModel, filmModel);

render(new ProfileView, pageHeader);

render(new FooterStatisticsView(filmModel.count), pageFooter);

filterPresenter.init();
containerFilmsPresenter.init();
