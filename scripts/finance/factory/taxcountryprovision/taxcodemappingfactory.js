'use strict';

app
		.factory(
				'TaxCountryMappingFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						TaxCodeCountryService, TaxCodeCountryMappingService,
						GenericAlertService, TaxCodeService) {
					var getCountry;
					var taxCodeservice = {};
							taxCodeservice.getTaxCodeDetails = function(
									taxCountryProvsionId, editCountry) {
								var deferred = $q.defer();

								var taxcodeReq = {
									"status" : '1',
									"taxId" : '1'
								};

								TaxCodeService
										.getTaxCodes(taxcodeReq)
										.then(
												function(data) {
													var taxCodeSerivcePopup = taxCodeservice
															.openTaxCodePoupup(
																	data.taxCodesTOs,
																	taxCountryProvsionId);
													taxCodeSerivcePopup
															.then(
																	function(
																			data) {
																		var returnPopObj = {

																			"taxCodesTOs" : data.taxCodesTOs
																		};
																		deferred
																				.resolve(returnPopObj);

																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting Crew List Details",
																						'Error');
																	})

												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting taxcode Details",
																	"Error");
												});
								return deferred.promise;

							},

							taxCodeservice.openTaxCodePoupup = function(
									taxCodesTOs, taxCountryProvsionId,
									editCountry) {
								var deferred = $q.defer();
								ngDialog
										.open({
											template : 'views/finance/taxcountryprovision/taxcodemappingpopup.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {

														var selectedTaxCodes = [];
														$scope.taxmappingDetails = []

														angular
																.forEach(
																		taxCodesTOs,
																		function(
																				value,
																				key) {
																			value.taxCountryProvsionId = taxCountryProvsionId;
																			$scope.taxmappingDetails
																					.push(value);
																		});

														$scope.taxmappingDetails = taxCodesTOs;
																$scope.selectedTaxCodes = function(
																		taxcodemapping) {
																	if (taxcodemapping.selected) {

																		selectedTaxCodes
																				.push(taxcodemapping);
																	} else {
																		selectedTaxCodes
																				.pop(taxcodemapping);
																	}
																},

																$scope.lableKeyTOs = [
																		{

																			"id" : '1',
																			"name" : 'monthly'

																		},
																		{
																			"id" : '2',
																			"name" : 'yearly'
																		},
																		{
																			"id" : '3',
																			"name" : 'halfyearly'
																		},
																		{
																			"id" : '4',
																			"name" : 'quarterly'
																		}

																];

														$scope.saveTaxCodeDetails = function() {
															console.log(JSON.stringify(selectedTaxCodes));
															var req = {
																"taxCodeCountryProvisionTOs" : selectedTaxCodes,
															};

															TaxCodeCountryMappingService
																	.saveTaxCodeCountryProvisions(
																			req)
																	.then(
																			function(
																					data) {

																				var returnPopObj = {

																					"taxCodesTOs" : $scope.taxmappingDetails,

																				}
																				deferred
																						.resolve(returnPopObj);
																				$scope
																						.closeThisDialog();
																			});
														}

													} ]
										});
								return deferred.promise;

							}
					return taxCodeservice;
				});
