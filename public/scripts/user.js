angular.module('user.controllers', [])

  .controller('UserCtrl', function($scope, $http, $stateParams, $localStorage) {
    console.log($localStorage.userID)
    $http.get('http://localhost:3000/users/' + $localStorage.userID)
      .success(function(data) {
        $scope.user = data.data;
      })
      .error(function(data) { console.log('Error: ' + data); })
    $http.get('http://localhost:3000/admin/users/' + $localStorage.userID + '/recipes')
      .success(function(data) {
        $scope.recipes = [];
        $scope.customRecipes = [];
        for (i = 0; i < data.recipes.length; i++) {
          if (data.recipes[i].customRecipe === true) {
            $scope.customRecipes.push(data.recipes[i]);
          } else {
            $scope.recipes.push(data.recipes[i]);
          }
        }
      })
  })