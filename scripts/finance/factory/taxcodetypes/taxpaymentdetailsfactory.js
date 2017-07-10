'use strict';

app
		.factory(
				'TaxPaymentFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope, TaxPaymentService,
						 GenericAlertService) {
					var taxPaymentPopup;
					
					var selectedTaxPayment = [];
					var service = {};
					service.taxPaymentPopupDetails = function(actionType,
							editTaxPayment) {
						var deferred = $q.defer();
						taxPaymentPopup = ngDialog
								.open({

									template : 'views/centrallib/finance/taxpaymentpopup.html',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedTaxPayment = [];
												$scope.addTaxdetails = [];
												if (actionType === 'Add') {
													$scope.addTaxdetails
															.push({
																'selected':false, 
																   "countryId": 1,
														            "provinceId": 1,
																'deptName' : null,
																'regAddr' : null,
																'accNumber' : null,
																'bankName' : null,
																'bankCode' : null,
																'status' : 1
															});
												} else {
													$scope.addTaxdetails = angular
															.copy(editTaxPayment);
													editTaxPayment = [];
												}
														$scope.addRows = function() {

															$scope.addTaxdetails
																	.push({
																		'selected':false, 
																		   "countryId": 1,
																            "provinceId": 1,
																		'deptName' : null,
																		'regAddr' : null,
																		'accNumber' : null,
																		'bankName' : null,
																		'bankCode' : null,
																		'status' : 1

																	});
														},
														
														$scope.saveTaxPayment = function() {
															var saveReq = {
																"taxPaymentDetailsTOs" : $scope.addTaxdetails
																		};
															console.log("savereq"+JSON.stringify(saveReq));
															TaxPaymentService.saveTaxPayment(saveReq)
																	.then(function(data) {
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					alert("data-------"+data);
																					var result = data.taxPaymentDetailsTOs;
																					console.log(JSON.stringify(data.taxPaymentDetailsTOs));
																					var succMsg = GenericAlertService
																							.alertMessageModal(
																									'TaxPayment Details '
																											+ data.message,
																									data.status);
																					succMsg
																							.then(
																									function(
																											popData) {
																										ngDialog
																										.close(taxPaymentPopup);
																										
																										var returnPopObj = {
																											"taxPaymentDetailsTOs" : result
																										};
																										
																										deferred
																												.resolve(returnPopObj);
																										console.log("save"+JSON.stringify(returnPopObj));
																									},
																									function(
																											error) {
																										GenericAlertService
																												.alertMessage(
																														"Error occurred while closing popup",
																														'Info');
																									});
																				}
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'TaxPayment Details  are failed to Save','Error');
																			});
															ngDialog.close();
														},
														
														
														$scope.popupRowSelect = function(
																taxdetails) {
															if (taxdetails.selected) {
																selectedTaxPayment
																		.push(taxdetails);
															} else {
																selectedTaxPayment
																		.pop(taxdetails);
															}
														},
														$scope.deleteRows = function() {
															if (selectedTaxPayment.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedTaxPayment.length < $scope.addTaxdetails.length) {
																angular
																		.forEach(
																				selectedTaxPayment,
																				function(
																						value,
																						key) {
																					$scope.addTaxdetails
																							.splice(
																									$scope.addTaxdetails
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedTaxPayment = [];
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
											} ]

								});
						return deferred.promise;
					}
					return service;
				});

