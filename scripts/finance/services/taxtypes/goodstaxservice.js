'use strict';

app.factory('GoodsTaxService', function(Restangular, $http) {
	return {
		getServiceTax : function(req) {
			var goodsTax = Restangular.one('finance/getServiceTax')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return goodsTax;
		},
		saveServiceTax : function(req) {
			console.log(JSON.stringify(req));
			var goodsTax = Restangular.one("finance/saveServiceTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return goodsTax;
		},
		deleteServiceTax: function(req) {
			var deleteGoodsTax = Restangular.one("finance/deleteServiceTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteGoodsTax;
		}
		
		
	}
});
