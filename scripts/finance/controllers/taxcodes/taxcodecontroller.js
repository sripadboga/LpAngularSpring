'use strict';
app
		.config(function($stateProvider) {
			$stateProvider.state("taxcodes", {
				url : '/taxcodes',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/finance/taxcodes/taxcodes.html',
						controller : 'TaxCodeController'
					}
				}
			})
		})
		.controller(
				"TaxCodeController",
				function($scope, $q, $state, ngDialog, $rootScope,
						TaxCodeFactory, ProjectSettingsService, TaxCodeService,
						GenericAlertService) {
					var service = {}

					$scope.taxDetails = [];

					var taxcodeReq = {
						"status" : 1,
						"code" : null
					};
							$scope.getTaxDetails = function() {
								TaxCodeService
										.getTaxCodes(taxcodeReq)
										.then(
												function(data) {
													$scope.taxDetails = data.taxCodesTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting taxcode Details",
																	"Error");
												});
							},

							$scope.taxcodecalculation = [];

					var editTaxCode = [];
					var tax = [];

							$scope.taxcoderowselect = function(taxcode) {
								if (taxcode.selected) {
									editTaxCode.push(taxcode);
								} else {
									editTaxCode.pop(taxcode);
								}
							},
							$scope.addTaxCode = function(actionType) {

								if (actionType == 'Edit' && editTaxCode <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else {
									var taxDetails = TaxCodeFactory
											.taxcodePopUpDetails(actionType,
													editTaxCode);
									taxDetails
											.then(
													function(data) {
														$scope.taxDetails = data.taxCodesTOs;
														editTaxCode = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting  Details",
																		'Info');
													})
								}
							}

					$scope.deteteTaxCode = function() {
						if (editTaxCode.length <= 0) {
							GenericAlertService
									.alertMessage(
											"Please select alteast one row to Deactivate",
											'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.tax = [];
						} else {
							angular.forEach(editTaxCode, function(value, key) {
								if (value.id) {
									deleteIds.push(value.id);
								}
							});
							var req = {
								"taxIds" : deleteIds,
								"status" : 2
							};
							TaxCodeService
									.deactivateTaxCodes(req)
									.then(
											function(data) {
												$scope.taxDetails = data.taxCodesTOs;
												editTaxCode = [];
												$scope.deleteIds = [];
												GenericAlertService
														.alertMessage(
																'Pay deduction Details are  Deactivated successfully',
																'Info');

											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plants Details are failed to Deactivate',
																"Error");
											});

						}
					}

				});
