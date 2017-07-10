'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"taxcodesettings",
									{

										url : '/taxcodesettings',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcountryprovision/taxcodecountry.html',
												controller : 'TaxCodeCountryController'
											}
										}
									})
				})
		.controller(
				"TaxCodeCountryController",
				function($scope, $q, $state, ngDialog, TaxCodeCountryFactory,
						TaxCountryFactory, TaxCodeCountryService,CountryProvisionFactory,
						GenericAlertService) {
					var editTaxCountry = [];
					$scope.taxCodeCountryProvisions = [];
					$scope.countryProvision = {};
					$scope.provisions = [];
					$scope.getTaxCodeCountryProvisions = function(taxId) {
						var getTaxReq = {
							"taxId" : taxId,
							"status" : '1'
						};
						TaxCodeCountryService
								.getTaxCodeCountryProvisions(getTaxReq)
								.then(
										function(data) {
											$scope.taxCodeCountryProvisions = data.taxCodeCountryProvisionTOs;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while getting taxcode  Details",
															"Error");
										});
					}

							$scope.taxrowselect = function(tax) {
								if (tax.selected) {
									editTaxCountry.push(tax);
								} else {
									editTaxCountry.pop(tax);
								}
							},
							$scope.addTax = function(actionType) {
								if (actionType == 'Edit' && editTaxCountry <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else {
									var popupDetails = TaxCodeCountryFactory
											.TaxPopUpDetails(actionType,
													editTaxCountry);
									popupDetails
											.then(
													function(data) {
														$scope.taxcode = data.taxCalculationMstrTO;
														editTaxCountry = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting  Details",
																		'Info');
													})
								}
							},
							
							$scope.addCoutryProvisions = function(actionType) {
									var popupDetails = CountryProvisionFactory
											.countryPopUpDetails();
									popupDetails
											.then(
													function(data) {
														$scope.taxcode = data.taxCalculationMstrTO;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting country Details",
																		'Info');
													})
								
							},

							$scope.getCountryDetails = function(
									countryProvisionObj) {
								var popupDetails = TaxCountryFactory
										.getCountryDetails();
								popupDetails
										.then(
												function(data) {
													countryProvisionObj.countryName = data.selectedCountry.name;
													countryProvisionObj.countryId = data.selectedCountry.id;
													$scope.provisions = data.selectedCountry.provisionTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while selecting  Details",
																	'Info');
												})
							},
							$scope.detetePersonalTax = function() {
								if (editTaxCountry.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.taxcode = [];
								} else {
									angular.forEach(editTaxCountry, function(
											value, key) {
										if (value.id) {
											deleteIds.push(value.id);
										}
									});
									var req = {
										"taxCalculationIds" : deleteIds,
										"status" : 2
									};
									PersonalTaxService
											.deletePersonalTaxRates(req)
											.then(
													function(data) {
														GenericAlertService
																.alertMessage(
																		'TaxCountry Details are  Deactivated successfully',
																		'Info');
													});

									angular
											.forEach(
													editTaxCountry,
													function(value, key) {
														$scope.taxcode
																.splice(
																		$scope.taxcode
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'TaxCountry details are failed to Deactivate',
																		"Error");
													});
									editTaxCountry = [];
									$scope.deleteIds = [];

								}
							}

				});