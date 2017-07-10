'use strict';
app
		.factory(
				'TaxCodeFactory',
				function(ngDialog, $q, $filter, $timeout, TaxCodeService,
						GenericAlertService) {
					var taxCodePopUp;
					var service = {};
					service.taxcodePopUpDetails = function(actionType,
							editTaxCode) {
						var deferred = $q.defer();
						taxCodePopUp = ngDialog
								.open({
									template : 'views/finance/taxcodes/taxcodepopup.html',

									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedTaxCode = [];
												$scope.taxcodeList = [];

												if (actionType === 'Add') {
													$scope.taxcodeList.push({
														"selected" : false,
														"code" : '',
														"name" : '',
														"taxType" : '',
														"status" : '1'

													});
												} else {
													$scope.taxcodeList = angular
															.copy(editTaxCode);
													editTaxCode = [];
												}

														$scope.addTaxCodeRows = function() {
															$scope.taxcodeList
																	.push({
																		"selected" : false,
																		"code" : '',
																		"name" : '',
																		"taxType" : '',
																		"status" : '1'

																	});
														},

														$scope.taxcodePopUpRowSelect = function(
																taxcode) {
															if (taxcode.selected) {
																selectedTaxCode
																		.push(taxcode);
															} else {
																selectedTaxCode
																		.pop(taxcode);
															}
														},
														$scope.deleteProjRows = function() {
															if (selectedTaxCode.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedTaxCode.length < $scope.taxcodeList.length) {
																angular
																		.forEach(
																				selectedTaxCode,
																				function(
																						value,
																						key) {
																					$scope.taxcodeList
																							.splice(
																									$scope.taxcodeList
																											.indexOf(value),
																									1);

																				});
																selectedTaxCode = [];
																GenericAlertService
																		.alertMessage(
																				'Rows are deleted Successfully',
																				"Info");
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
												$scope.saveTaxCodes = function() {
													var req = {
														"taxCodesTOs" : $scope.taxcodeList
													}
													TaxCodeService
															.saveTaxCodes(req)
															.then(
																	function(
																			data) {
																		var returnPopObj = {
																			"taxCodesTOs" : data.taxCodesTOs
																		};
																		deferred
																				.resolve(returnPopObj);
																		$scope
																				.closeThisDialog();
																		GenericAlertService
																				.alertMessage(
																						'TaxCode  Details are  '
																								+ data.message,
																						data.status);
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'TaxCode  Details are Failed to Save ',
																						"Error");
																	});
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
