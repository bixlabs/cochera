'use strict';
angular
    .module('app.home').controller('HeaderController', ['APP_BRAND', 'Ghost', '$window', '$rootScope', '$scope', '$state', 'ngProgressFactory', '$modal', 'Auth', '$location', '$timeout', '$document',
        function (APP_BRAND, Ghost, $window, $rootScope, $scope, $state, ngProgressFactory, $modal, Auth, $location, $timeout, $document
            ) {

            var vm = this;
            vm.brand = APP_BRAND.BIG;
            vm.brandSmall = APP_BRAND.SMALL;
            $rootScope.loginStatus = false;
            vm.isCollapsed = true;
            vm.communityUrl = 'http://apps.thedigitalgarage.io/community/';

            vm.ghostEntries = [];
            vm.searchIsLoading = false;
            vm.loadGhostEntries = function() {
              if(vm.ghostEntries.length === 0){
                vm.searchIsLoading = true;
                Ghost.find().$promise
                  .then(function(results) {
                    vm.searchIsLoading = false;
                    vm.ghostEntries = results;
                  });
              }
            };
            vm.onSelectCallback = function (item, model){
              $window.open(vm.communityUrl+item.url, '_blank');
              vm.selected = undefined;
            };

            vm.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };

            vm.registerUrl = Auth.register();

            vm.checkStatus = function() {
                Auth.checkStatus();
            };

            vm.keyLogin = function() {
                Auth.keyCloakLogin();
            };

            vm.loadUser = function () {
                Auth.loadUser();
            };

        }
    ]);
