'use strict';
app.config(function($stateProvider) {
	$stateProvider.state("employeepayroll", {
		
		url : '/employeepayroll',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/finance/taxtypes/employeepayrolltax.html',
				controller : 'EmployeePayrollController'
			}
		}
	})
}).controller("EmployeePayrollController",function($scope,$q,$state,ngDialog,EmployeeTaxFactory,EmployeeTaxService,GenericAlertService) {
	var service = {}
	
	var editEmployeeTax=[];
	var payrollTax=[];
	$scope.payrollTax=[];
	
	//get req
	$scope.getEmployeePayroll = function() {
		var getEmployeePayrollReq = {
				"selected" : false,
				"taxCalMstrId" :'',
				"annualMinTax" :'',
				"annualMaxTax" :'',
				"fixedTax" :'',
				"variableTax" :'',
				"comments" :'',
				"status":'1'
		};
		EmployeeTaxService
				.getEmployeePayroll(getEmployeePayrollReq)
				.then(
						function(data) {
							$scope.payrollTax = data.employeePayRollTaxTOs;
						},
						function(error) {
							GenericAlertService
									.alertMessage(
											"Error occured while getting payrollTax Details",
											"Error");
						});
	}
	
	
	
	
	 $scope.emptaxrowselect = function(emp) {
		if (emp.selected) {
			editEmployeeTax.push(emp);
		} else {
			editEmployeeTax.pop(emp);
		}
	 },
	 $scope.addEmpPayrollTax = function(actionType) {
			
			if (actionType == 'Edit' && editEmployeeTax <= 0) {
				GenericAlertService
						.alertMessage(
								"Please select alteast one row to modify",
								'Warning');
				return;
			} else {
				var taxDetails = EmployeeTaxFactory
						.employeeTaxPopUpDetails(actionType,
								editEmployeeTax);
				taxDetails
						.then(
								function(data) {
									$scope.payrollTax = data.employeePayRollTaxTOs;
									editEmployeeTax = [];
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occurred while selecting  Details",
													'Info');
								})
			}
		}
	
	 
	 $scope.detetePayrollTax = function() {
			if (editEmployeeTax.length <= 0) {
				GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
				return;
			}
			var deleteIds = [];
			$scope.nondeleteIds = [];
			if ($scope.selectedAll) {
				$scope.payrollTax = [];
			} else {
				angular.forEach(editEmployeeTax,function(value, key) {
									if (value.id) {
										deleteIds.push(value.id);
									}
								});
				var req = {
					"employeePayTaxIds" : deleteIds,
					"status" : 2
				};
				EmployeeTaxService.deleteEmployeePayroll(req).then(function(data) {
					GenericAlertService.alertMessage('Employee Details are  Deactivated successfully','Info');
						});
			
				angular.forEach(editEmployeeTax,function(value, key) {
									$scope.payrollTax.splice(
													$scope.payrollTax.indexOf(value),1);
								},
								function(error) {
									GenericAlertService.alertMessage('Employee Details are failed to Deactivate',"Error");
								});
				editEmployeeTax = [];
				$scope.deleteIds = [];

			}
		}	
		});
