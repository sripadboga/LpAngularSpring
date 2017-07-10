'use strict';
app.factory('EmployeeTaxFactory',	
		function(ngDialog, $q, $filter,$timeout,EmployeeTaxService,GenericAlertService) {
		var employeeTaxPopUp;
		var service = {};
		service.employeeTaxPopUpDetails = function(actionType,editEmployeeTax) {
		var deferred = $q.defer();
		employeeTaxPopUp = ngDialog
		.open({
			template : 'views/centrallib/finance/employeepayrollpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedEmployeeTax=[];
				 $scope.empList =[];
				
				
				if (actionType === 'Add'){		
					$scope.empList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"annualMinTax" :'',
						"annualMaxTax" :'',
						"fixedTax" :'',
						"variableTax" :'',
						"comments" :'',
						"status":'1'
					});
				}	
				else {
					$scope.empList = angular.copy(editEmployeeTax);
					editEmployeeTax=[];
				}
				
				$scope.addempTaxRows = function() {
					$scope.empList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"annualMinTax" :'',
						"annualMaxTax" :'',
						"fixedTax" :'',
						"variableTax" :'',
						"comments" :'',
						"status":'1'
						
					});
				},
				$scope.empPopUpRowSelect = function(emp) {
					if (emp.selected) {
						selectedEmployeeTax.push(emp);
					} else {
						selectedEmployeeTax.pop(emp);
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedEmployeeTax.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedEmployeeTax.length < $scope.empList.length) {
						angular
								.forEach(
										selectedEmployeeTax,
										function(
												value,
												key) {
											$scope.empList
													.splice(
															$scope.empList
																	.indexOf(value),
															1);
										
										});
						selectedEmployeeTax = [];
						GenericAlertService
						.alertMessage(
								'Rows are deleted Successfully',
								"Info");
					} else {
						GenericAlertService
								.alertMessage(
										'Please leave atleast one row',
										"Warning");
					}
				}
				$scope.saveemppayroll = function(){
					var req={
					
							"employeePayRollTaxTOs" : $scope.empList
				}
					EmployeeTaxService.saveEmployeePayroll(req).then(function(data) {
						GenericAlertService.alertMessage('EmployeeTax New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('EmployeeTax New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

