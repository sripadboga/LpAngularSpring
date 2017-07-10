'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"regularpayallowance",
									{
										url : '/regularpayallowance',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/finance/taxcodetypes/taxtype.html',
												controller : 'TaxTypeController'
											}
										}
									})
				})
		.controller(
				"TaxTypeController",
				function($rootScope, $scope, $state, ngDialog,
						TaxCountryFactory, GenericAlertService, RegularPayservice,
						RegularPayFactory) {
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
					}

					$scope.taxTypeTOs = [ {
						"id" : '1',
						"name" : 'Regular-Allowance'
					}, {
						"id" : '2',
						"name" : 'NonRegular-Allowance'
					}, {
						"id" : '3',
						"name" : 'PayRoll'
					}, {
						"id" : '4',
						"name" : 'Pay-Deduction'
					}, {
						"id" : '5',
						"name" : 'Payment-Receiver'
					}, {
						"id" : '6',
						"name" : 'SuperannuationFunds'

					} ]
					$scope.getTypeOfTax = function(taxTypeTO) {
						if (taxTypeTO.id == 1) {
							var taxCountryProvisionId = 1;
							var details = RegularPayFactory
									.getRegularPayDetails(taxCountryProvisionId);
							details
									.then(
											function(data) {
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error occurred while selecting Pay deduction details",
																'Info');
											})

						}
						if (taxTypeTO.id == 2) {
							var taxCountryProvisionId = 1;
							var details = RegularPayFactory
									.getRegularPayDetails(taxCountryProvisionId);
							details
									.then(
											function(data) {
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error occurred while selecting Pay deduction details",
																'Info');
											})

						}
					}

				});
