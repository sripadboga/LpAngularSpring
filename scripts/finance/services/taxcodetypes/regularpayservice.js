'use strict';

app.factory('RegularPayservice', function(Restangular) {
	
	return {
		getCountryDetails : function(req) {
			var taxCode = Restangular.one('common/getCountryDetails')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return taxCode;
		},
		getRegularPay : function(req) {
			console.log("before"+JSON.stringify(req));
			var getStatus = Restangular.one("finance/getRegularAllowance").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			console.log("after"+JSON.stringify(getStatus));
			return getStatus;
		},
		saveregularPayRate : function(req) {
			var saveStatus = Restangular.one("finance/saveRegularAllowance").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteRegularPay : function(req) {
			var deleteStatus = Restangular.one("finance/deleteRegularAllowance").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
