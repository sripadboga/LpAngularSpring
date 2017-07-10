'use strict';

app.factory('EmployeeTaxService', function(Restangular, $http) {
	return {
		getEmployeePayroll : function(req) {
			var employeeTax = Restangular.one("finance/getEmployeePayrollTax")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return employeeTax;
		},
		saveEmployeePayroll : function(req) {
			console.log(JSON.stringify(req));
			var empStatus = Restangular.one("finance/saveEmployeePayrollTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return empStatus;
		},
		deleteEmployeePayroll: function(req) {
			var deleteEmp = Restangular.one("finance/deleteEmployeePayrollTax").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteEmp;
		}
		
	}
});
