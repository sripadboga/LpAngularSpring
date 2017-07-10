'use strict';

app
		.factory(
				'PurchaseOrderWisePaymentFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,InvoiceService,
						GenericAlertService) {
					var POWisePaymentPopUp;
					var service = {};
					service.purchaseOrderPaymentDetails = function(actionType,
							projId, itemId) {
						var deferred = $q.defer();
						POWisePaymentPopUp = ngDialog
								.open({
									template : 'views/invoice/addpurchaseorderwiseitempopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.POPaymentList = [];
												var selectedPOList = [];
												var editPOPayment = [];
												if (actionType === 'Add') {
													$scope.POPaymentList
															.push({
																'selected' : false,
																'status' : 1,
																"itemId" : itemId,
																'pOCumulativeAmt' : null,
																'pOCostAccruals' : null,
																'pOPaidAmount' : null,
																'pOBalanceAmount' : null,
																'pOAdminCostAccruals' : null,
																'pOAdminPaidAmount' : null,
																'pOServiceCostAccruals' : null,
																'pOServiceCostAccruals' : null,
															});
												} else {
													$scope.POPaymentList = angular
															.copy(editPOPayment);
													editPOPayment = [];
												}
														$scope.addRows = function() {
															$scope.POPaymentList
																	.push({
																		'selected' : false,
																		'status' : 1,
																		"itemId" : itemId,
																		'pOCumulativeAmt' : null,
																		'pOCostAccruals' : null,
																		'pOPaidAmount' : null,
																		'pOBalanceAmount' : null,
																		'pOAdminCostAccruals' : null,
																		'pOAdminPaidAmount' : null,
																		'pOServiceCostAccruals' : null,
																		'pOServiceCostAccruals' : null,
																	});
														},
														$scope.savePOPaymentList = function() {
															var savePOPaymentReq = {
																"POPaymentTOs" : $scope.POPaymentList,
																"projId" : $scope.projId
															}
															console
																	.log(JSON
																			.stringify(savePOPaymentReq));
															InvoiceService
																	.savePOPaymentList(
																			savePOPaymentReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Purchase Wise Payment(s) are saved succuessfully',
																								"Info");
																				var returnPopObj = {
																					"POPaymentTOs" : data.POPaymentTOs
																				};
																				$scope.POPaymentList = [];
																				deferred
																						.resolve(returnPopObj);
																				$scope
																						.closeThisDialog();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Purchase Wise Payment(s) are failed to save',
																								"Error");
																			});
														},

														$scope.popUpRowSelect = function(
																POPayment) {
															if (POPayment.selected) {
																selectedPOList
																		.push(POPayment);
															} else {
																selectedPOList
																		.pop(POPayment);
															}
														},
														$scope.deleteRows = function() {
															if (selectedPOList.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPOList.length < $scope.POPaymentList.length) {
																angular
																		.forEach(
																				selectedPOList,
																				function(
																						value,
																						key) {
																					$scope.POPaymentList
																							.splice(
																									$scope.POPaymentList
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedPOList = [];
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