'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('MaterialService', function(Restangular) {
	
	return {
		getMaterialSubGroups : function(req) {
			var service = Restangular.one("centrallib/getMaterialSubGroups").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return service;
		},
		saveMaterialSubGroups : function(req) {
			var resultStatus = Restangular.one("centrallib/saveMaterialSubGroups").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteMaterialSubGroups : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteMaterialSubGroups").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
