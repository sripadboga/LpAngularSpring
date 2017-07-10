'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"measure",
									{
										url : '/measure',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/centrallib/measure/measurement.html',
												controller : 'MeasureController'
											}
										}
									})
				})
		.controller(
				"MeasureController",
				function($rootScope, $q, $scope, $filter, $state, $location,
						$window, ngDialog, MeasureService, GenericAlertService) {
					var service = {}
					returnedData: [], $scope.measurement = {};
					$scope.measuringUnits = [];
					var deferred = $q.defer();
					$scope.deletecodes = [];
					var editMeasuringUnits = [];
					$scope.proCategory = [];
					$scope.measReq = {
						"mesureCode" : null,
						"mesureName" : null,
						"status" : "1"
					}, $scope.activeFlag = 0;
							$scope.measureSearch = function() {
								MeasureService
										.getMeasurements($scope.measReq)
										.then(
												function(data) {
													$scope.activeFlag = 0;
													$scope.measuringUnits = data.measureUnitTOs;
													if ($scope.measuringUnits != null
															&& $scope.measuringUnits.length > 0) {
														if ($scope.measuringUnits[0].status == 1) {
															$scope.activeFlag = 1;
														} else if ($scope.measuringUnits[0].status == 2) {
															$scope.activeFlag = 2;
														}
													} else {
														GenericAlertService
																.alertMessage(
																		'Measurements  are not available for given search criteria',
																		"Warning");
													}
												});
							}, $scope.reset = function() {
								$scope.measReq = {
									"mesureCode" : null,
									"mesureName" : null,
									"status" : "1"
								}
								$scope.activeFlag = 0;
								$scope.measureSearch();
							}, $scope.rowSelect = function(measurement) {
								if (measurement.selected) {
									editMeasuringUnits.push(measurement);
								} else {
									editMeasuringUnits.pop(measurement);
								}
							}
					var service = {};
					var measurePopUp;
					$scope.addMeasureUnits = function(actionType) {
						measurePopUp = service.addMeasures(actionType);
						measurePopUp
								.then(
										function(data) {
											$scope.measuringUnits = data.measureUnitTOs;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting Measurement  details",
															'Error');
										});
					}
							service.addMeasures = function(actionType) {
								if (actionType == 'Edit'
										&& editMeasuringUnits <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atlist one row to edit',
													"Warning");
									return;
								}
								measurePopUp = ngDialog
										.open({
											template : 'views/centrallib/measure/addmeasurepopup.html',
											scope : $scope,
											className : 'ngdialog-theme-plain ng-dialogueCustom4',
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														$scope.uiDeleteRows = [];
														$scope.action = actionType;
														$scope.measureUnits = [];
														$scope.proCategory = [];
														var selectedMeasureUnits = [];
														var addMeasure = {
															"code" : '',
															"name" : '',
															"status" : "1",
															"procurementTO" : {
																"id" : null,
																"code" : null,
																"name" : null
															},
															"selected" : false
														};
														if (actionType === 'Add') {
															$scope.measureUnits
																	.push(addMeasure);
														} else {
															$scope.measureUnits = angular
																	.copy(editMeasuringUnits)
															editMeasuringUnits = [];
														}
														var req = {
															"status" : 1
														};
														MeasureService
																.getprocures(
																		req)
																.then(
																		function(
																				data) {
																			$scope.proCategory = data.procurementTOs;

																		});
																$scope.updateMeasurementCode = function(
																		data,
																		measurement) {
																	measurement.procureClassId = data.id;

																},
																$scope.addRows = function() {
																	$scope.measureUnits
																			.push(

																			{
																				"code" : '',
																				"name" : '',
																				"status" : "1",
																				"procurementTO" : {
																					"id" : null,
																					"code" : null,
																					"name" : null
																				},
																				"selected" : false
																			});
																},
																$scope.saveMeasurements = function() {
																	var measureUnitsMap=[];
																	angular.forEach($scope.measureUnits,function(value,key) {
																						if(measureUnitsMap[value.code]!=null){
																							GenericAlertService.alertMessage('Duplicate measurement  codes are not allowed',"Error");
																							forEach.break();
																							}else
																								{
																									measureUnitsMap[value.code]=true;
																								}
																					});
																	var req = {
																		"measureUnitTOs" : $scope.measureUnits
																	}

																	MeasureService
																			.saveMeasurements(
																					req)
																			.then(
																					function(
																							data) {
																						var results = data.measureUnitTOs;
																						var succMsg = GenericAlertService
																								.alertMessageModal(
																										'Measurement Details '
																												+ data.message,
																										data.status);
																						succMsg
																								.then(function(
																										data) {
																									var returnPopObj = {
																										"measureUnitTOs" : results
																									}
																									deferred
																											.resolve(returnPopObj);
																								})
																					},
																					function(
																							error) {
																						GenericAlertService
																								.alertMessage(
																										'Measurement Details  are failed to save',
																										"Error");
																					});
																	ngDialog
																			.close();
																},
																$scope.popUpRowSelect = function(
																		measurement) {
																	if (measurement.selected) {
																		selectedMeasureUnits
																				.push(measurement);
																	} else {
																		selectedMeasureUnits
																				.pop(measurement);
																	}
																},
																$scope.deleteRows = function() {
																	if (selectedMeasureUnits.length == 0) {
																		GenericAlertService
																				.alertMessage(
																						'Please select atlist one row to delete',
																						"Warning");
																	}
																	if (selectedMeasureUnits.length < $scope.measureUnits.length) {
																		angular
																				.forEach(
																						selectedMeasureUnits,
																						function(
																								value,
																								key) {
																							$scope.measureUnits
																									.splice(
																											$scope.measureUnits
																													.indexOf(value),
																											1);
																						
																						});
																		selectedMeasureUnits = [];
																		GenericAlertService
																				.alertMessage(
																						'Rows are Deleted successfully',
																						"Info");
																	} else {
																		GenericAlertService
																				.alertMessage(
																						'Please leave atlist one row',
																						"Warning");
																	}
																}
													} ]
										});
								return deferred.promise;

							},
							$scope.activeMeasurements = function() {
								if (editMeasuringUnits.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.measuringUnits = [];
								} else {
									angular.forEach(editMeasuringUnits,
											function(value, key) {
												if (value.id) {
													deleteIds.push(value.id);
												}
											});
									var req = {
										"measureIds" : deleteIds,
										"status" : 1
									};
									MeasureService.deleteMeasurements(req)
											.then(function(data) {
											});
									GenericAlertService
											.alertMessage(
													'Measurement Details are  Activated successfully',
													'Info');
									angular
											.forEach(
													editMeasuringUnits,
													function(value, key) {
														$scope.measuringUnits
																.splice(
																		$scope.measuringUnits
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		' Measurement Details are failed to Activate',
																		"Error");
													});
									editMeasuringUnits = [];
									$scope.deleteIds = [];

								}
							}
					$scope.deleteMeasurements = function() {
						if (editMeasuringUnits.length <= 0) {
							GenericAlertService.alertMessage(
									"Please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.measuringUnits = [];
						} else {
							angular.forEach(editMeasuringUnits, function(value,
									key) {
								if (value.id) {
									deleteIds.push(value.id);
								}
							});
							var req = {
								"measureIds" : deleteIds,
								"status" : 2
							};
							MeasureService.deleteMeasurements(req).then(
									function(data) {
									});
							GenericAlertService
									.alertMessage(
											'Measurement Details are  Deactivated successfully',
											'Info');
							angular
									.forEach(
											editMeasuringUnits,
											function(value, key) {
												$scope.measuringUnits
														.splice(
																$scope.measuringUnits
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																' Measurement Details are failed to Deactivate',
																"Error");
											});
							editMeasuringUnits = [];
							$scope.deleteIds = [];

						}
					}

					return service;
				});
