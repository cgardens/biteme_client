angular.module('search.controllers', [])

  .controller('SearchFormCtrl', function($scope, $http, $stateParams) {
    $scope
  })

  .controller('SearchResultCtrl', function($scope, $http, $stateParams) {
    $scope.searchResults = function() {
      var url = 'http://localhost:3000/recipes/search?term=' + $scope.newSearch.term;
      $http.get(url)
        .success(function(data) {
          $scope.recipes = data;
        });
    };

    $scope.searches = [];
    $scope.searchModel = {term: ''};
    $scope.newSearch = angular.copy($scope.searchModel);
  })