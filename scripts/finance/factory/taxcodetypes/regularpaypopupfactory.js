'use strict';
app
		.factory(
				'RegularPayPopUpFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						RegularPayservice, GenericAlertService) {
					var regularPayPopup;
					var selectedRegularPay = [];
					var service = {};
					service.regularPayPopupDetails = function(actionType,
							editRegularPay, taxCountryProvisionId) {
						var deferred = $q.defer();
						regularPayPopup = ngDialog
								.open({
									template : 'views/finance/taxcodetypes/regularpaypopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom2',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedRegularPay = [];
												$scope.addregularPayTOs = [];

												if (actionType === 'Add') {
													$scope.addregularPayTOs
															.push({
																'selected' : false,
																'status' : 1,
																"taxCountryProvisionId" : taxCountryProvisionId,
																'code' : null,
																'name' : null,
																'comments' : null,
																'taxStatus' : null,

															});
												} else {
													$scope.addregularPayTOs = angular
															.copy(editRegularPay);
													editRegularPay = [];
												}
														$scope.addRows = function() {

															$scope.addregularPayTOs
																	.push({
																		'selected' : false,
																		'status' : 1,
																		"taxCountryProvisionId" : taxCountryProvisionId,
																		'code' : null,
																		'name' : null,
																		'comments' : null,
																		'taxStatus' : null,

																	});
														},
														$scope.saveregularPayRate = function() {
															var req = {
																"regularPayAllowanceTOs" : $scope.addregularPayTOs,
															}
															console
																	.log(JSON
																			.stringify(req));
															RegularPayservice
																	.saveregularPayRate(
																			req)
																	.then(
																			function(
																					data) {
																				alert("save");
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					alert(JSON
																							.stringify(data));
																					GenericAlertService
																							.alertMessageModal(
																									'RegularPay Details '
																											+ data.message,
																									data.status);
																				}

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Regular Pay Details  are failed to Save',
																								'Error');
																			});
															ngDialog.close();
														};

														$scope.regularPayRatePopupRowSelect = function(
																regularPay) {
															if (regularPay.selected) {
																selectedRegularPay
																		.push(regularPay);
															} else {
																selectedRegularPay
																		.pop(regularPay);
															}
														},
														$scope.deleteRows = function() {
															if (selectedRegularPay.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedRegularPay.length < $scope.addregularPayTOs.length) {
																angular
																		.forEach(
																				selectedRegularPay,
																				function(
																						value,
																						key) {
																					$scope.addregularPayTOs
																							.splice(
																									$scope.addregularPayTOs
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedRegularPay = [];
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