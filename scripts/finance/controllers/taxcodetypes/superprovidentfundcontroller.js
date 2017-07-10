'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"superannuationfunds",
									{
										url : '/superannuationfunds',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcodetypes/superprovidentfund.html',
												controller : 'SuperProvidentFundController'
											}
										}
									})
				})
		.controller(
				"SuperProvidentFundController",
				function($scope, $q, $state, ngDialog, SuperFundFactory,
						SuperFundService, GenericAlertService) {

					var service = {};
					var editSuperFund = [];
					$scope.superFundList = [];

					$scope.superFundReq = {
						"clientId" : 101,
						"status" : "1"
					}
					$scope.superFundSearch = {};
					$scope.superFundSearch = function() {
						SuperFundService
								.getSuperFund($scope.superFundReq)
								.then(
										function(data) {
											$scope.superFundList = data.superFundTOs;
											if ($scope.superFundReq.clientId == null) {
												GenericAlertService
														.alertMessage(
																"Please enter proper values",
																'Warning');
											}
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while getting Super Fund Details",
															'Error');
										});
					}

					$scope.reset = function() {
						$scope.superFundList = [];
						$scope.superFundReq = {
							"status" : "1"
						}
						$scope.superFundSearch();
					}

					$scope.superFundRowSelect = function(superFund) {
						if (superFund.selected) {
							editSuperFund.push(superFund);
						} else {
							editSuperFund.pop(superFund);
						}
					}

					$scope.addSuperFund = function(actionType) {
						if (actionType == 'Edit' && editSuperFund <= 0) {
							GenericAlertService.alertMessage(
									"Please select alteast one row to modify",
									'Warning');
							return;
						} else if ($scope.superFundSearch !== undefined
								&& $scope.superFundSearch != null) {
							var popupDetails = SuperFundFactory
									.superFundPopupDetails(actionType,
											editSuperFund);
							popupDetails
									.then(
											function(data) {
												$scope.superFundList = data.superFundTOs;
												editSuperFund = [];
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error occurred while selecting  Details",
																'Info');
											})
						}
					}

					$scope.deleteSuperFund = function() {
						if (editSuperFund.length <= 0) {
							GenericAlertService
									.alertMessage(
											"Please select alteast one row to Deactivate",
											'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.superFundList = [];
						} else {
							angular.forEach(editSuperFund,
									function(value, key) {
										if (value.id) {
											deleteIds.push(value.id);
										}
									});
							var req = {
								"payDeductionIds" : deleteIds,
								"status" : 2
							};
							SuperFundService
									.deleteSuperFund(req)
									.then(
											function(data) {
												GenericAlertService
														.alertMessage(
																'Super Fund Details are  Deactivated successfully',
																'Info');
											});

							angular
									.forEach(
											editSuperFund,
											function(value, key) {
												$scope.superFundList
														.splice(
																$scope.superFundList
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Super Fund Details are failed to Deactivate',
																"Error");
											});
							editSuperFund = [];
							$scope.deleteIds = [];

						}
					}

				});
