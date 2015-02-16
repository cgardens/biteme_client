'user strict';

var app = angular.module('BiteMe', [ // 'app.factories',
                           'user.controllers'
                           'auth.controllers',
                           'recipe.controllers',
                           'search.controllers',
                           'user.controllers',
                           'ui.router' ])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'partials/authentication.html',
      controller: 'AuthCtrl as a'
    })

    .state('search', {
      url: '/search',
      templateUrl: 'partials/search_form.html',
      controller: 'SearchFormCtrl as sf'
    })

    .state('search_results', {
      url: '/search_results',
      templateUrl: 'partials/search_results.html',
      controller: 'SearchResultCtrl as sr'
    })

    .state('recipe', {
      url: '/recipes/:recipeId',
      templateUrl: 'partials/recipe_show.html',
      controller: 'RecipeCtrl as r'
    })

    // .state('user', {
    //   url: '/users/:userId',
    //   templateUrl: 'partials/user_show.html',
    //   controller: 'UserCtrl as u'
    // })

    $urlRouterProvider.otherwise('/');
  })