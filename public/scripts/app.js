angular.module('biteMe', [ 'searchCtrl'

  ])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: '../../views/templates/search.html',
    controller: 'SearchController as a'
  })
})