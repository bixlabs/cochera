'use strict';

angular.module('app.home').controller('FooterController', ['$scope', '$document', '$location', '$timeout',
  function ($scope, $document, $location, $timeout) {
    $scope.brand = 'The Digital Garage';

    $scope.mailto = 'jmccawley@thedigitalgarage.io';
    $scope.linkedin = 'https://www.linkedin.com/company/the-digital-garage';
    $scope.github = 'https://github.com/thedigitalgarage';

  }
]);