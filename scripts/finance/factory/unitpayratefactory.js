'use strict';

app
		.factory(
				'UnitPayRateFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope, UnitPayRateService,
						 GenericAlertService) {
					var unitPayRatePopup;
					var selectedUnitPayRate = [];
					var service = {};
					service.unitPayPopupDetails = function(actionType,
							editUnitPayRate) {
						var deferred = $q.defer();
						unitPayRatePopup = ngDialog
								.open({

									template : 'views/finance/unitpayratespopup.html',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedUnitPayRate = [];
												$scope.addUnitPayrates = [];
												if (actionType === 'Add') {
													$scope.addUnitPayrates
															.push({
																'selected':false, 
																'clientId':null,
																'code' : null,
																'name' : null,
																'notes' : null,
																'status' : 1
															});
												} else {
													$scope.addUnitPayrates = angular
															.copy(editUnitPayRate);
													editUnitPayRate = [];
												}
														$scope.addRows = function() {

															$scope.addUnitPayrates
																	.push({
																		'selected':false, 
																		'code' : null,
																		'name' : null,
																		'notes' : null,
																		'status' : 1

																	});
														},
														
														$scope.saveUnitPayRate = function() {
															var saveReq = {
																"unitPayRateTOs" : $scope.addUnitPayrates,
																"clientId" :$scope.clientId
																		};
															console.log("savereq"+JSON.stringify(saveReq));
															UnitPayRateService.saveUnitPayRate(saveReq)
																	.then(function(data) {
																				/*if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {*/
																					
																					var result = data.unitPayRateTOs;
																					var succMsg = GenericAlertService.alertMessageModal('UnitPayRate Details '+ data.message,data.status);
																				       succMsg.then(function(popData) {
																									ngDialog.close(unitPayRatePopup);
																									var returnPopObj = {
																										"unitPayRateTOs" : results
																									};
																									deferred.resolve(returnPopObj);
																								});
																				       ngDialog.close();
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Unit Pay rate Details  are failed to Save','Error');
																	});
														}
																					
																				/*	console.log(JSON.stringify(data.unitPayRateTOs));
																					var succMsg = GenericAlertService
																							.alertMessageModal(
																									'UnitPayRate Details '
																											+ data.message,
																									data.status);
																					succMsg
																							.then(
																									function(
																											popData) {
																										ngDialog
																										.close(unitPayRatePopup);
																										
																										var returnPopObj = {
																											"unitPayRateTOs" : result
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
														*/
														
														$scope.unitPayRatePopupRowSelect = function(
																unitPay) {
															if (unitPay.selected) {
																selectedUnitPayRate
																		.push(unitPay);
															} else {
																selectedUnitPayRate
																		.pop(unitPay);
															}
														},
														$scope.deleteRows = function() {
															if (selectedUnitPayRate.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedUnitPayRate.length < $scope.addUnitPayrates.length) {
																angular
																		.forEach(
																				selectedUnitPayRate,
																				function(
																						value,
																						key) {
																					$scope.addUnitPayrates
																							.splice(
																									$scope.addUnitPayrates
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedUnitPayRate = [];
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