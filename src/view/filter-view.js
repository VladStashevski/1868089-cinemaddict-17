import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<a
    href='#${type}'
    class="main-navigation__item
    ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    data-filter="${type}">
      ${name} ${type === 'all' ? '' : `<span data-filter="${type}" class="main-navigation__item-count">${count}</span>`}
    </a>`;
};

const createFilterTemplate = (filters, currentFilterType) => {

  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
      ${filterItemsTemplate}
  </nav>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    const targetClassList = evt.target.classList;

    if (targetClassList.contains('main-navigation__item-count')) {
      this._callback.filterTypeChange(evt.target.parentNode.dataset.filter);
      return;
    }

    if (targetClassList.contains('main-navigation__item')) {
      this._callback.filterTypeChange(evt.target.dataset.filter);
    }
  };
}
