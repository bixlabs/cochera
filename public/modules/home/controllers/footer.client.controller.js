'use strict';

angular.module('app.home').controller('FooterController', ['$scope', '$document', '$location', '$timeout', '$anchorScroll',
  function ($scope, $document, $location, $timeout, $anchorScroll) {
    $scope.brand = 'The Digital Garage';


    $scope.redirectScroll = function (url, elem) {
        var element = angular.element(document.getElementById(elem));
        if(url === $location.path()){
            $document.scrollToElementAnimated(element, 100, 600);
        } else {
            $location.path(url);
            $location.hash(elem);
            $anchorScroll.yOffset = 110;
        }

    };



  }
]);