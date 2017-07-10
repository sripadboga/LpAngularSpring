'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Role Service in the potApp.
 */
app.factory('RoleService', function(Restangular) {
	
	return {
		getRolePermissions : function(req) {
			var modules = Restangular.one("auth/getModulesByRole").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return modules;
		},
		getRoles : function(req) {
			var roles = Restangular.one("auth/getRoles").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return roles;
		},
		saveRoles : function(req) {
			var saveStatus = Restangular.one("auth/saveRole").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		saveRolePermission : function(req) {
			var saveRolePerStatus = Restangular.one("auth/saveRolePermission")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveRolePerStatus;
		},
		deactivateRoles : function(req) {
			var deleteStatus = Restangular.one("auth/deleteRoles").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}
	}
});
