import FilmDetailsPresenter from './presenter/film-details-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter.js';
import CommentsModel from './model/comments-model';
import FilmsApiService from './api/films-api-service';
import CommentsApiService from './api/comments-api-service';
import {AUTHORIZATION, END_POINT} from './api/config.js';

const bodyElement = document.querySelector('body');
const pageMainElement = bodyElement.querySelector('.main');
const pageFooterElement = bodyElement.querySelector('.footer');
const filterModel = new FilterModel();
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));

const filterPresenter = new FilterPresenter(pageMainElement, filterModel, filmsModel);
const filmDetailsPresenter = new FilmDetailsPresenter(pageFooterElement, pageMainElement, filterModel, filmsModel, commentsModel, bodyElement);

filterPresenter.init();
filmDetailsPresenter.init();

filmsModel.init();
