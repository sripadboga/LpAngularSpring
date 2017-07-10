'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # CostCodeService in the potApp.
 */
app.factory('CostCodeService', function(Restangular) {
	return {
		getCostCodes : function(req) {
			var costcode = Restangular.one("centrallib/getCostCodes").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return costcode;
		},
		saveCostCodes : function(req) {
			var resultStatus = Restangular.one("centrallib/saveCostCodes").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteCostCodes : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteCostCodes").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
