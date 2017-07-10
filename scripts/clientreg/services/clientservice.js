'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # User Service in the potApp.
 */
app.factory('ClientService', function(Restangular) {
	return {
		getClients : function(req) {
			var clients = Restangular.one("user/getClients").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return clients;
		},
		saveClient : function(req) {
			var data = angular.toJson(req, true);
			var registerClient  = Restangular.one("user/saveClient").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return registerClient;
		},
		deactivateClient : function(req) {
			var deleteStatus = Restangular.one("user/deactivateClient").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return deleteStatus;
		},
		saveUserProjects : function(req) {
			var saveStatus = Restangular.one("user/saveUserProjects").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		getUserProjects : function(req) {
			var userProjs = Restangular.one("user/getUserProjects").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return userProjs;
		}

	}
});
