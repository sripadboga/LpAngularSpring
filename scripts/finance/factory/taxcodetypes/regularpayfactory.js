'use strict';
app
		.factory(
				'RegularPayFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						RegularPayservice, RegularPayPopUpFactory, GenericAlertService) {
					var regularPay;
					var selectedRegularPay = [];
					var service = {};

							service.getRegularPayDetails = function(
									taxCountryProvisionId) {
								var deferred = $q.defer();
								var regularPayReq = {
									"taxId" : taxCountryProvisionId,
									"status" : "1"
								};
								RegularPayservice
										.getRegularPay(regularPayReq)
										.then(
												function(data) {
													var regularPay = [];
													regularPay = service
															.openRegularPayPopup(
																	data.regularPayAllowanceTOs,
																	taxCountryProvisionId);
													regularPay
															.then(
																	function(
																			data) {
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while getting Regular Pay Details",
																						'Error');
																	});
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Regular Pay Details",
																	'Error');
												});
								return deferred.promise;

							},
							service.openRegularPayPopup = function(
									regularPayAllowanceTOs,
									taxCountryProvisionId) {
								var deferred = $q.defer();
								regularPay = ngDialog
										.open({
											template : 'views/finance/taxcodetypes/regularpayallowances.html',
											className : 'ngdialog-theme-plain ng-dialogueCustom2',
											scope : $rootScope,
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														var service = {}
														var editRegularPay = [];
														$scope.regularPayList = regularPayAllowanceTOs;
														$scope.regularPaySearch = {};

														$scope.regularPayRowSelect = function(
																regularPay) {
															if (regularPay.selected) {
																editRegularPay
																		.push(regularPay);
															} else {
																editRegularPay
																		.pop(regularPay);
															}
														}
														$scope.addRegularPay = function(
																actionType) {
															if (actionType == 'Edit'
																	&& editRegularPay <= 0) {
																GenericAlertService
																		.alertMessage(
																				"Please select alteast one row to modify",
																				'Warning');
																return;
															} else {
																var popupDetails = RegularPayPopUpFactory
																		.regularPayPopupDetails(
																				actionType,
																				editRegularPay,
																				taxCountryProvisionId);
																popupDetails
																		.then(
																				function(
																						data) {
																					$scope.regularPayList = data.regularPayAllowanceTOs;
																					editRegularPay = [];
																				},
																				function(
																						error) {
																					GenericAlertService
																							.alertMessage(
																									"Error occurred while selecting Details",
																									'Info');
																				})
															}
														}
														$scope.deleteRegularPay = function() {
															if (editRegularPay.length <= 0) {
																GenericAlertService
																		.alertMessage(
																				"Please select alteast one row to Deactivate",
																				'Warning');
																return;
															}
															var deleteIds = [];
															$scope.nondeleteIds = [];
															if ($scope.selectedAll) {
																$scope.regularPayList = [];
															} else {
																angular
																		.forEach(
																				editRegularPay,
																				function(
																						value,
																						key) {
																					if (value.id) {
																						deleteIds
																								.push(value.id);
																					}
																				});
																var req = {
																	"taxIds" : deleteIds,
																	"status" : 2
																};
																RegularPayservice
																		.deleteRegularPay(
																				req)
																		.then(
																				function(
																						data) {
																					GenericAlertService
																							.alertMessage(
																									'Regular Pay Details are Deactivated successfully',
																									'Info');
																				});

																angular
																		.forEach(
																				editRegularPay,
																				function(
																						value,
																						key) {
																					$scope.regularPayList
																							.splice(
																									$scope.regularPayList
																											.indexOf(value),
																									1);
																				},
																				function(
																						error) {
																					GenericAlertService
																							.alertMessage(
																									'Regular Pay Details are failed to Deactivate',
																									"Error");
																				});
																editRegularPay = [];
																$scope.deleteIds = [];

															}
														}
													} ]

										});
								return deferred.promise;
							}
					return service;
				});