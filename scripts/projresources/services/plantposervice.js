'use strict';

/**
 * @ngdoc service
 * @name potApp.plantpo
 * @description # PlantPo Service in the potApp.
 */
app.factory('PlantPoService', function(Restangular) {
	return {
		getPlantProjectDtls : function(req) {
			var plant = Restangular
					.one("register/getPlantProjectDtls").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plant;
		},
		getPlantProjectDtlsOnLoad : function(req) {
			var plantOnLoad = Restangular
					.one("register/plantProjectDtlOnLoad").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plantOnLoad;
		},
		savePlantProjectDtls  : function(req) {
			var plant = Restangular
					.one("register/savePlantProjectDtls").customPOST(req,
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
		getPlantDocketDtls : function(req) {
			var plantDocket = Restangular
					.one("register/getPlantDocketDtls").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plantDocket;
		},
		getOnLoadPlantDocketDtls : function(req) {
			var plantDocket = Restangular
					.one("register/plantDocketOnLoad").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return plantDocket;
		}
	}
});
