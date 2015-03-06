angular.module('auth.controllers', ['ngStorage'])

  .controller('AuthCtrl', ['$scope', '$http','$localStorage', '$location', '$window', function($scope, $http, $localStorage, $location, $window) {

    if ($localStorage.userID) { $location.path('/search_results'); }

    if ($location.search().id) {
      $localStorage.userID = $location.search().id;
      $localStorage.token = $location.search().token;
    }

    $scope.signUp = function() {
      $http.post('http://biteme-server.herokuapp.com/users/signup/', {
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
          $location.path('/search_results');
        }
      });
    };

    $scope.login = function() {
      $http.get('http://biteme-server.herokuapp.com/facebook_signup')
      .success(function(res, body) {
        if (res.type === false) {
          $scope.error = res.data;
        } else {
          $window.location.href = res.url;
        }
      });
    };

    $scope.logout = function() {
      delete $localStorage.userID;
      delete $localStorage.token;
    };

    $scope.isLoggedIn = function() {
      if ($localStorage.userID) {
        console.log("user is logged in");
        return true;
      } else {
        console.log("user is logged out");
        return false;
      }
    };
  }])