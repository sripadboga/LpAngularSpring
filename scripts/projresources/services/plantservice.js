'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('PlantRegisterService', function(Restangular) {
	return {
		getPlantRegisters : function(req) {
			var plant = Restangular
					.one("register/plantRegistersOnLoad").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plant;
		},
		savePlantRegisters  : function(req) {
			var plant = Restangular
					.one("register/savePlantregisters").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plant;
		},
		deletePlantRegisters : function(req) {
			var plant = Restangular.one(
					"register/deactivatePlantRegisters").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
	}
});
