( function(){

  'use strict';

  angular.module('pklApp', [])

    /// Service to call advisor list api
    .service('Advisors', ['$http', function($http){

      var Advisors = {};

      // HTTP call to get advisors
      Advisors.getAdvisors = function(){
        return $http.get('/api/advisors.json');
      };

      return Advisors;
    }])

    .controller('advisorController', ['Advisors', '$scope', function(Advisors, $scope){

      // Get the Advisor data
      Advisors.getAdvisors().success(function(data){
        $scope.advisors = data.Advisors;
      });

    }])

    .controller('requestController', ['$scope', function($scope){
      $scope.step = 1;

      $scope.requestStep = function(step){
        $scope.step = step;
        console.log(step);
      };


    }]);

})();
