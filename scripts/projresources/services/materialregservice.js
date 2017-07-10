'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('MaterialRegisterService', function(Restangular) {
	return {
		getPlantRegisters : function(req) {
			var plant = Restangular
					.one("resources/getPlantRegisters").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plant;
		},
		savePlantRegisters  : function(req) {
			var plant = Restangular
					.one("resources/savePlantRegisters").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plant;
		},
		deletePlantRegisters : function(req) {
			var plant = Restangular.one(
					"resources/deletePlantRegisters").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
	}
});
