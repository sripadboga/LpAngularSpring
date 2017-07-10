'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"unitofpayrates",
									{
										url : '/unitofpayrates',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/unitpayrates.html',
												controller : 'UnitPayRateController'
											}
										}
									})
				})
		.controller(
				"UnitPayRateController",
				function($scope, $q, $state, ngDialog, UnitPayRateFactory,
						UnitPayRateService, GenericAlertService) {
					var service = {}
					var editUnitPayRate = [];
					$scope.unitPayrates = [];

					$scope.unitPayReq = {
						"code" : null,
						"name" : null,
							//"clientId" : 101,
						"status" : "1"
					};
					$scope.activeFlag = 0;
					$scope.unitPaySearch = function() {
						
						UnitPayRateService.getUnitPayRate($scope.unitPayReq)
								.then(
										function(data) {
											$scope.activeFlag = 0;
											$scope.unitPayrates = data.unitPayRateTOs;
											if ($scope.unitPayrates != null
													&& $scope.unitPayrates.length > 0) {
												if ($scope.unitPayrates[0].status == 1) {
													$scope.activeFlag = 1;
												} else if ($scope.unitPayrates[0].status == 2) {
													$scope.activeFlag = 2;
												}
											}
											else{
												GenericAlertService
												.alertMessage(
														'UnitPayrates are not available for given search criteria',
														"Warning");
											}
											
										});
					},
					
				
					$scope.reset = function() {
						$scope.unitPayReq = {
								//"clientId" : $scope.unitPayReq.clientId,
							'status' : '1'
						}
					$scope.activeFlag = 0;
						$scope.unitPaySearch();
					},
			
					$scope.activeCompanies = function() {
						if (editUnitPayRate.length <= 0) {
							GenericAlertService
									.alertMessage(
											"please select records to Activate",
											'Warning');
							return;
						}
						var delIds = [];
						var nondelIds = [];
						if ($scope.selectedAll) {
							$scope.unitPayrates = [];
						} else {
							angular.forEach($scope.unitPayrates, function(
									value, key) {
								if (!value.selected) {
									nondelIds.push(value);
								} else {
									if (value.id != null
											&& value.id > 0) {
										delIds.push(value.id);
									}
								}
							});
							var req = {
								"unitPayRateIds" : delIds,
								"status" : 1
							};
							UnitPayRateService.deletePayRates(req).then(
									function(data) {
									}, function(error) {
									});
							GenericAlertService
									.alertMessage(
											'Unit PayRate Details are Activated successfully',
											'Info');
							angular
									.forEach(
											editUnitPayRate,
											function(value, key) {
												$scope.unitPayrates
														.splice(
																$scope.unitPayrates
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'UnitPayrate Details are failed to Activate',
																"Error");
											});
							editUnitPayRate = [];
							$scope.delIds = [];
						}
					},

					$scope.unitPayRowSelect = function(unitPay) {
						if (unitPay.selected) {
							editUnitPayRate.push(unitPay);
						} else {
							editUnitPayRate.pop(unitPay);
						}
					}
							$scope.addPayRates = function(actionType) {
								if (actionType == 'Edit'
										&& editUnitPayRate <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');

								} else if ($scope.unitPaySearch !== undefined
										&& $scope.unitPaySearch != null) {
									var popupDetails = UnitPayRateFactory
											.unitPayPopupDetails(actionType,
													editUnitPayRate);
									popupDetails
											.then(
													function(data) {
														$scope.unitPayrates = data.unitPayRateTOs;
														editUnitPayRate = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting  Details",
																		'Info');
													})
								}
							}
							
							$scope.deletePayRates = function() {
								if (editUnitPayRate.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.unitPayrates = [];
								} else {
									angular.forEach(editUnitPayRate,
											function(value, key) {
												if (value.id) {
													deleteIds.push(value.id);
												}
											});
									var req = {
										"unitPayRateIds" : deleteIds,
										"status" : 2
									};
									UnitPayRateService
											.deletePayRates(req)
											.then(
													function(data) {
														GenericAlertService
																.alertMessage(
																		'Unit PayRates Details are  Deactivated successfully',
																		'Info');
													});

									angular
											.forEach(
													editUnitPayRate,
													function(value, key) {
														$scope.unitPayrates
																.splice(
																		$scope.unitPayrates
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Unit PayRates are failed to Deactivate',
																		"Error");
													});
									editUnitPayRate = [];
									$scope.deleteIds = [];

								}
							}
				});
