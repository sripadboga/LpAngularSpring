'use strict';
app.config(function($stateProvider) {
	$stateProvider.state("medicaltax", {
		
		url : '/medicaltax',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/finance/taxtypes/medicalleavetax.html',
				controller : 'MedicalTaxController'
			}
		}
	})
}).controller("MedicalTaxController",function($scope,$q,$state,ngDialog,MedicalTaxFactory,MedicalTaxService,GenericAlertService) {
	var service = {}
	
	
	var editMedicalTax=[];
	var medicalTax=[];
	$scope.medicalTax =[];
	
	//get req
	$scope.getMedicalLeaveTax = function() {
		var getMedicalReq = {
				"selected" : false,
				"clientId":null,
				"annualMinTax" :'',
				"annualMaxTax" :'',
				"fixedTax" :'',
				"variableTax" :'',
				"comments" :'',
				"status":'1'
		};
		MedicalTaxService
				.getMedicalLeaveTax(getMedicalReq)
				.then(
						function(data) {
							$scope.medicalTax = data.medicalLeaveTaxTOs;
						},
						function(error) {
							GenericAlertService
									.alertMessage(
											"Error occured while getting $scope.medicalTax Details",
											"Error");
						});
	}
	
	
	
	

	 $scope.medicaltaxrowselect = function(medical) {
		if (medical.selected) {
			editMedicalTax.push(medical);
		} else {
			editMedicalTax.pop(medical);
		}
	 },
	 $scope.addMedicalTax = function(actionType) {
			
			if (actionType == 'Edit' && editMedicalTax <= 0) {
				GenericAlertService
						.alertMessage(
								"Please select alteast one row to modify",
								'Warning');
				return;
			} else {
				var taxDetails = MedicalTaxFactory
						.medicalTaxPopUpDetails(actionType,
								editMedicalTax);
				taxDetails
						.then(
								function(data) {
									$scope.medicalTax = data.medicalLeaveTaxTOs;
									editMedicalTax = [];
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occurred while selecting  Details",
													'Info');
								})
			}
		}
	 $scope.deteteMedicalTax = function() {
			if (editMedicalTax.length <= 0) {
				GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
				return;
			}
			var deleteIds = [];
			$scope.nondeleteIds = [];
			if ($scope.selectedAll) {
				$scope.medicalTax = [];
			} else {
				angular.forEach(editMedicalTax,function(value, key) {
									if (value.id) {
										deleteIds.push(value.id);
									}
								});
				var req = {
					"medicalLeaveIds" : deleteIds,
					"status" : 2
				};
				TaxCodeService.deleteMedicalLeaveTax(req).then(function(data) {
					GenericAlertService.alertMessage('Medical Tax Details are  Deactivated successfully','Info');
						});
			
				angular.forEach(editMedicalTax,function(value, key) {
									$scope.medicalTax.splice(
													$scope.medicalTax.indexOf(value),1);
								},
								function(error) {
									GenericAlertService.alertMessage('Medical Tax Details are failed to Deactivate',"Error");
								});
				editMedicalTax = [];
				$scope.deleteIds = [];

			}
		}
			
		});
