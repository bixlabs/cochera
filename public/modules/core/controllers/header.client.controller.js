'use strict';

angular.module('app.core').controller('HeaderCoreController', ['APP_BRAND', '$scope', 'Menus', '$state', 'Auth', 'Url',
    function (APP_BRAND, $scope, Menus, $state, Auth, Url) {
        $scope.brand = APP_BRAND.BIG;
        $scope.brandSmall = APP_BRAND.SMALL;

        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');

        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        $scope.logout = function () {
            //$window.keycloakAuth.logout();
            Auth.logout();
            $state.go('home.main');
        };

        // Load database url

        function reduce(acc, obj) {
            acc[obj.name] = obj.url;
            return acc;
        }

        function init() {
            Url.find()
                .$promise
                .then(function (res) {
                    console.log('RETRIEVE URLS', res);
                    $scope.urls = res.reduce(reduce, {});
                    console.log($scope.urls);
                });
        }

        init();
    }
]);
