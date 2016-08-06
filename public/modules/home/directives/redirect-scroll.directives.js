'use strict';

angular.module('app.home')
    .directive('redirectScroll', ['$location', '$document', '$anchorScroll',
        function($location, $document, $anchorScroll) {
          return function(scope, element, attr, attrs) {
                var clicCallback = function() {
                    var url = attr.href.split("#")[1];
                    var hash = attr.href.split("#")[2];
                    var el = angular.element(document.getElementById(hash));
                    if(url === $location.path()){
                        $document.scrollTo(el, 110, 500);
                    } else {
                        $location.hash(hash);
                        $anchorScroll.yOffset = 110;
                    }
                };
                element.bind('click', clicCallback);
              }
            }]);
