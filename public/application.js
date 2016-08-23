'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
    .factory('authInterceptor', function ($q, KeyAuth) {
        return {
            request: function (config) {
                var deferred = $q.defer();
                if (KeyAuth.authz.token) {
                    KeyAuth.authz.updateToken(5).success(function () {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + KeyAuth.authz.token;

                        deferred.resolve(config);
                    }).error(function () {
                        deferred.reject('Failed to refresh token');
                    });
                }
                return deferred.promise;
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('errorInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('errorInterceptor', function ($q) {
        return function (promise) {
            return promise.then(function (response) {
                return response;
            }, function (response) {
                if (response.status == 401) {
                    console.log('session timeout?');
                    logout();
                } else if (response.status == 403) {
                    alert("Forbidden");
                } else if (response.status == 404) {
                    alert("Not found");
                } else if (response.status) {
                    if (response.data && response.data.errorMessage) {
                        alert(response.data.errorMessage);
                    } else {
                        alert("An unexpected server error has occurred");
                    }
                }
                return $q.reject(response);
            });
        };
    });

angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

angular.element(document).ready(function () {
    var keycloakAuth = new Keycloak('keycloak.json');
    keycloakAuth.redirectUri = window.location.origin + '/cochera/#/dashboard';
    keycloakAuth.init({onLoad: 'check-sso'}).success(function (authorized) {
        console.log('Authorized', authorized);
        //Create factory for keycloak
        angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)
            .factory('KeyAuth', function () {
                return keycloakAuth;
            });

        //Load application
        angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
        if (authorized){
            window.location = location.href + 'dashboard';
        }else{
           // window.location = '';
        }
    });
});
