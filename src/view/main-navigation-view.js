import {FilterType, FilterName} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class MainNavigationView extends AbstractView {
  #filters = null;
  #active = null;

  constructor(filters, active) {
    super();
    this.#filters = filters;
    this.#active = active;
  }

  get template() {

    const createMainNavigationTemplate = Object.entries(this.#filters)
      .map(([name, func]) => this.#generateMainNavigationTemplate(
        {
          name: name,
          title: FilterName[name],
          count: (name !== FilterType.ALL) ? func().length : ''
        }, this.#active))
      .join('');

    return (
      `<nav class="main-navigation">
        ${createMainNavigationTemplate}
      </nav>`
    );
  }

  #generateMainNavigationTemplate = (filter, active) => {
    const activeClass = (active === filter.name) ? ' main-navigation__item--active' : '';
    const movieCount = (filter.count) ? ` <span class="main-navigation__item-count">${filter.count}</span>` : '';
    return (
      `<a href="#${filter.name}" class="main-navigation__item${activeClass}">
        ${filter.title}${movieCount}
      </a>`
    );
  };
}
