'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Module Service in the potApp.
 */
app.factory('ModuleService', function(Restangular) {
	return {
		getModules : function(req) {
			var modules = Restangular.one("auth/getModules").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return modules;
		},
		getTabPermissionsByModule : function(req) {
			var modules = Restangular.one("auth/getTabPermissionsByModule").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return modules;
		},	
		getActions : function(req) {
			var actions = Restangular.one("auth/getActions").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return actions;
		},
		saveModule : function(req) {
			var saveStatus = Restangular.one("auth/saveModule").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;

		},
		deactivateModules : function(req) {
			var deactivateStatus = Restangular.one("auth/deactivateModules")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateStatus;
		}
	}
});
