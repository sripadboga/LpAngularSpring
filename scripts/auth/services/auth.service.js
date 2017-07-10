'use strict';

app
    .factory('Auth', function($rootScope, $state, $q, Principal, AuthServerProvider ) {
        return {
            login: function (credentials, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                var cb = callback || angular.noop;
                var deferred = $q.defer();
                
                if (credentials.clientCode != null && credentials.clientCode != undefined){
	                AuthServerProvider.login(credentials).then(function (data) {
	                    // retrieve the logged account information
	                    Principal.identity(true);
	                    deferred.resolve(data);
	
	                    return cb();
	                }).catch(function (err) {
	                    this.logout();
	                    deferred.reject(err);
	                    return cb(err);
	                }.bind(this));
                }else {
                    AuthServerProvider.potlogin(credentials).then(function (data) {
                        // retrieve the logged account information
                        Principal.identity(true);
                        deferred.resolve(data);

                        return cb();
                    }).catch(function (err) {
                        this.logout();
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));
                }

                return deferred.promise;
            },  potlogin: function (credentials, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                var cb = callback || angular.noop;
                var deferred = $q.defer();

                AuthServerProvider.potlogin(credentials).then(function (data) {
                    // retrieve the logged account information
                    Principal.identity(true);
                    deferred.resolve(data);

                    return cb();
                }).catch(function (err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },
            logout: function () {
                AuthServerProvider.logout();
                Principal.authenticate(null);
            },
            authorize: function() {
                return Principal.identity()
                    .then(function() {
                    	console.log('  Auth Authorize');
                        var isAuthenticated = Principal.isAuthenticated();

                        if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {
                            if (isAuthenticated){
                            $state.go('accessdenied');
                            }
                            else {
                                // user is not authenticated. stow the state they wanted before you
                                // send them to the signin state, so you can return them when you're done
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;

                                // now, send them to the signin state so they can log in
                                $state.go('home');
                            }
                        }
                    });
            },
            changePassword: function (passwordTO, callback) {
                var cb = callback || angular.noop;

                return Password.save(passwordTO, function () {
                    return cb();
                }, function (err) {
                    return cb(err);
                }).$promise;
            }
        };
    });
