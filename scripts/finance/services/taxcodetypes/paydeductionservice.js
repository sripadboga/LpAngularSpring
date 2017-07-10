'use strict';

app.factory('PayDeductionService', function(Restangular) {

	return {
		getPayDeductions : function(req) {
			var getStatus = Restangular.one("finance/getPayDeduction")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return getStatus;
		},
		savePayDeductions : function(req) {
			var saveStatus = Restangular.one("finance/savePayDeduction")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deletePayDeductions : function(req) {
			var deleteStatus = Restangular.one("finance/deletePayDeduction")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
