angular.module('search.controllers', [])

  .controller('SearchFormCtrl', function($scope, $http, $stateParams) {
    $scope
  })

  .controller('SearchResultCtrl', function($scope, $http, $stateParams) {
    $scope.searches = [];

    $scope.newSearch = { term: '' };

    $scope.getSearchResults = function() {
      var userID = '54dd42f2e4b0721d2b31da3e'
      $http.get('http://localhost:3000/users/' + userID)
      .success(function(data) { $scope.recipes = data; })
      .error(function(data) { console.log('Error: ' + data) })
    }
  })