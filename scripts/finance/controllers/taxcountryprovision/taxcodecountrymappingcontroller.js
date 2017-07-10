'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"companytax",
									{

										url : '/companytax',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcountryprovision/taxcodecountrymapping.html',
												controller : 'TaxCodeCountryMappingController'
											}
										}
									})
				})
		.controller(
				"TaxCodeCountryMappingController",
				function($scope, $q, $state, ngDialog,
						TaxCodeCountryMappingService, TaxCountryFactory,
						TaxCodeService, TaxCountryMappingFactory,
						TaxCodeCountryService, GenericAlertService) {
					var editCountry = [];
					$scope.taxCodeCountryProvisions = [];
					$scope.countryProvision = {};
					$scope.provisions = [];

					$scope.getTaxDetails = function(taxId) {
						var getTaxReq = {
							"status" : '1',
							"taxId" : taxId
						};
						TaxCodeCountryMappingService
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

							$scope.taxrowselect = function(taxcodemapping) {

								if (taxcodemapping.selected) {
									editCountry.push(taxcodemapping);
								} else {
									editCountry.pop(taxcodemapping);
								}
							},
							$scope.addTaxmapping = function(actionType,
									taxCountryProvisionId) {
								if (actionType == 'Edit' && editCountry <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else {
									var popupDetails = TaxCountryMappingFactory
											.getTaxCodeDetails(
													taxCountryProvisionId,
													editCountry);
									popupDetails
											.then(
													function(data) {

														$scope.taxCodeCountryProvisions = data.taxCodesTOs;

														editCountry = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting  Details",
																		'Info');
													})
								}
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

							$scope.deteteTaxmapping = function() {
								if (editCountry.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {

								} else {
									angular.forEach(editCountry, function(
											value, key) {
										if (value.id) {
											deleteIds.push(value.id);
										}
									});
									var req = {
										"taxIds" : deleteIds,
										"status" : 2
									};
									TaxCodeCountryMappingService
											.deactivateTaxCodeCountryProvisions(
													req)
											.then(
													function(data) {
														$scope.taxCodeCountryProvisions = data.taxCodesTOs;
														editCountry = [];
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