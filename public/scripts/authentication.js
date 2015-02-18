angular.module('auth.controllers', ['ngStorage'])

  .controller('AuthCtrl', ['$scope', '$http','$localStorage', '$location', function($scope, $http, $localStorage, $location) {
    // if ($localStorage.userID) { $location.path('/search_results'); };

    $scope.signUp = function() {
      $http.post('http://localhost:3000/users/signup/', {
        firstName: $scope.signup_first_name,
        email: $scope.signup_email,
        password: $scope.signup_password
      })
      .success(function(res, body) {
        if (res.type === false) {
          $scope.error = res.data;
        } else {
          $localStorage.token = res.token;
          $localStorage.userID = res.data._id;
          $location.path('/search_results')
        }
      })
    };

    $scope.login = function() {
      $http.post('http://localhost:3000/authenticate', {
        email: $scope.login_email,
        password: $scope.login_password
      })
      .success(function(res, body) {
        if (res.type === false) {
          $scope.error = res.data;
        } else {
          $localStorage.token = res.token;
          $localStorage.userID = res.data._id;
          $location.path('/search_results')
        }
      })
    };

    $scope.logout = function() {
      delete $localStorage.userID;
      delete $localStorage.token;
    }
  }]);