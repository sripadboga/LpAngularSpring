'use strict';

app
    .config(function ($stateProvider) {
        $stateProvider
            .state('site.potlogin', {
                url: '/potlogin',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'internallogin.html',
                        controller: 'InternalLoginController'
                    }
                }
            });
    })
    .controller('InternalLoginController', function ($rootScope, $scope, $state, Auth) {
        $scope.user = {};
        $scope.errors = {};

        $scope.rememberMe = false;
        $scope.login = function () {
        	console.log('   from pot login ...........');
            Auth.login({
                username: $scope.username,
                password: $scope.password           
            }).then(function () {
                $scope.authenticationError = false;
                $rootScope.$broadcast('loginsuccess');
                $state.go('home');
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
    });
