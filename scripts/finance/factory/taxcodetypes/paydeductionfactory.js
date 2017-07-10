'use strict';

app
		.factory(
				'PayDeductionFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope, PayDeductionService,
						 GenericAlertService) {
					var payDeductionPopup;
					var selectedPayDeduction = [];
					var service = {};
					service.payDeductionPopupDetails = function(actionType,
							editpayDeduction) {
						var deferred = $q.defer();
						payDeductionPopup = ngDialog
								.open({

									template : 'views/centrallib/finance/paydeductionpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedPayDeduction = [];
												$scope.addPayDeductionCodes = [];
												if (actionType === 'Add') {
													$scope.addPayDeductionCodes
															.push({
																'selected':false, 
																'clientId':null,
																'code' : null,
																'desc' : null,
																'notes' : null,
																'status' : 1
															});
												} else {
													$scope.addPayDeductionCodes = angular
															.copy(editpayDeduction);
													editpayDeduction = [];
												}
												
											

														$scope.addRows = function() {

															$scope.addPayDeductionCodes
																	.push({
																		'selected':false, 
																		'code' : null,
																		'desc' : null,
																		'notes' : null,
																		'status' : 1

																	});
														},
														$scope.savePayDeductions = function() {
															var req = {
																"payDeductionTOs" : $scope.addPayDeductionCodes,
															}
															PayDeductionService.savePayDeductions(req).then(
																			function(data) {
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					
																					var result = data.payDeductionTOs;
																					console.log(JSON.stringify(data.payDeductionTOs));
																					var succMsg = GenericAlertService
																							.alertMessageModal(
																									'PayDeduction Details '
																											+ data.message,
																									data.status);
																					succMsg
																							.then(
																									function(popData) {
																										ngDialog
																										.close(payDeductionPopup);
																										
																										var returnPopObj = {
																											"payDeductionTOs" : result
																										};
																										
																										deferred
																												.resolve(returnPopObj);
																										console.log("save"+JSON.stringify(returnPopObj));
																									},
																									function(
																											error) {
																										GenericAlertService
																												.alertMessage(
																														"Error occurred while closing popup",
																														'Info');
																									});
																				}
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Unit Pay rate Details  are failed to Save','Error');
																			});
															ngDialog.close();
														},
																				

														$scope.popUpRowSelect = function(
																payDeduction) {
															if (payDeduction.selected) {
																selectedPayDeduction
																		.push(payDeduction);
															} else {
																selectedPayDeduction
																		.pop(payDeduction);
															}
														},
														$scope.deleteRows = function() {
															if (selectedPayDeduction.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPayDeduction.length < $scope.addPayDeductionCodes.length) {
																angular
																		.forEach(
																				selectedPayDeduction,
																				function(
																						value,
																						key) {
																					$scope.addPayDeductionCodes
																							.splice(
																									$scope.addPayDeductionCodes
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedPayDeduction = [];
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
											} ]

								});
						return deferred.promise;
					}
					return service;
				});