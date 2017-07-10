'use strict';
app
		.factory(
				'CountryProvisionFactory',
				function(ngDialog, $q, $filter, $timeout, GenericAlertService,
						TaxCountryFactory, TaxCodeCountryService) {
					var TaxPopUp;
					var service = {};
					service.countryPopUpDetails = function() {
						var deferred = $q.defer();
						TaxPopUp = ngDialog
								.open({
									template : 'views/finance/taxcountryprovision/countryprovisionpopup.html',

									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
														$scope.getCountryDetails = function() {
															var popupDetails = TaxCountryFactory
																	.getCountryDetails();
															$scope.countryProvisionObj = {};
															popupDetails
																	.then(
																			function(
																					data) {
																				$scope.countryProvisionObj.name = data.selectedCountry.name;
																				$scope.countryProvisionObj.countryId = data.selectedCountry.id;
																				$scope.provisions = data.selectedCountry.provisionTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occurred while selecting country  Details",
																								'Info');
																			})
														},
														$scope.saveCountryProvision = function() {
															var saveReq = {
																"taxCountryProvisionTO" : $scope.provisions
															};
															console
																	.log("savereq"
																			+ JSON
																					.stringify(saveReq));
															TaxCodeCountryService
																	.saveTaxCountryProvision(
																			saveReq)
																	.then(
																			function(
																					data) {

																				var result = data.taxCountryProvisionTO;
																				var message = GenericAlertService
																						.alertMessage('Country Details '
																								+ data.message);

																				var returnPopObj = {
																					"taxCountryProvisionTO" : results
																				};
																				ngDialog
																						.close();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Country Details  are failed to Save',
																								'Error');
																			});
														}

											} ]
								});
						return deferred.promise;
					}
					return service;
				});
