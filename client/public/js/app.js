( function(){

  'use strict';

  angular.module('pklApp', [])

    /// Service to call advisor list api
    .service('Services', ['$http', function($http){

      var Services = {};

      // HTTP call to get advisors
      Services.getAdvisors = function(){
        return $http.get('/api/advisors.json');
      };

      // HTTP Post to submit an advisor Request
      Services.postRequest = function(request){
        return $http.post('http://192.168.1.11:3000/api/v1/Request', request);
      };

      return Services;
    }])

    /// Controller for the Advisors Page
    .controller('advisorController', ['Services', '$scope', function(Services, $scope){

      // Get the Advisor data
      Services.getAdvisors().success(function(data){
        $scope.advisors = data.Advisors;
      });

    }])

    /// Controller for the Request an Advisor Page
    .controller('requestController', ['Services', '$scope', function(Services, $scope){

      // Submit the request form request
      $scope.submitRequest = function(){
        var request = $scope.request;
        Services.postRequest(request).then(function(data){
          console.log(data);
        }, function(err){
          console.log(err);
        });
      };


    }]);

})();
