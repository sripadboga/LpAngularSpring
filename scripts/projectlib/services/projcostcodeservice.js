'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('ProjCostCodeService', function(Restangular) {
	return {
		getCostDetails : function(req) {
			var costDetails = Restangular
					.one("projectlib/getProjCostItems").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return costDetails;
		},
		projCostItemsOnLoad : function(req) {
			var costCodes = Restangular
					.one("projectlib/projCostItemifOnLoad").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return costCodes;
		},
	/*	getProjCostItemsById : function(req) {
			console.log("getProjCostItemsById :"+JSON.stringify(req));
			var costDetails = Restangular.one(
					"projectlib/getProjCostItemsById").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDetails;
		},*/
		saveProjCostItems : function(req) {
			var costSaveStatus = Restangular
					.one("projectlib/saveProjCostItems").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return costSaveStatus;
		},
		deactivateCostDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"projectlib/deleteProjCostItems").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
	}
});
