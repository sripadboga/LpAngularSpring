'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # PreContract Service in the potApp.
 */
app.factory('PurchaseOrderService', function(Restangular) {
	return {
		getPurchaseOrders : function(req) {
			var purchaseDetails = Restangular.one(
					"procurement/getPurchaseOrders").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return purchaseDetails;
		},
		getInternalPreContracts : function(req) {
			var contractDetails = Restangular.one(
					"procurement/getInternalPreContracts").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return contractDetails;
		},
		getExternalPreContracts : function(req) {

			var externalDetails = Restangular.one(
					"procurement/getExternalPreContracts").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return externalDetails;
		},
		getPurchaseOrderDetails : function(req) {
			var purchaseRegenerate = Restangular.one(
					"procurement/getPurchaseOrderDetails").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return purchaseRegenerate;
		},
		savePurchaseOrders : function(req) {
			var purchaseSaveStatus = Restangular.one(
					"procurement/savePurchaseOrders").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return purchaseSaveStatus;
		},
		regeneratePurchaseOrder : function(req) {
			var purchaseRegenerate = Restangular.one(
					"procurement/regeneratePurchaseOrder").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return purchaseRegenerate;
		}

	}
});
