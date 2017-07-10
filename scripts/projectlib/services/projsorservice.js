'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjSOR Service in the potApp.
 */
app.factory('ProjSORService', function(Restangular) {
	return {
		getSORDetails : function(req) {
			var sorDetails = Restangular.one(
					"projectlib/getSORItems").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return sorDetails;
		},
		/*getProjSORItemsById : function(req) {
			var sorDetails = Restangular.one(
					"projectlib/getProjSORItemsById").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return sorDetails;
		},*/
		saveSORDetails : function(req) {
			var sorSaveStatus = Restangular.one(
					"projectlib/saveSORItems").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return sorSaveStatus;
		},
		deactivateSORDetails : function(req) {
			var sorDeactivateStatus = Restangular.one(
					"projectlib/deleteSORItems").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return sorDeactivateStatus;
		},
		getMeasurements : function(req) {
			var measure = Restangular.one(
					"centrallib/getMeasurements").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return measure;
		},
		projSorifOnLoad : function(req) {
			var measure = Restangular.one(
					"projectlib/projSorifOnLoad").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return measure;
		}

	}
});
