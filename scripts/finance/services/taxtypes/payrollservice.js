'use strict';

app.factory('PayRollService', function(Restangular) {
	
	return {
		getPayRoll : function(req) {
			var getStatus = Restangular.one("finance/getEmpPayTypeCycle").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return getStatus;
		},
		savePayRoll : function(req) {
			var saveStatus = Restangular.one("finance/saveEmpPayTypeCycle").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deletePayRoll : function(req) {
			var deleteStatus = Restangular.one("finance/deleteEmpPayTypeCycle").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
