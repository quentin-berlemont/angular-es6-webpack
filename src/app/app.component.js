import template from './app.html';
import './app.css';

class AppComponent {
  constructor() {
    this.title = 'Tour of Heroes';
  }
}

export default {
  template: template,
  controller: AppComponent
}
