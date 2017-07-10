'use strict';
app.factory('TaxonSuperfundFactory',	
		function(ngDialog, $q, $filter,$timeout,TaxonService,GenericAlertService) {
		var taxonPopUp;
		var service = {};
		service.taxonPopUpDetails = function(actionType,editTaxOn) {
		var deferred = $q.defer();
		taxonPopUp = ngDialog
		.open({
			template : 'views/centrallib/finance/taxonsuperfundpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedTax=[];
				 $scope.taxonList =[];
				
				
				if (actionType === 'Add'){		
					$scope.taxonList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"limitIncome" :'',
						"fundAmount" :'',
						"taxRate" :'',
						"comments" :'',
						"status":''
					});
				}	
				else {
					$scope.taxonList = angular.copy(editTaxOn);
					editTaxOn=[];
				}
				
				$scope.addtaxonRows = function() {
					$scope.taxonList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"limitIncome" :'',
						"fundAmount" :'',
						"taxRate" :'',
						"comments" :'',
						"status":''
						
						
					});
				},
				$scope.taxonPopUpRowSelect = function(taxon) {
					if (taxon.selected) {
						selectedTax.push(taxon);
					} else {
						selectedTax.pop(taxon);
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedTax.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedTax.length < $scope.taxonList.length) {
						angular
								.forEach(
										selectedTax,
										function(
												value,
												key) {
											$scope.taxonList
													.splice(
															$scope.taxonList
																	.indexOf(value),
															1);
										
										});
						selectedTax = [];
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
				$scope.savetaxon = function(){
					var req={

							"taxOnSuperFundTOs" : $scope.taxonList,
							"clientId" : $scope.clientId
								
				}
					TaxonService.saveSuperfundTax(req).then(function(data) {
						GenericAlertService.alertMessage('TaxOn New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('TaxOn New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

