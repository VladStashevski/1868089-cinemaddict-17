import FilmsSectionPresenter from './presenter/films-section-presenter.js';
import FilmCardsModel from './model/film-cards-model.js';
import UserTitleView from './view/user-title-view.js';
import NavigationView from './view/navigation-view.js';
import FiltersView from './view/filters-view.js';
import { render } from './render.js';

const pageBody = document.querySelector('body');
const pageHeaderSection = pageBody.querySelector('.header');
const pageMainSection = pageBody.querySelector('.main');

const filmCardsModel = new FilmCardsModel();
const filmsSectionPresenter = new FilmsSectionPresenter(pageMainSection, pageBody, filmCardsModel);

render(new UserTitleView(), pageHeaderSection);
render(new NavigationView(), pageMainSection);
render(new FiltersView(), pageMainSection);

filmsSectionPresenter.init();
