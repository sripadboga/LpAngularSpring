'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('StoreService', function(Restangular) {
	return {
		getStocks : function(req) {
			var stocks = Restangular.one("centrallib/getStocks").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return stocks;
		},
		saveStocks : function(req) {
			var resultStatus = Restangular.one("centrallib/saveStocks").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteStocks : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteStocks").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
