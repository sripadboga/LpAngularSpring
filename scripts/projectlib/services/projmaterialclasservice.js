'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Emp Class Service in the potApp.
 */
app.factory('ProjMaterialClassService', function(Restangular) {
	return {
		getUserProjects : function(req) {
			var projectEps = Restangular.one("projectlib/getUserProjects").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return projectEps;
		},
		projMaterialClassifyOnLoad : function(onLoadReq) {
			var  response = Restangular.one("projectlib/projMaterialClassifyOnLoad").customPOST(
					onLoadReq, '', {}, {
						ContentType : 'application/json'
					});
			return response;
		},
		getProjMaterialClasses : function(req) {
			var material = Restangular.one("projectlib/getProjMaterialClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return material;
		},
		saveProjMaterialClasses : function(req) {
			var saveStatus = Restangular.one("projectlib/saveProjMaterialClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteProjMaterialClasses : function(req) {
			var deleteStatus = Restangular.one("projectlib/deactivateProjMaterials")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}
});
