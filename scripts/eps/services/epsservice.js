'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # EPS Service in the potApp.
 */
app.factory('EpsService', function(Restangular) {
	return {
		getEPSDetails : function(req) {
			var epsDetails = Restangular.one(
					"projectlib/projEPSOnLoad").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return epsDetails;
		},
		
		getEPSProjectsById : function(req) {
			var epsIdDetails = Restangular.one(
					"projectlib/getEPSProjectsById").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return epsIdDetails;
		},
		
		saveProjects : function(req) {
			var epsSaveStatus = Restangular.one(
					"projectlib/saveProject").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return epsSaveStatus;
		},
		
		deactivateEPSDetails : function(req) {
			var epsDeactivateStatus = Restangular.one(
					"projectlib/deactivateEPSProject").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return epsDeactivateStatus;
		}

	}
});
