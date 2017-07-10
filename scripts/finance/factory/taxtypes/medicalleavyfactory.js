'use strict';
app.factory('MedicalTaxFactory',	
		function(ngDialog, $q, $filter,$timeout,MedicalTaxService,GenericAlertService) {
		var medicalTaxPopUp;
		var service = {};
		service.medicalTaxPopUpDetails = function(actionType,editMedicalTax) {
		var deferred = $q.defer();
		medicalTaxPopUp = ngDialog
		.open({
			template : 'views/centrallib/finance/medicalleavypopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedMedicaTax=[];
				 $scope.medicalList =[];
				
				
				if (actionType === 'Add'){		
					$scope.medicalList.push({
						"selected" : false,
						"clientId":null,
						"annualMinTax" :'',
						"annualMaxTax" :'',
						"fixedTax" :'',
						"variableTax" :'',
						"comments" :'',
						"status":'1'
					});
				}	
				else {
					$scope.medicalList = angular.copy(editMedicalTax);
					editMedicalTax=[];
				}
				
				$scope.addmedicalTaxRows = function() {
					$scope.medicalList.push({
						"selected" : false,
						"clientId":null,
						"annualMinTax" :'',
						"annualMaxTax" :'',
						"fixedTax" :'',
						"variableTax" :'',
						"comments" :'',
						"status":'1'
					});
				},
				$scope.medicalPopUpRowSelect = function(medical) {
					if (medical.selected) {
						selectedMedicaTax.push(medical);
					} else {
						selectedMedicaTax.pop(medical);
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedMedicaTax.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedMedicaTax.length < $scope.medicalList.length) {
						angular
								.forEach(
										selectedMedicaTax,
										function(
												value,
												key) {
											$scope.medicalList
													.splice(
															$scope.medicalList
																	.indexOf(value),
															1);
										
										});
						selectedMedicaTax = [];
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
				$scope.savemedicaltax = function(){
					var req={
							"medicalLeaveTaxTOs" : $scope.medicalList		
				}
					MedicalTaxService.saveMedicalLeaveTax(req).then(function(data) {
						GenericAlertService.alertMessage('savemedicaltax New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('savemedicaltax New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

