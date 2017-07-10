'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('NonRegularPayService', function(Restangular) {
	
	return {
		getCountryDetails : function(req) {
			var taxCode = Restangular.one('common/getCountryDetails')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return taxCode;
		},
		getNonRegularPay : function(req) {
			var getStatus = Restangular.one("finance/getNonRegularAllowance").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return getStatus;
		},
		saveNonRegularPay : function(req) {
			var saveStatus = Restangular.one("finance/saveNonRegularAllowance").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteNonRegularPay : function(req) {
			var deleteStatus = Restangular.one("finance/deleteNonRegularAllowance").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
