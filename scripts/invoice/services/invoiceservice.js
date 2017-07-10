'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Role Service in the potApp.
 */
app.factory('InvoiceService', function(Restangular) {
	
	return {
		getInvoiceDetails : function(req) {
			var invoices = Restangular.one("invoice/getInvoiceDetails").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return invoices;
		},
		deactivateRoles : function(req) {
			var deleteStatus = Restangular.one("").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		},
		saveInvoiceList : function(req) {
			var saveStatus = Restangular.one("invoice/saveInvoiceList").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
	}
});
