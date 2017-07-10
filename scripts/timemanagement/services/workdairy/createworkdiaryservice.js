'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('CreateWorkDiaryService', function($q,Restangular) {
	return {
		
		getManpowers : function(req) {
			var manpower = Restangular.one("createworkdiary/getManpowers")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return manpower;
		},
		saveManpowers : function(req) {
			var manpower = Restangular.one("createworkdiary/saveManpowers")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return manpower;
		},
		deleteManpowers : function(req) {
			var manpower = Restangular.one("createworkdiary/deleteManpowers")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return manpower;
		},
		getPlants : function(req) {
			var plant = Restangular.one("createworkdiary/getPlants")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
		savePlants : function(req) {
			var plant = Restangular.one("createworkdiary/savePlants")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
		deletePlants : function(req) {
			var plant = Restangular.one("createworkdiary/deletePlants")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return plant;
		},
		getMaterials : function(req) {
			var material = Restangular.one("createworkdiary/getMaterials")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return material;
		},
		saveMaterials : function(req) {
			var material = Restangular.one("createworkdiary/saveMaterials")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return material;
		},
		deleteMaterials : function(req) {
			var material = Restangular.one("createworkdiary/deleteMaterials")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return material;
		},
		getProgress : function(req) {
			var progrss = Restangular.one("createworkdiary/getProgress")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return progrss;
		},
		saveProgress : function(req) {
			var progrss = Restangular.one("createworkdiary/saveProgress")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return progrss;
		},
		deleteProgress : function(req) {
			var progrss = Restangular.one("createworkdiary/deleteProgress")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return progrss;
		},
		getUsers : function(req) {
			console.log(JSON.stringify(req));
			var users = Restangular.one("user/getUsers").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return users;
		},
		saveUser : function(req) {
			var data = angular.toJson(req, true);
			console.log("save request -----------" + data);
			var saveUsers = Restangular.one("user/saveUser").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveUsers;
		}
	}
});
