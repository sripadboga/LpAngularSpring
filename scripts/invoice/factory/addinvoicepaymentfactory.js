'use strict';

app
		.factory(
				'InvoiceWisePaymentFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						InvoiceService, GenericAlertService) {
					var InvoiceWisePaymentPopUp;
					var service = {};
					service.invoicePaymentDetails = function(actionType,
							projId, itemId) {
						var deferred = $q.defer();
						InvoiceWisePaymentPopUp = ngDialog
								.open({
									template : 'views/invoice/addpaymentwiseitempopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.invoicePaymentList = [];
												var editInvoicePayment = [];
												var selectedInvoiceList = [];
												if (actionType === 'Add') {
													$scope.invoicePaymentList
															.push({
																'selected' : false,
																'status' : 1,
																"itemId" : itemId,
																'invoiceDate' : null,
																'invoiceNumber' : null,
																'invoiceAmount' : null,
																'taxAmount' : null,
																'totalInvoiceAmount' : null,
																'paymentInDays' : null,
																'paymentDueDate' : null,
																'paymentStatus' : null,
																'actualPaymentDate' : null,
																'paymentRefNumber' : null,
																'costAccruals' : null,
																'amountPaid_Excl' : null,
																'amountPaid_Incl' : null
															});
												} else {
													$scope.invoicePaymentList = angular
															.copy(editInvoicePayment);
													editInvoicePayment = [];
												}
														$scope.addRows = function() {
															$scope.invoicePaymentList
																	.push({
																		'selected' : false,
																		'status' : 1,
																		"itemId" : itemId,
																		'invoiceDate' : null,
																		'invoiceNumber' : null,
																		'invoiceAmount' : null,
																		'taxAmount' : null,
																		'totalInvoiceAmount' : null,
																		'paymentInDays' : null,
																		'paymentDueDate' : null,
																		'paymentStatus' : null,
																		'actualPaymentDate' : null,
																		'paymentRefNumber' : null,
																		'costAccruals' : null,
																		'amountPaid_Excl' : null,
																		'amountPaid_Incl' : null
																	});
														},
														$scope.saveInvoiceList = function() {
															var saveInvoiceListReq = {
																"invoiceListTOs" : $scope.invoicePaymentList
															};
															console
																	.log(JSON
																			.stringify(saveInvoiceListReq));
															InvoiceService
																	.saveInvoiceList(
																			saveInvoiceListReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Project Invoice(s) are saved succuessfully',
																								"Info");
																				var returnPopObj = {
																					"invoiceListTOs" : data.invoiceListTOs
																				};
																				$scope.invoicePaymentList = [];
																				deferred
																						.resolve(returnPopObj);
																				$scope
																						.closeThisDialog();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Project Invoice(s) are failed to save',
																								"Error");
																			});
														},
														$scope.popUpRowSelect = function(
																invoicePayment) {
															if (invoicePayment.selected) {
																selectedInvoiceList
																		.push(invoicePayment);
															} else {
																selectedInvoiceList
																		.pop(invoicePayment);
															}
														},
														$scope.deleteRows = function() {
															if (selectedInvoiceList.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedInvoiceList.length < $scope.invoicePaymentList.length) {
																angular
																		.forEach(
																				selectedInvoiceList,
																				function(
																						value,
																						key) {
																					$scope.invoicePaymentList
																							.splice(
																									$scope.invoicePaymentList
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedInvoiceList = [];
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