'use strict';
var auth = {};
angular
    .module('app.home').controller('HeaderController', ['APP_BRAND', '$window', '$rootScope', '$scope', '$state', 'ngProgressFactory', '$modal', 'Auth',
        function (APP_BRAND, $window, $rootScope, $scope, $state, ngProgressFactory, $modal, Auth) {

            $scope.brand = APP_BRAND.BIG;
            $scope.brandSmall = APP_BRAND.SMALL;
            $rootScope.loginStatus = false;
            $scope.isCollapsed = true;
            $scope.communityUrl = "http://ghost.dg-infra.thedigitalgarage.io";

            $scope.registerUrl = Auth.register();

            function checkStatus() {
                Auth.checkStatus();
            }

            $scope.checkStatus = checkStatus;

            function login() {
                Auth.keyCloakLogin();
            }

            $scope.keyLogin = login;

            $scope.loadUser = function () {
                Auth.loadUser();
            };

            $scope.top = function () {
                if (document.querySelector(".main"))
                    return document.querySelector(".main").getBoundingClientRect().top;
            };

            $scope.loginKeyCloak = function () {
                $state.go('app.dashboard');
            };

            $scope.login = function () {
                $modal.open({
                    templateUrl: 'modules/home/views/modal/login.client.view.html',
                    controller: 'LoginController',
                    size: 'md',
                    windowClass: 'login'
                });

            };

            $scope.register = function () {


                /*
                $modal.open({
                    templateUrl: 'modules/home/views/modal/register.client.view.html',
                    controller: 'RegisterController',
                    size: 'md',
                    windowClass: 'login'
                });*/
            };
        }
    ]);


/* Modal controllers*/

function login($scope, $state, $modalInstance, $http, toastr, Auth) {
    $scope.authInfo = {
        username: '',
        password: ''
    };
    $scope.submitting = false;


    $scope.login = function () {
        $scope.submitting = true;
        if ($scope.authInfo.username !== '' && $scope.authInfo.password !== '') {
            Auth.login($scope.authInfo).then(function () {
                $scope.submitting = false;
                toastr.success('You are logged in successfully.', 'Success');
                $state.go('app.dashboard');
                $modalInstance.close();
            }).catch(function () {
                $scope.submitting = false;
            });
        }
        else {
            toastr.error('Please enter username and password.', 'Error');
            $scope.submitting = false;
        }
    };
}

function register($scope, $state, $modalInstance, toastr, AccountService) {
    $scope.registerform = {};
    $scope.submitting = false;

    $scope.register = function () {
        $scope.submitting = true;
        AccountService.register($scope.registerform)
            .then(function () {
                toastr.success('Account created, review your email account', 'Success');
                $modalInstance.close();
            })
            .catch(function (err) {
                $scope.submitting = false;
                toastr.error(err, 'Error');
            });
        console.log($scope.registerform);
    };
}

angular
    .module('app.home')
    .controller('LoginController', ['$scope', '$state', '$modalInstance', '$http', 'toastr', 'Auth', login]);

angular
    .module('app.home')
    .controller('RegisterController', ['$scope', '$state', '$modalInstance', 'toastr', 'AccountService', register]);
