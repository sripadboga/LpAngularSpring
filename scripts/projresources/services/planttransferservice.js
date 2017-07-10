'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('PlantTransferService', function(Restangular) {
	return {
		getPlantreqForTrans : function(req) {
			var plantTrans = Restangular
					.one("resources/getPlantreqForTrans").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plantTrans;
		},
		savePlantCreateTransfer  : function(req) {
			var plant = Restangular
					.one("register/savePlantreqForTrans").customPOST(req,
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
