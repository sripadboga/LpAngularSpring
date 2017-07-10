'use strict';

app
		.factory(
				'SuperFundFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope, SuperFundService,
						 GenericAlertService) {
					var superFundPopup;
					var selectedSuperFund = [];
					var service = {};
					service.superFundPopupDetails = function(actionType,
							editSuperFund) {
						var deferred = $q.defer();
						superFundPopup = ngDialog
								.open({

									template : 'views/centrallib/finance/superfundpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedSuperFund = [];
												$scope.addSuperFund = [];
												if (actionType === 'Add') {
													$scope.addSuperFund
															.push({
																'selected':false, 
																'code' : null,
																'desc' : null,
																'taxableOrNot' : null,
																'creditCycle' : null,
																'dueDate' : null,
																'status' : 1
															});
												} else {
													$scope.addSuperFund = angular
															.copy(editSuperFund);
													editSuperFund = [];
												}
														$scope.addRows = function() {

															$scope.addSuperFund
																	.push({
																		'selected':false, 
																		'code' : null,
																		'desc' : null,
																		'taxableOrNot' : null,
																		'creditCycle' : null,
																		'dueDate' : null,
																		'status' : 1
																	});
														},
														$scope.saveSuperFund = function() {
															var req = {
																"superFundTOs" : $scope.addSuperFund,
															}
															SuperFundService
																	.saveSuperFund(
																			req)
																	.then(
																			function(
																					data) {
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					
																					var result = data.superFundTOs;
																					console.log(JSON.stringify(data.superFundTOs));
																					var succMsg = GenericAlertService
																							.alertMessageModal(
																									'SuperFund Details '
																											+ data.message,
																									data.status);
																					succMsg
																							.then(
																									function(
																											popData) {
																										ngDialog
																										.close(superFundPopup);
																										
																										var returnPopObj = {
																											"superFundTOs" : result
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
																						.alertMessage('Super Fund Details  are failed to Save','Error');
																			});
															ngDialog.close();
														},


														$scope.superFundPopupRowSelect = function(
																superFund) {
															if (superFund.selected) {
																selectedSuperFund
																		.push(superFund);
															} else {
																selectedSuperFund
																		.pop(superFund);
															}
														},
														$scope.deleteRows = function() {
															if (selectedSuperFund.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedSuperFund.length < $scope.addSuperFund.length) {
																angular
																		.forEach(
																				selectedSuperFund,
																				function(
																						value,
																						key) {
																					$scope.addSuperFund
																							.splice(
																									$scope.addSuperFund
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedSuperFund = [];
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