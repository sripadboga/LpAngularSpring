'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('WageService', function(Restangular) {
	
	return {
		getEmpWages : function(req) {
			var service = Restangular.one("centrallib/getEmpWages").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return service;
		},
		saveEmpWages : function(req) {
			var resultStatus = Restangular.one("centrallib/saveEmpWages").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteEmpWages : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteEmpWages").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
