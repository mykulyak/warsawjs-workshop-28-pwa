import { html, render } from 'lit-html';
import 'material-design-lite';

import { readProjectList } from './api';

import './Application.scss';

const projectTemplate = ({ id, name, taskCount }) => html`
  <div data-project-id="${id}" class="mdl-card mdl-shadow--2dp full-width">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">${name}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      ${taskCount} tasks to do.
    </div>
    <div class="mdl-card__actions mdl-card--border full-width">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Edit
      </a>
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Delete
      </a>
    </div>
  </div>
`;

const template = ({ data }) => html`
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <div class="mdl-layout-title">PWA Todoist</div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-exp">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-exp">
          </div>
        </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">PWA Todoist</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/">Home</a>
        <a class="mdl-navigation__link" href="/projects">Projects</a>
        <a class="mdl-navigation__link" href="/settings">Settings</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div id="content" class="page-content">
        ${(data.map(projectTemplate))}
      </div>
    </main>
  </div>
`;

export default class Application {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.data = [];
  }

  loadData = async () => {
    const response = await readProjectList();
    this.data = response || [];
    this.render();
  };

  render() {
    render(template({ data: this.data }), this.rootEl);
  }

  start() {
    this.loadData();
    this.render();
  }
}
