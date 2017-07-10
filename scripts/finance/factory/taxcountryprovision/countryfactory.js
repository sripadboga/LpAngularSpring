'use strict';

app
		.factory(
				'TaxCountryFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						TaxCodeCountryService,RegularPayservice, NonRegularPayService,GenericAlertService) {
					var getCountry;
					var service = {};
					service.getCountryDetails = function() {
						var deferred = $q.defer();
						ngDialog
								.open({
									template : 'views/finance/taxcountryprovision/countrypopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.countryDetails = [];
												$scope.getCountryDetails = function() {
													var req = {
														"status" : 1
													}
													TaxCodeCountryService
															.getCountryDetails(
																	req)
															.then(
																	function(
																			data) {
																		$scope.countryDetails = data.countryTOs;
																	});
												}
												$scope.projcountryPopUp = function(
														selectedCountry) {
													var req = {
														"countryId" : selectedCountry.id,
														"status" : 1
													};
													TaxCodeCountryService
															.getCountryDetailsById(
																	req)
															.then(
																	function(
																			data) {
																		var returnCountryObj = {
																				"selectedCountry" : data.countryTOs[0]
																			};
																		deferred
																				.resolve(returnCountryObj);
																		$scope
																				.closeThisDialog();
																	});

												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
