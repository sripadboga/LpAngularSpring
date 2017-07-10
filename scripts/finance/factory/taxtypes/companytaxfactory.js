'use strict';
app.factory('CompanyTaxFactory',	
		function(ngDialog, $q, $filter,$timeout,CompanyTaxService,GenericAlertService) {
		var companyTaxPopUp;
		var service = {};
		service.companyTaxPopUpDetails = function(actionType,editCompanyTax) {
		var deferred = $q.defer();
		companyTaxPopUp = ngDialog
		.open({
			template : 'views/centrallib/finance/companytaxpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedCompanyTax=[];
				 $scope.companyList =[];
				 $scope.savecompany=[];
				
				if (actionType === 'Add'){		
					$scope.companyList.push({
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
					$scope.companyList = angular.copy(editCompanyTax);
					editCompanyTax=[];
				}
				
				$scope.addCompanyTaxRows = function() {
					$scope.companyList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"annualMinTax" :'',
						"annualMaxTax" :'',
						"fixedTax" :'',
						"variableTax" :'',
						"comments" :'',
						"status":''
					});
				},
				$scope.companyPopUpRowSelect = function(company) {
					if (company.selected) {
						selectedCompanyTax.push(company);
					} else {
						selectedCompanyTax.pop(company);
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedCompanyTax.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedCompanyTax.length < $scope.companyList.length) {
						angular
								.forEach(
										selectedCompanyTax,
										function(
												value,
												key) {
											$scope.companyList
													.splice(
															$scope.companyList
																	.indexOf(value),
															1);
										
										});
						selectedCompanyTax = [];
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
				$scope.savecompany = function(){
					var saveReq = {
							"companyTaxTOs" : $scope.companyList
						};
					CompanyTaxService.saveCompanyTax(saveReq).then(function(data) {
						GenericAlertService.alertMessage('CompanyTax New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('CompanyTax New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

