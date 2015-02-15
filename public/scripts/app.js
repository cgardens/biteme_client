var biteMe = angular.module('biteMe', [ 'ui.router' ]);

biteMe.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('search', {
    url: '/search',
    templateUrl: 'partials/search.html'
  })

  .state('/', {
    url: '/',
    template: "<h1>home</h1>"
  })

  $urlRouterProvider.otherwise('/');
})