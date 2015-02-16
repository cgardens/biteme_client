angular.module('BiteMe', [ // 'app.factories',
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

  .filter('formatTime', function() {
    return function(sec) {
      var mm = Math.floor(sec / 60);
      var ss = sec - (mm * 60);

      if (mm < 10) { mm = '0' + mm; }
      if (ss < 10) { ss = '0' + ss; }

      return mm + ':' + ss;
    }
  })

  .filter('fraction', function() {
    return function(input) {
      firstSpace = input.indexOf(' ')
      num = input.substr(0, firstSpace);
      string = input.substr(firstSpace + 1);
      return Ratio.parse(num).simplify().toLocaleString() + ' ' + string;
    }
  })