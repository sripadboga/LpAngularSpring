'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'taxpaymentdetails',
									{
										url : '/taxpaymentdetails',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcodetypes/taxpaymentdetails.html',
												controller : 'TaxPaymentController'
											}
										}
									})
				})
		.controller(
				"TaxPaymentController",
				function($rootScope, $scope, $state, ngDialog,
						GenericAlertService, TaxPaymentFactory,
						TaxPaymentService) {
					$scope.taxPaymentDetails = [];

					var editTaxPayment = [];
					$scope.taxPaymentReq = {
						"country" : null,
						"province" : null,
						"status" : "1",
						"clientId" : 101
					}
							$scope.taxPaymentSearch = function() {
								TaxPaymentService
										.getTaxPayment($scope.taxPaymentReq)
										.then(
												function(data) {
													$scope.taxPaymentDetails = data.taxPaymentDetailsTOs;
													if ($scope.taxPaymentReq.clientId == null) {
														GenericAlertService
																.alertMessage(
																		"Please enter proper values",
																		'Warning');
													}
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Tax Pay Details",
																	'Error');
												});
							},
							
							
							$scope.reset = function() {
								$scope.generalValues.countryTO.provisionTO = null;
								$scope.generalValues.countryTO = null;
								$scope.taxPaymentDetails = [];
								editTaxPayment = [];
							},
						
							$scope.rowSelect = function(taxdetails) {
								if (taxdetails.selected) {
									editTaxPayment.push(taxdetails);
								} else {
									editTaxPayment.pop(taxdetails);
								}
							},
							
							$scope.addTaxPayment = function(actionType) {
								if (actionType == 'Edit' && editTaxPayment <= 0) {
									GenericAlertService.alertMessage(
											"Please select alteast one row to modify",
											'Warning');
									return;
								} else {
									var popupDetails = TaxPaymentFactory
											.taxPaymentPopupDetails(actionType,
													editTaxPayment);
									popupDetails
											.then(
													function(data) {
														$scope.taxPaymentDetails = data.taxPaymentDetailsTOs;
														editTaxPayment = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting  Details",
																		'Info');
													})
								}
							},
							
							
						/*	
							
							$scope.addTaxPayment = function(actionType) {
								if (actionType == 'Edit' && editTaxPayment <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');

								} else if ($scope.payDeductionSearch !== undefined
										&& $scope.payDeductionSearch != null) {
									var popupDetails = TaxPaymentFactory
											.taxPaymentPopupDetails(actionType,
													editTaxPayment);
									popupDetails
											.then(
													function(data) {
														$scope.taxPaymentDetails = data.taxPaymentDetailsTOs;
														editTaxPayment = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Tax Payment details",
																		'Info');
													})
								}
							},*/
							$scope.deleteTaxPayment = function() {
								if (editTaxPayment.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.taxPaymentDetails = [];
								} else {
									angular.forEach(editTaxPayment, function(
											value, key) {
										if (value.id) {
											deleteIds.push(value.id);
										}
									});
									var req = {
										"paymentReceiverIds" : deleteIds,
										"status" : 2
									};
									TaxPaymentService
											.deleteTaxPayment(req)
											.then(
													function(data) {
														GenericAlertService
																.alertMessage(
																		'Tax Payment Details are  Deactivated successfully',
																		'Info');
													});

									angular
											.forEach(
													editTaxPayment,
													function(value, key) {
														$scope.taxPaymentDetails
																.splice(
																		$scope.taxPaymentDetails
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Plants Details are failed to Deactivate',
																		"Error");
													});
									editTaxPayment = [];
									$scope.deleteIds = [];

								}
							}
				});
