'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('PlantClassService', function(Restangular) {
	return {
		getPlantClasses  : function(req) {
			var plant = Restangular.one("centrallib/getPlantClasses").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
		savePlantClasses : function(req) {
			var resultStatus = Restangular.one("centrallib/savePlantClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deletePlantClasses : function(req) {
			var deleteStatus = Restangular.one("centrallib/deletePlantClasses").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
