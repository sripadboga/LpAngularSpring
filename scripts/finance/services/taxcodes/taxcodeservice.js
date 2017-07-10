'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Module Service in the potApp.
 */
app.factory('TaxCodeService', function(Restangular, $http) {
	return {
		getTaxCodes : function(req) {
			var taxCode = Restangular.one('finance/getTaxCodes').customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return taxCode;
		},
		saveTaxCodes : function(req) {
			console.log(JSON.stringify(req));
			var taxStatus = Restangular.one("finance/saveTaxCodes")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return taxStatus;
		},
		deactivateTaxCodes : function(req) {
			var taxCodeStatus = Restangular
					.one("finance/deactivateTaxCodes").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return taxCodeStatus;
		}

	}
});
