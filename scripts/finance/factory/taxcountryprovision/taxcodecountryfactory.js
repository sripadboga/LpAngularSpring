'use strict';
app.factory('TaxCodeCountryFactory',	
		function(ngDialog, $q, $filter,$timeout,TaxCodeService,GenericAlertService) {
		var TaxPopUp;
		var service = {};
		service.TaxPopUpDetails = function(actionType,editTaxCountry) {
		var deferred = $q.defer();
		TaxPopUp = ngDialog
		.open({
			template : 'views/finance/taxcountryprovision/taxcodecountrypopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedTaxCountry=[];
				 $scope.taxList =[];
				if (actionType === 'Add'){		
					$scope.taxList.push({
						"selected" : false,
						"clientId":null,
						"code" :'',
						"name" :'',
						"taxStatus" :'',
						"periodCycle" :'',
						"dueDate" :'',
						"taxRule":'',
						"status":'1'
						
					});
				}	
				else {
					$scope.taxList = angular.copy(editTaxCountry);
					editTaxCountry=[];
				}
				
				var taxCodeService={};
				$scope.taxDetails = function(
						taxcode) {
					var taxPopup = taxCodeService
							.getTaxCalculationCode();
					taxPopup
							.then(
									function(
											data) {
										$scope.taxcode = data.taxCalculationMstrTO;
									},
									function(
											error) {
										GenericAlertService
												.alertMessage(
														"Error occured while selecting project employee class Details",
														'Error');
									});
				}
				taxCodeService.getTaxCalculationCode = function() {
					var deferred = $q.defer();
					ngDialog
							.open({
								template : 'views/centrallib/finance/taxcodelist.html',
								closeByDocument : false,
								showClose : true,
								controller : [
										'$scope',
										function(
												$scope) {

											$scope.taxcodeDetails = [];

											$scope.getTaxCalculation = function() {
												var req = {
														"clientId":null,
														"code":'',
														"name":'',
														"taxstatus":''
														
												}
												
												
												TaxCodeService
														.getTaxCalculationCode(
																req)
														.then(
																function(
																		data) {
																	console.log("Popup"+JSON.stringify(data));
																	$scope.taxcodeDetails = data.taxCalculationTOs;
																});
											}
											$scope.projtaxPopUp = function(
													taxCalculationMstrTO) {
												var returnTaxCalculationMstrTO = {
													"taxCalculationMstrTO" : taxCalculationTOs
												};
												deferred
														.resolve(returnTaxCalculationMstrTO);
												$scope
														.closeThisDialog();

											}
										} ]
							});
					return deferred.promise;
				}

				
					
				$scope.addtaxRows = function() {
					$scope.taxList.push({
						"selected" : false,
						"clientId":null,
						"code" :'aa',
						"name" :'',
						"taxStatus" :'',
						"periodCycle" :'',
						"dueDate" :'',
						"taxRule":'',
						"status":'1'
					});
				},
				$scope.taxPopUpRowSelect = function(tax ) {
					if (tax .selected) {
						selectedTaxCountry.push(tax );
					} else {
						selectedTaxCountry.pop(tax );
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedTaxCountry.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedTaxCountry.length < $scope.taxList.length) {
						angular
								.forEach(
										selectedTaxCountry,
										function(
												value,
												key) {
											$scope.taxList
													.splice(
															$scope.taxList
																	.indexOf(value),
															1);
										
										});
						selectedTaxCountry = [];
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
				$scope.savetaxcode = function(){
					var req={
							
							"taxCalculationMstrTO" : $scope.taxList	
				}
					TaxCodeService.saveTaxCalculationCode(req).then(function(data) {
						GenericAlertService.alertMessage('TaxCountry New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('TaxCountry New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

