'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # User Service in the potApp.
 */
app.factory('UserService', function(Restangular) {

	return {
		getUsers : function(req) {
			var users = Restangular.one("user/getUsers").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return users;
		},
		saveUser : function(req) {
			var data = angular.toJson(req, true);
			var saveUsers = Restangular.one("user/saveUser").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveUsers;
		},
		deleteUser : function(req) {
			var deleteStatus = Restangular.one("user/deleteUser").customPOST(req, '', {}, {
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
