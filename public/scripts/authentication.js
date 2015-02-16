angular.module('auth.controllers', ['ngStorage'])

  .controller('AuthCtrl', ['$scope', '$http','$localStorage', function($scope, $http, $localStorage) {

    $scope.signUp = function() {
      console.log('hit signup function')
      $http.post('http://localhost:3000/users/signup/', {
      email: 'sam@dbc.com',
      username: "sampeanut",
      password: "123",
      firstName: "fake",
      lastName: "person"
      }).success(function(res, body) {
        console.log('success!')
        console.log(res)
        $localStorage.token = res.token
        $localStorage.userID = res.data._id
        // console.log(body)
      });
    };

    $scope.login = function() {
      console.log('hit login function')
      $http.post('http://localhost:3000/authenticate', {
        email: 'sam@dbc.com',
        password: '123'
      }).success(function(res, body) {
        console.log('success!')
        console.log(res)
        // console.log(res.token)
        $localStorage.token = res.token
        $localStorage.userID = res.data._id
        console.log('token', $localStorage.token)
        console.log('id', $localStorage.userID)
      });
    };

    $scope.checkStorage = function() {
      console.log('token', $localStorage.token)
      console.log('id', $localStorage.userID)
    }

    $scope.me = function () {
      $http.get('http://localhost:3000/users/' + $localStorage.userID)
        .success(function(res, body) {
        console.log('success!')
        console.log(res)
      })
    }

    $scope.logout = function() {
      delete $localStorage.userID
      delete $localStorage.token
      console.log('logged out')
    }
  }
  ]);