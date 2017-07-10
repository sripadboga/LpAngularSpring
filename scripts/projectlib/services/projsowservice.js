'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjSOW Service  in the potApp.
 */
app.factory('ProjSOWService', function(Restangular) {
	return {
		getProjSOWDetails : function(req) {
			var sowDetails = Restangular
					.one("projectlib/getSOWItems").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return sowDetails;
		},
		getProjSOWItemsById : function(req) {
			var sowDetails = Restangular
					.one("projectlib/getProjSOWItemsById").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return sowDetails;
		},
		saveSOWItems : function(req) {
			var sowSaveStatus = Restangular
					.one("projectlib/saveSOWItems").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return sowSaveStatus;
		},
		deleteSOWItems : function(req) {
			var sowDeactivateStatus = Restangular
					.one("projectlib/deleteSOWItems").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return sowDeactivateStatus;
		},getMeasurements : function(req) {
			var measure = Restangular.one("centrallib/getMeasurements").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return measure;
		},

	}
});
