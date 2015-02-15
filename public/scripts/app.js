var BiteMe = angular.module('BiteMe', [ 'ui.router' ]);

BiteMe.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'partials/authentication.html'
  })

  .state('search', {
    url: '/search',
    templateUrl: 'partials/search_form.html'
  })

  .state('search_results', {
    url: '/search_results',
    templateUrl: 'partials/search_results.html'
  })

  .state('recipe', {
    url: '/recipes/:id',
    templateUrl: 'partials/recipe_show.html'
  })

  // .state('user', {
  //   url: '/users/:id',
  //   templateUrl: 'partials/user_show.html'
  // })

  $urlRouterProvider.otherwise('/');
})