'user strict';

var app = angular.module('BiteMe', [ // 'app.factories',
                           'ngStorage',
                           'user.controllers',
                           'auth.controllers',
                           'recipe.controllers',
                           'search.controllers',
                           'user.controllers',
                           'ui.router' ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

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



    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
      return {
          'request': function (config) {
              config.headers = config.headers || {};
              if ($localStorage.token) {
                  config.headers.Authorization = 'Bearer ' + $localStorage.token;
              }
              return config;
          },
          'responseError': function(response) {
              if(response.status === 401 || response.status === 403) {
                  $location.path('/signin');
              }
              return $q.reject(response);
          }
      };
    }]);




    // .state('user', {
    //   url: '/users/:userId',
    //   templateUrl: 'partials/user_show.html',
    //   controller: 'UserCtrl as u'
    // })

    $urlRouterProvider.otherwise('/');
  }])