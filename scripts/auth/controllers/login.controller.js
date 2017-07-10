'use strict';

app
    .config(function ($stateProvider) {
        $stateProvider
            .state('site.login', {
                url: '/login',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'login.html',
                        controller: 'LoginController'
                    }
                }
            });
    })
    .controller('LoginController', function ($rootScope, $scope, $state, Auth) {
        $scope.user = {};
        $scope.errors = {};

        $scope.rememberMe = false;
        $scope.login = function () {
        	console.log('   from login ...........');
            Auth.login({
                username: $scope.username,
                password: $scope.password,
                clientCode: $scope.clientCode,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                $rootScope.$broadcast('loginsuccess');
                $state.go('home');
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
       $scope.Reset=function(){
    	   $scope.username=null,
    	   $scope.password=null,
    	   $scope.clientCode=null
       };
    });
