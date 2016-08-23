'use strict';

angular.module('app.home')
    .service('Auth', ['$rootScope', '$cookies', '$state', '$cookieStore', '$http', '$q', 'toastr', 'KeyAuth', 'Profile', function ($rootScope, $cookies, $state, $cookieStore, $http, $q, toastr, KeyAuth, Profile) {
        var vm = this;
        vm.auth = {loggedIn: false};
        var keycloakAuth = new Keycloak('keycloak.json');
        keycloakAuth.init();

		var setUser = function (data) {
			angular.forEach(data, function(val, index){
				$cookieStore.put(index, val);
			});
			$rootScope.subscription = data.subscription;
			$rootScope.customer = data.customer;
			$rootScope.card = data.card;
		};

		this.renewUser = function () {
			$rootScope.User = {};
			angular.forEach($cookies, function (value, key) {
				$rootScope.User[key] = value;
			});
		};

		this.setUser = setUser;

		function login (credentials) {
			var defer = $q.defer();
			$http.post('authChargebee', credentials).success(function (data) {
				defer.resolve(data);
				setUser(data);
			}).error(function (data) {
				defer.reject(data);
				toastr.error(data.message, 'Error');
			});
			return defer.promise;
		}

		this.isLoggedIn = function () {
			if ($cookieStore.get('customer'))
				return true;
			return false;
		};

		this.logout = function () {
            //clean cookies
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (value, key) {
				$cookies.remove(key);
			});
			$rootScope.User = false;

            //keycloak logout
            keycloakAuth.logout({redirectUri: window.location.origin+ '/cochera/'});
		};

        this.loadUser =  function(){
            vm.auth.authz.loadUserInfo();
        };

        this.keyCloakLogin= function(){
            vm.auth.loggedIn = false;
            keycloakAuth.redirectUri = window.location.origin + '/cochera/#/dashboard';

            keycloakAuth.init({ onLoad: 'login-required'}).success(function () {
               keycloakAuth.login();
            }).error(function () {
                console.log('error login');
            });
        };

        this.register = function (){
            return keycloakAuth.createRegisterUrl();
        };


        function findOrCreate(){
            if(KeyAuth.authenticated){
                return KeyAuth.loadUserInfo().success(function(profile){
                    return Profile.findOrCreateSubscription({email:profile.email}, profile).$promise
                        .then(function(){
                            login({username:profile.sub});
                        });
                });
            }
        }

        this.getSubscription = function(username){
            findOrCreate(username);
        };

	}]);
