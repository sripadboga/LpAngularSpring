'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('ApproveWorkDairyService', function(Restangular) {
	return {
		getApprovedManpowers : function(req) {
			var manpower = Restangular.one("approveworkdiary/getApprovedManpowers")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return manpower;
		},
		saveApprovedManpowers : function(req) {
			var manpower = Restangular.one("approveworkdiary/saveApprovedManpowers")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return manpower;
		},
		
		getApprovedPlants : function(req) {
			var plant = Restangular.one("approveworkdiary/getApprovedPlants")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
		saveApprovedPlants : function(req) {
			var plant = Restangular.one("approveworkdiary/saveApprovedPlants")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
		getApprovedMaterials : function(req) {
			var material = Restangular.one("approveworkdiary/getApprovedMaterials")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return material;
		},
		saveApprovedMaterials : function(req) {
			var material = Restangular.one("approveworkdiary/saveApprovedMaterials")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return material;
		},
		getApprovedProgress : function(req) {
			var progrss = Restangular.one("approveworkdiary/getApprovedProgress")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return progrss;
		},
		saveApprovedProgress : function(req) {
			var progrss = Restangular.one("createworkdiary/saveApprovedProgress")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return progrss;
		},
	}
});
