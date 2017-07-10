'use strict';

app
    .config(function ($stateProvider) {
        $stateProvider
            .state('account.logout', {
                parent: 'account',
                url: '/account/logout',
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
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
