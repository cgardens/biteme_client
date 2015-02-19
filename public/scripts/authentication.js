angular.module('auth.controllers', ['ngStorage'])

  .controller('AuthCtrl', ['$scope', '$http','$localStorage', '$location', '$window', '$stateParams', function($scope, $http, $localStorage, $location, $window, $stateParams) {
    // if ($localStorage.userID) { $location.path('/search_results'); };

    $scope.getURLParameter = function(sParam){
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++){
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam){
                return sParameterName[1];
              }
            }
          };


      // console.log($scope.$location);
      console.log('id', $scope.getURLParameter('id'))
      console.log('token', $scope.getURLParameter('token'))
      $localStorage.userID = $scope.getURLParameter('id')
      $localStorage.token = $scope.getURLParameter('token')
      console.log($localStorage.userID + '--------------USER ID------------------')
      console.log($localStorage.token + '--------------TOKEN------------------')
      console.log('garbage id', $location.search().id )
      console.log('garbage token', $location.search().token )
      $localStorage.userID = $location.search().id
      $localStorage.token = $location.search().token

      // console.log('state params', $stateParams)
      // console.log('location params', $location)
      // var param1 = $routeParams.param1;
      // var param1 = $routeParams.param2;
      // $scope.ur = $scope.$location.url('www.html.com/x.html?keyword=test#/x/u');
      // $scope.loc1 = $scope.$location.search().keyword

      // $localStorage.token = res.token;
      // $localStorage.userID = res.data._id;


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
          // $localStorage.token = res.token;
          // $localStorage.userID = res.data._id;
          $location.path('/search_results');
        }
      });
    };

    $scope.login = function() {
      $http.get('http://localhost:3000/facebook_signup')
      .success(function(res, body) {
        if (res.type === false) {
          $scope.error = res.data;
        } else {
          console.log('res data', res.url)
          console.log('body', body)
          // $localStorage.token = res.token;
          // $localStorage.userID = res.data._id;
          // $location.path(res.url);
          $window.location.href = res.url
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
        console.log($localStorage.userID)
        console.log("user is logged out");
        return false;
      }
    };
  }]);