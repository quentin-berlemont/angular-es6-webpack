import AppTemplate from './app.html';
import './app.css';

class AppComponent {
  constructor() {
    this.title = 'Tour of Heroes';
  }
}

export default {
  template: AppTemplate,
  controller: AppComponent,
  controllerAs: 'app'
}
