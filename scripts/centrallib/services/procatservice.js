'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProcureService in the potApp.
 */

app.factory('ProcureService', function(Restangular) {
	return {
		getProcureCatgs : function(req) {
			var procure = Restangular.one("centrallib/getProcureCatgs").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return procure;
		},
		getprocures : function(req) {
			var procure = Restangular.one("centrallib/getprocures").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return procure;
		},
		saveProcureCatgs : function(req) {
			var resultStatus = Restangular.one("centrallib/saveProcureCatgs").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteProcureCatgs : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteProcureCatgs")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
