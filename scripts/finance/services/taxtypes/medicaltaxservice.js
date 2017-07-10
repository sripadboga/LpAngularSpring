'use strict';

app.factory('MedicalTaxService', function(Restangular, $http) {
	return {
		getMedicalLeaveTax : function(req) {
			var medicalTax = Restangular.one("finance/getMedicalLeaveTax")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return medicalTax;
		},
		
		saveMedicalLeaveTax : function(req) {
			console.log(JSON.stringify(req));
			var medicalStatus = Restangular.one("finance/saveMedicalLeaveTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return medicalStatus;
		},
		deleteMedicalLeaveTax: function(req) {
			var deleteMedicalStatus = Restangular.one("finance/deleteMedicalLeaveTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteMedicalStatus;
		}
	}
});
