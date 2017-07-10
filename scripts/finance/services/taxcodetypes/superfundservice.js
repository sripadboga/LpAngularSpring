'use strict';

app.factory('SuperFundService', function(Restangular) {
	
	return {
		getSuperFund : function(req) {
			var getStatus = Restangular.one("finance/getProvidentFund").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return getStatus;
		},
		saveSuperFund : function(req) {
			var saveStatus = Restangular.one("finance/saveProvidentFund").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteSuperFund : function(req) {
			var deleteStatus = Restangular.one("finance/deleteProvidentFund").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
