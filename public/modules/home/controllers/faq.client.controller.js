'use strict';

angular.module('app.home')
.controller('FaqController', ['$scope',
  function ($scope) {
    $scope.oneAtATime = true;

      $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];

  }
]);