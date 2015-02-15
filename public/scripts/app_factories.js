// angular.module('app.factories', [])

//   .factory('AppFactory', function($http, $q) {
//     function request(uri, type, data) {
//       var d = $q.defer();
//       switch (type) {
//         case 'get':
//           (function() { $http.get(uri).success(function(response) { d.resolve(response); }).error(function(response) { d.reject(response.error); })})();
//           break;
//         case 'post':
//           (function() { $http.post(uri).success(function(response) { d.resolve(response); }).error(function(response) { d.reject(response.error); })})();
//           break;
//         case 'put':
//           (function() { $http.put(uri).success(function(response) { d.resolve(response); }).error(function(response) { d.reject(response.error); })})();
//           break;
//         case 'delete':
//           (function() { $http.delete(uri).success(function(response) { d.resolve(response); }).error(function(response) { d.reject(response.error); })})();
//           break;
//       }
//       return d.promise;
//     }
//     return { request: request }
//   })