'use strict';

app.factory('AuthServerProvider', function($http, $q, Restangular,localStorageService, appUrl) {
	return {
		login : function(credentials) {
			 var deferred = $q.defer();
		var data = {
				"username" : credentials.username,
				"password" : credentials.password,
				"clientcode" : credentials.clientCode};
		 $http({
			 	url : appUrl.appurl+"account/authentication",
				method : "POST",
				params : data,
                headers: {
                        "Content-Type": "application/json"
                    }
				
			}).success(	function(response) {
				console.log('after success response'+response.token);
				 localStorageService.set('pottoken', response.token);
				deferred.resolve(response);
			 });
		 return deferred.promise;
		},
		potlogin : function(credentials) {
			 var deferred = $q.defer();
		var data = {
				"username" : credentials.username,
				"password" : credentials.password};
		 $http({
			 	url : appUrl.appurl+"account/internalauth",
				method : "POST",
				params : data,
               headers: {
                       "Content-Type": "application/json"
                   }
				
			}).success(	function(response) {
				console.log('after success response'+response.token);
				 localStorageService.set('pottoken', response.token);
				deferred.resolve(response);
			 });
		 return deferred.promise;
		},

		logout : function() {
			localStorageService.clearAll();

			// logout from the server
			$http.get(appUrl.appurl+'logout');
		},
		getToken : function() {
			var token = localStorageService.get('pottoken');
			return token;
		},
		hasValidToken : function() {
			var token = this.getToken();
			return !!token;
		}
	};
});
