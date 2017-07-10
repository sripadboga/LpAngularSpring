'use strict';

app
    .factory('Principal', function ($q, Account,$rootScope) {
        var _identity = undefined,
            _authenticated = false,
            _pottoken = undefined;

        return {
            potToken: function () {
                return _pottoken;
            },
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            isInRole: function (role) {
                if (!_authenticated || !_identity.appCodeTemplate) {
                    return false;
                }

                //return _identity.roles.indexOf(role) !== -1;
                return _identity.appCodeTemplate[role];
            },
            isInAnyRole: function (roles) {
                if (!_authenticated || !_identity.appCodeTemplate) {
                    return false;
                }

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) {
                        return true;
                    }
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;
            },
            identity: function (force) {
            	
            
                var deferred = $q.defer();

                if (force) {
                    _identity = undefined;
                }

                // check and see if we have retrieved the identity data from the server.
                // if we have, reuse it by immediately resolving
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                // retrieve the identity data from the server, update the identity object, and then resolve.
                Account.get().$promise
                    .then(function (account) {

                        console.log("    Account   :%o", account);
                        _identity = account.data;
                        _authenticated = true;
                        _pottoken = _identity.token;
                        //TO DO: Verify availability of pottoken
                        console.log("Identity Header: %o", _identity.token);
                        $rootScope.$broadcast('loginsuccess');
                        deferred.resolve(_identity);
                    })
                    .catch(function () {
                        _identity = null;
                        _authenticated = false;
                        deferred.resolve(_identity);
                    });
                return deferred.promise;
            },
            roles: function () {
                return _roles;
            }
        };
    });
