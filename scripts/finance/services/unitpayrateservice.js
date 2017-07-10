'use strict';

app.factory('UnitPayRateService', function(Restangular) {
	
	return {
		getUnitPayRate : function(req) {
			var getStatus = Restangular.one("finance/getUnitOfRates").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return getStatus;
		},
		saveUnitPayRate : function(req) {
			var saveStatus = Restangular.one("finance/saveUnitOfRates").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deletePayRates : function(req) {
			var deleteStatus = Restangular.one("finance/deleteUnitOfRates").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
