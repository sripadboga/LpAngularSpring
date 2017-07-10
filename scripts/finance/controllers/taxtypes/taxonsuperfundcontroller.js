'use strict';
app.config(function($stateProvider) {
	$stateProvider.state("taxonsuperfund", {
		
		url : '/taxonsuperfund',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/finance/taxtypes/taxonsuperfund.html',
				controller : 'TaxOnSuperfundController'
			}
		}
	})
}).controller("TaxOnSuperfundController",function($scope,$q,$state,ngDialog,TaxonSuperfundFactory,TaxonService,GenericAlertService) {
	var service = {}
	
	
	
	var editTaxOn=[];
	var superFund=[];
	$scope.superFund=[];
	
	
	//get req
	$scope.getSuperfundTax = function() {
		var getSuperFundReq = {
				"selected" : false,
				"taxCalMstrId" :'',
				"limitIncome" :'',
				"fundAmount" :'',
				"taxRate" :'',
				"comments" :'',
				"status":''
		};
		TaxonService
				.getSuperfundTax(getSuperFundReq)
				.then(
						function(data) {
							$scope.superFund = data.taxOnSuperFundTOs;
						},
						function(error) {
							GenericAlertService
									.alertMessage(
											"Error occured while getting superFund Details",
											"Error");
						});
	}
	
	

	 $scope.taxonrowselect = function(taxon) {
		if (taxon.selected) {
			editTaxOn.push(taxon);
		} else {
			editTaxOn.pop(taxon);
		}
	 },
	 $scope.addTaxon = function(actionType) {
			
			if (actionType == 'Edit' && editTaxOn <= 0) {
				GenericAlertService
						.alertMessage(
								"Please select alteast one row to modify",
								'Warning');
				return;
			} else {
				var taxDetails = TaxonSuperfundFactory
						.taxonPopUpDetails(actionType,
								editTaxOn);
				taxDetails
						.then(
								function(data) {
									$scope.superFund = data.taxOnSuperFundTOs;
									editTaxOn = [];
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occurred while selecting  Details",
													'Info');
								})
			}
		}
	 
	 $scope.deteteTaxon = function() {
			if (editTaxOn.length <= 0) {
				GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
				return;
			}
			var deleteIds = [];
			$scope.nondeleteIds = [];
			if ($scope.selectedAll) {
				$scope.superFund = [];
			} else {
				angular.forEach(editTaxOn,function(value, key) {
									if (value.id) {
										deleteIds.push(value.id);
									}
								});
				var req = {
					"superFundTaxIds" : deleteIds,
					"status" : 2
				};
				TaxonService.deleteSuperfundTax(req).then(function(data) {
					GenericAlertService.alertMessage('Pay deduction Details are  Deactivated successfully','Info');
						});
			
				angular.forEach(editTaxOn,function(value, key) {
									$scope.superFund.splice(
													$scope.superFund.indexOf(value),1);
								},
								function(error) {
									GenericAlertService.alertMessage('Plants Details are failed to Deactivate',"Error");
								});
				editTaxOn = [];
				$scope.deleteIds = [];

			}
		}
		});
