'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Emp Class Service in the potApp.
 */
app.factory('ProjEmpClassService', function(Restangular) {
	return {
		getUserProjects : function(req) {
			var projectEps = Restangular.one("projectlib/getUserProjects").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return projectEps;
		},

		addProjEmpClassifyOnLoad : function(req) {
			var empClasses = Restangular.one("projectlib/projEmpClassifyOnLoad").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return empClasses;
		},
		getProjEmpClasses : function(req) {
			var empClasses = Restangular.one("projectlib/getProjEmpClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return empClasses;
		},
		saveProjEmpClasses : function(req) {
			var saveStatus = Restangular.one("projectlib/saveProjEmpClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteProjEmpClasses : function(req) {
			var deleteStatus = Restangular.one("projectlib/deleteProjEmpClasses")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}
});
