'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'nonregularpayandallowance',
									{
										url : '/nonregularpayandallowance',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcodetypes/nonregularpayallowances.html',
												controller : 'NonRegularPayController'
											}
										}
									})
				})
		.controller(
				"NonRegularPayController",
				function($rootScope, $scope, $state, ngDialog,
						NonRegularPayedFactory, NonRegularPayService,TaxCountryFactory, ProjectSettingsService,
						GenericAlertService) {

					$scope.getGeneralValuesOnLoad = function() {
						var getGVOnLoadReq = {
							"status" : 1,
						};
						ProjectSettingsService
								.projGeneralOnLoad(getGVOnLoadReq)
								.then(
										function(data) {
											$scope.countries = data.countryTOs;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while getting General Values",
															"Error");
										});
					},
					
					$scope.getCountryDetails = function() {
						var popupDetails = TaxCountryFactory
								.getCountryDetails();
						$scope.countryProvisionObj = {};
						popupDetails
								.then(
										function(data) {
											$scope.countryProvisionObj.code = data.selectedCountry.name;
											$scope.countryProvisionObj.countryId = data.selectedCountry.id;
											$scope.provisions = data.selectedCountry.provisionTOs;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while selecting  Details",
															'Info');
										})
					},
					$scope.nonRegularPayList = [];
					var editNonRegularPay = [];
					$scope.nonRegularPayReq = {
						"clientId" : 101,
						"status" : "1"
					}
					$scope.nonRegularPaySearch = {};
							$scope.nonRegularPaySearch = function() {
								NonRegularPayService
										.getNonRegularPay(
												$scope.nonRegularPayReq)
										.then(
												function(data) {
													$scope.nonRegularPayList = data.nonRegularPayAllowanceTOs;
													if ($scope.nonRegularPayReq.clientId == null) {
														GenericAlertService
																.alertMessage(
																		"Please enter proper values",
																		'Warning');
													}
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Non Regular Pay Details",
																	'Error');
												});
							},
							$scope.reset = function() {
								$scope.nonRegularPayList = [];
								$scope.nonRegularPayReq = {
									"status" : "1"
								}
								$scope.nonRegularPaySearch();
							},
							
							$scope.nonRegularPayRowSelect = function(nonRegularPay) {
								if (nonRegularPay.selected) {
									editNonRegularPay.push(nonRegularPay);
								} else {
									editNonRegularPay.pop(nonRegularPay);
								}
							},
							$scope.addData = function(actionType) {
								if (actionType == 'Edit'
										&& editNonRegularPay <= 0) {
									GenericAlertService
											.alertMessage("Please select alteast one row to modify",'Warning');

								} else if ($scope.nonRegularPaySearch !== undefined
										&& $scope.nonRegularPaySearch != null) {
									var popupDetails = NonRegularPayedFactory
											.nonRegularPayPopupDetails(
													actionType,
													editNonRegularPay);
									popupDetails
											.then(
													function(data) {
														$scope.nonRegularPayList = data.nonRegularPayAllowanceTOs;
														editNonRegularPay = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting NonRegularPay details",
																		'Info');
													})
								}
							},
							$scope.deleteNonRegularPay = function() {
								if (editNonRegularPay.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.nonRegularPayList = [];
								} else {
									angular.forEach(editNonRegularPay,
											function(value, key) {
												if (value.id) {
													deleteIds.push(value.id);
												}
											});
									var req = {
										"nonRegAllowanceIds" : deleteIds,
										"status" : 2
									};
									NonRegularPayService
											.deleteNonRegularPay(req)
											.then(
													function(data) {
														GenericAlertService
																.alertMessage(
																		'NonRegularPay Details are  Deactivated successfully',
																		'Info');
													});

									angular
											.forEach(
													editNonRegularPay,
													function(value, key) {
														$scope.nonRegularPayList
																.splice(
																		$scope.nonRegularPayList
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'NonRegularPay are failed to Deactivate',
																		"Error");
													});
									editNonRegularPay = [];
									$scope.deleteIds = [];

								}
							}
				});
