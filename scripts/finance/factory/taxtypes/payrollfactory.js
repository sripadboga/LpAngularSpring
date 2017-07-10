'use strict';

app
		.factory(
				'PayRollFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,PayRollService,
						 GenericAlertService) {
					var payRollPopup;
					var selectedPayRoll = [];
					var service = {};
					service.payRollPopupDetails = function(actionType,
							editPayRoll) {
						var deferred = $q.defer();
						payRollPopup = ngDialog
								.open({

									template : 'views/centrallib/finance/payrollpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedPayRoll = [];
												$scope.addPayRoll = [];
												if (actionType === 'Add') {
													$scope.addPayRoll
															.push({
																'selected':false, 
																'type' : null,
																'catg' : null,
																'payRollCycle' : null,
																'notes' : null
															});
												} else {
													$scope.addPayRoll = angular
															.copy(editPayRoll);
													editPayRoll = [];
												}
												
											

														$scope.addRows = function() {

															$scope.addPayRoll
																	.push({
																		'selected':false, 
																		'type' : null,
																		'catg' : null,
																		'payRollCycle' : null,
																		'notes' : null

																	});
														},
														$scope.savePayRoll = function() {
															var req = {
																"payRollTOs" : $scope.addPayRoll,
															}
															PayRollService
																	.savePayRoll(
																			req)
																	.then(
																			function(
																					data) {

																				var succMsg = GenericAlertService
																						.alertMessage(
																								' Details are saved Successfully',
																								'Info');
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								' Details  are failed to save',
																								"Error");
																			});
															ngDialog.close();
														},

														$scope.payRollPopupRowSelect = function(
																payRoll) {
															if (payRoll.selected) {
																selectedPayRoll
																		.push(payRoll);
															} else {
																selectedPayRoll
																		.pop(payRoll);
															}
														},
														$scope.deleteRows = function() {
															if (selectedPayRoll.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPayRoll.length < $scope.addPayRoll.length) {
																angular
																		.forEach(
																				selectedPayRoll,
																				function(
																						value,
																						key) {
																					$scope.addPayRoll
																							.splice(
																									$scope.addPayRoll
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedPayRoll = [];
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