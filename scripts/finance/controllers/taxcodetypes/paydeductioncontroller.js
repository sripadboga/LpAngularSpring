'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'paydeductions',
									{
										url : '/paydeductions',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcodetypes/paydeductioncodes.html',
												controller : 'PayDeductionController'
											}
										}
									})
				})
		.controller(
				"PayDeductionController",
				function($rootScope, $scope, $state, ngDialog,
						PayDeductionService,GenericAlertService,PayDeductionFactory) {
					$scope.payDeductionCodes = [];
					$scope.addPayDeduction = [];
					var editpayDeduction = [];
					$scope.payDeductionReq={
							"country" : null,
							"province" : null,
							"status" : "1",
							"clientId" : 101
					}
								 $scope.payDeductionSearch ={};
								 $scope.payDeductionSearch = function(){								
										PayDeductionService.getPayDeductions($scope.payDeductionReq).then(
															function(data) {
																$scope.payDeductionCodes = data.payDeductionTOs;
															});
									},
									$scope.reset = function() {
								$scope.payDeductionCodes = [];
								$scope.payDeductionReq={
										"country" : null,
										"province" : null,
										"status" : "1",
										"clientId" : 101
								}
								
							}, $scope.payDeductionRowSelect = function(payDeduction) {
								if (payDeduction.selected) {
									editpayDeduction.push(payDeduction);
								} else {
									editpayDeduction.pop(payDeduction);
								}
							},
							$scope.addPayDeduction = function(actionType) {
								if (actionType == 'Edit' && editpayDeduction <= 0) {
									 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
									
								}else if( $scope.payDeductionSearch !==undefined && $scope.payDeductionSearch  != null){
										var popupDetails = PayDeductionFactory.payDeductionPopupDetails(actionType,editpayDeduction);
										popupDetails.then(function(data){
											$scope.payDeductionCodes = data.payDeductionTOs;
											editpayDeduction = [];
										},function(error){
											GenericAlertService.alertMessage("Error occurred while selecting Pay deduction details",'Info');
										})
								}
							}, 
							$scope.deletePayDeduction = function() {
								if (editpayDeduction.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.payDeductionCodes = [];
								} else {
									angular.forEach(editpayDeduction,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"payDeductionIds" : deleteIds,
										"status" : 2
									};
									PayDeductionService.deletePayDeductions(req).then(function(data) {
										GenericAlertService.alertMessage('Pay deduction Details are  Deactivated successfully','Info');
											});
								
									angular.forEach(editpayDeduction,function(value, key) {
														$scope.payDeductionCodes.splice(
																		$scope.payDeductionCodes.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('Plants Details are failed to Deactivate',"Error");
													});
									editpayDeduction = [];
									$scope.deleteIds = [];

								}
							}
				});

