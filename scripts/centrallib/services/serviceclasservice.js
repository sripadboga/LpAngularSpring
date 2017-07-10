'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('ClassificationService', function(Restangular) {
	return {
		getServiceClasses : function(req) {
			var service = Restangular.one("centrallib/getServiceClasses").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return service;
		},
		saveServiceClasses : function(req) {
			var resultStatus = Restangular.one("centrallib/saveServiceClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			
			return resultStatus;
		},
		deleteServiceClasses : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteServiceClasses").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
