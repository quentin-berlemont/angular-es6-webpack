import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import AppComponent from './app.component';

angular.module('app', [
  angularUiRouter
])
.component('app', AppComponent);
