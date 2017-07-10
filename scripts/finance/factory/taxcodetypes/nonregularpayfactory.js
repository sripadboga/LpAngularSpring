'use strict';

app
		.factory(
				'NonRegularPayedFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope, NonRegularPayService,
						 GenericAlertService) {
					var nonRegularPayPopup;
					var service = {};
					service.nonRegularPayPopupDetails = function(actionType,
							editNonRegularPay) {
						var deferred = $q.defer();
						nonRegularPayPopup = ngDialog
								.open({
									template : 'views/centrallib/finance/nonregularpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedNonRegularPay = [];
												$scope.addNonRegularPayCodes = [];
												if (actionType === 'Add') {
													$scope.addNonRegularPayCodes
															.push({
																'selected':false, 
																'code' : null,
																'name' : null,
																'taxStatus' : null,
																'comments' : null,
																'status' : 1
															});
												} else {
													$scope.addNonRegularPayCodes = angular
															.copy(editNonRegularPay);
													editNonRegularPay = [];
												}
														$scope.addRows = function() {

															$scope.addNonRegularPayCodes
																	.push({
																		'selected':false, 
																		'code' : null,
																		'name' : null,
																		'taxStatus' : null,
																		'comments' : null,
																		'status' : 1
																	});
														},
														$scope.saveNonRegularPay = function() {
															var req = {
																"nonRegularPayAllowanceTOs" : $scope.addNonRegularPayCodes,
															}
															NonRegularPayService
																	.saveNonRegularPay(req).then(function(data) {
																		if (data.status != null && data.status !== undefined && data.status === 'Info') {
																			
																			var result = data.nonRegularPayAllowanceTOs;
																			console.log(JSON.stringify(data.nonRegularPayAllowanceTOs));
																			var succMsg = GenericAlertService
																					.alertMessageModal(
																							'NonRegularPay Details '
																									+ data.message,
																							data.status);
																			succMsg
																					.then(
																							function(
																									popData) {
																								ngDialog
																								.close(nonRegularPayPopup);
																								
																								var returnPopObj = {
																									"nonRegularPayAllowanceTOs" : result
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
														$scope.popUpRowSelect = function(nonRegularPay) {
															if (nonRegularPay.selected) {
																selectedNonRegularPay.push(nonRegularPay);
															} else {
																selectedNonRegularPay.pop(nonRegularPay);
															}
														},
														$scope.deleteRows = function() {
															if (selectedNonRegularPay.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedNonRegularPay.length < $scope.addNonRegularPayCodes.length) {
																angular
																		.forEach(
																				selectedNonRegularPay,
																				function(
																						value,
																						key) {
																					$scope.addNonRegularPayCodes
																							.splice(
																									$scope.addNonRegularPayCodes
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedNonRegularPay = [];
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
