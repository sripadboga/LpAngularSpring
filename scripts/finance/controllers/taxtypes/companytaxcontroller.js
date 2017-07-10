/*'use strict';
app.config(function($stateProvider) {
	$stateProvider.state("", {
		
		url : '/',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/finance/taxtypes/companytax.html',
				controller : 'CompanyTaxController'
			}
		}
	})
}).controller("CompanyTaxController",function($scope,$q,$state,ngDialog,CompanyTaxFactory,CompanyTaxService,GenericAlertService) {
	var service = {}
	
	
	
	
	
	$scope.companyTax=[];
	
//get req
	$scope.getCompanyTax = function() {
		var getCompanyTaxReq = {
				"selected" : false,
				"taxCalMstrId" :'',
				"annualMinTax" :'',
				"annualMaxTax" :'',
				"fixedTax" :'',
				"variableTax" :'',
				"comments" :'',
				"status":'1'
		};
		CompanyTaxService
				.getCompanyTax(getCompanyTaxReq)
				.then(
						function(data) {
							$scope.companyTax = data.companyTaxTOs;
						},
						function(error) {
							GenericAlertService
									.alertMessage(
											"Error occured while getting CompanyTax Details",
											"Error");
						});
	}
	
	

	
	var editCompanyTax=[];
	$scope.companyTax=[];

	 $scope.companytaxrowselect = function(company) {
		if (company.selected) {
			editCompanyTax.push(company);
		} else {
			editCompanyTax.pop(company);
		}
	 },
	 $scope.addCompanyTax = function(actionType) {
			
			if (actionType == 'Edit' && editCompanyTax <= 0) {
				GenericAlertService
						.alertMessage(
								"Please select alteast one row to modify",
								'Warning');
				return;
			} else {
				var taxDetailspopup = CompanyTaxFactory
						.companyTaxPopUpDetails(actionType,
								editCompanyTax);
				taxDetailspopup
						.then(
								function(data) {
									$scope.companyTax = data.companyTaxTOs;
									editCompanyTax = [];
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occurred while selecting  Details",
													'Info');
								})
			}
		}
	 

	 $scope.deteteCompanyTax = function() {
			if (editCompanyTax.length <= 0) {
				GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
				return;
			}
			var deleteIds = [];
			$scope.nondeleteIds = [];
			if ($scope.selectedAll) {
				$scope.companyTax = [];
			} else {
				angular.forEach(editCompanyTax,function(value, key) {
									if (value.id) {
										deleteIds.push(value.id);
									}
								});
				var req = {
					"companyTaxIds" : deleteIds,
					"status" : 2
				};
				CompanyTaxService.deleteCompanyTax(req).then(function(data) {
					GenericAlertService.alertMessage('company Details are  Deactivated successfully','Info');
						});
			
				angular.forEach(editCompanyTax,function(value, key) {
									$scope.companyTax.splice(
													$scope.companyTax.indexOf(value),1);
								},
								function(error) {
									GenericAlertService.alertMessage('Company Details are failed to Deactivate',"Error");
								});
				editCompanyTax = [];
				$scope.deleteIds = [];

			}
		}
			
		});
*/