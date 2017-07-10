'use strict';

app.factory('CompanyTaxService', function(Restangular, $http) {
	return {
		getCompanyTax : function(req) {
			var companyTax = Restangular.one("finance/getCompanyTax")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return companyTax;
		},
		saveCompanyTax : function(req) {
			console.log(JSON.stringify(req));
			var companyStatus = Restangular.one("finance/saveCompanyTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return companyStatus;
		},
		deleteCompanyTax: function(req) {
			var deleteCompanyStatus = Restangular.one("finance/deleteCompanyTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteCompanyStatus;
		}
		
	}
});
