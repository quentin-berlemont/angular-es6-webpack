import template from './app.html';

class AppComponent {
  constructor() {
    this.title = 'Tour of Heroes';
  }
}

export default {
  template: template,
  controller: AppComponent
}
