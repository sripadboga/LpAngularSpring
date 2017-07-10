'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Module Service in the potApp.
 */
app.factory('TaxCodeCountryService', function(Restangular, $http) {
	return {
		getCountryDetails : function(req) {
			var taxCode = Restangular.one('common/getCountryDetails')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return taxCode;
		},
		getCountryDetailsById : function(req) {
			var taxCode = Restangular.one('common/getCountryDetailsById')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return taxCode;
		},
		getTaxCountryProvision : function(req) {
			console.log(JSON.stringify(req));
			var taxStatus = Restangular.one(
					"finance/getTaxCountryProvision").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return taxStatus;
		},
		getTaxCodeCountryProvisions : function(req) {
			console.log(JSON.stringify(req));
			var taxStatus = Restangular.one(
					"finance/getTaxCodeCountryProvisions").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return taxStatus;
		},
		saveTaxCountryProvision : function(req) {
			console.log(JSON.stringify(req));
			var taxStatus = Restangular.one(
					"finance/saveTaxCountryProvision").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return taxStatus;
		},
		saveTaxCodeCountryProvisions : function(req) {
			var taxStatus = Restangular.one(
					"finance/saveTaxCodeCountryProvisions").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return taxStatus;
		},
		deactivateTaxCodeCountryProvisions : function(req) {
			var taxCodeStatus = Restangular.one(
					"finance/deactivateTaxCodeCountryProvisions")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return taxCodeStatus;
		}

	}
});
