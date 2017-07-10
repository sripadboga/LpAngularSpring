'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"plant",
									{
										url : '/plant',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/centrallib/plantclass/plantclass.html',
												controller : 'PlantClassController'
											}
										}
									})
				})
		.controller(
				"PlantClassController",
				function($rootScope, $q, $scope, $state, ngDialog,
						PlantClassService, MeasureService, GenericAlertService) {
					$scope.central = {};
					$scope.plantClassification = [];
					$scope.deletecodes = [];
					var deferred = $q.defer();
					$scope.plantReq = {
						"plantCode" : null,
						"plantName" : null,
						"status" : "1"
					};
					var editplantClassification = [];
							
					$scope.activeFlag = 0;
					$scope.plantSearch = function() {
						PlantClassService
								.getPlantClasses($scope.plantReq)
								.then(
										function(data) {
											$scope.activeFlag = 0;
											$scope.plantClassification = data.plantClassTOs;
											if ($scope.plantClassification != null
													&& $scope.plantClassification.length > 0) {
												if ($scope.plantClassification[0].status == 1) {
													$scope.activeFlag = 1;
												} else if ($scope.plantClassification[0].status == 2) {
													$scope.activeFlag = 2;
												}
											}
											else{
												GenericAlertService
												.alertMessage(
														'Plants  are not available for given search criteria',
														"Warning");
											}
										});
					},
					$scope.reset = function() {
								$scope.plantReq = {
									"plantCode" : null,
									"plantName" : null,
									"status" : "1"
								}
								$scope.activeFlag = 0;
								$scope.plantSearch();
							},

							$scope.rowSelect = function(central) {
								if (central.selected) {
									editplantClassification.push(central);
								} else {
									editplantClassification.pop(central);
								}
							}
					var service = {};
					var plantPopUp;
					$scope.plantUnits = function(actionType) {
						plantPopUp = service.addPlantUnits(actionType);
						plantPopUp
								.then(
										function(data) {
											$scope.plantClassification = data.plantClassTOs;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting Plant details",
															'Error');
										});
					}
							service.addPlantUnits = function(actionType) {
								if (actionType == 'Edit'
										&& editplantClassification <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								}
								plantPopUp = ngDialog
										.open({
											template : 'views/centrallib/plantclass/plantclasspopup.html',
											className : 'ngdialog-theme-plain ng-dialogueCustom4',
											scope : $scope,
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														$scope.plantUnits = [];
														var selectedPlant = [];
														$scope.action = actionType;
														$scope.plantUnits = [];
														$scope.proCategory = [];
														if (actionType === 'Add') {
															$scope.plantUnits
																	.push({
																		"code" : '',
																		"name" : '',
																		"measureUnitTO.name" : '',
																		"status" : 1,
																		"selected" : false
																	});
														} else {
															$scope.plantUnits = angular
																	.copy(editplantClassification)
															editplantClassification = [];
														}
														$scope.getMeasuresByProcureType = function() {
															var req = {
																"status" : 1,
																"procureClassId" : 2
															};
															MeasureService
																	.getMeasuresByProcureType(
																			req)
																	.then(
																			function(
																					data) {
																				$scope.proCategory = data.measureUnitTOs;
																			});
														},
																$scope.updatePlantCode = function(
																		data,
																		central) {
																	
																	central.measureId = data.id;
																},
																$scope.addRows = function() {
																	$scope.plantUnits
																			.push({
																				"code" : '',
																				"name" : '',
																				"measureUnitTO.name" : '',
																				"status" : 1,
																				"selected" : false
																			});
																}
																$scope.savePlantClasses = function() {
																	var plantClassMap=[];
																	angular.forEach($scope.plantUnits,function(value,key) {
																						if(plantClassMap[value.code]!=null){
																							GenericAlertService.alertMessage('Duplicate Plant Codes  are not allowed',"Error");
																							forEach.break();
																							}else
																								{
																								plantClassMap[value.code]=true;
																								}
																					});
																	var req = {
																		"plantClassTOs" : $scope.plantUnits
																	}
																	var results = [];
																	PlantClassService
																			.savePlantClasses(
																					req)
																			.then(
																					function(
																							data) {
																						results = data.plantClassTOs;
																						var succMsg = GenericAlertService
																								.alertMessageModal(
																										'Plant Classification Details '
																												+ data.message,
																										data.status);
																						succMsg
																								.then(function(
																										data1) {
																									var returnPopObj = {
																										"plantClassTOs" : results
																									}
																									deferred
																											.resolve(returnPopObj);
																								})
																					},
																					function(
																							error) {
																						GenericAlertService
																								.alertMessage(
																										'Plant Classification Details  are failed to save',
																										"Error");
																					});
																	ngDialog
																			.close();
																},
																$scope.popUpRowSelect = function(
																		central) {
																	if (central.selected) {
																		selectedPlant
																				.push(central);
																	} else {
																		selectedPlant
																				.pop(central);
																	}
																},
																$scope.deleteRows = function() {
																	if (selectedPlant.length == 0) {
																		GenericAlertService
																				.alertMessage(
																						'Please select atlist one row to delete',
																						"Warning");
																	}
																	if (selectedPlant.length < $scope.plantUnits.length) {
																		angular
																				.forEach(
																						selectedPlant,
																						function(
																								value,
																								key) {
																							$scope.plantUnits
																									.splice(
																											$scope.plantUnits
																													.indexOf(value),
																											1);
																		
																						});
																		selectedPlant = [];
																		GenericAlertService.alertMessage('Rows are Deleted successfully',"Info");
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
							$scope.activePlantClasses= function() {
								if (editplantClassification.length <= 0) {
									GenericAlertService.alertMessage("please select records to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.plantClassification = [];
								} else {
									angular.forEach(editplantClassification, function(value,key) {			
											deleteIds.push(value.id);				
									});
									var req = {
										"plantClassIds" : deleteIds,
										"status":1
									};
									PlantClassService.deletePlantClasses(req).then(function(data) {
											});
									angular.forEach(editplantClassification, function(value,key) {
										GenericAlertService.alertMessage('Plant Classification Details are  Activated successfully','Info');
										$scope.plantClassification.splice($scope.plantClassification.indexOf(value), 1);									
									},
									function(error) {
										GenericAlertService.alertMessage('Plant Classification Details  are failed to Activate',"Error");
									});
									editplantClassification = [];
									$scope.deleteIds = [];
								}
							}
							$scope.deletePlantClasses= function() {
								if (editplantClassification.length <= 0) {
									GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.plantClassification = [];
								} else {
									angular.forEach(editplantClassification, function(value,key) {			
											deleteIds.push(value.id);				
									});
									var req = {
										"plantClassIds" : deleteIds,
										"status":2
									};
									PlantClassService.deletePlantClasses(req).then(function(data) {
											});
									angular.forEach(editplantClassification, function(value,key) {
										GenericAlertService.alertMessage('Plant Classification Details are  Deactivated successfully','Info');
										$scope.plantClassification.splice($scope.plantClassification.indexOf(value), 1);									
									},
									function(error) {
										GenericAlertService.alertMessage('Plant Classification Details  are failed to Deactivate',"Error");
									});
									editplantClassification = [];
									$scope.deleteIds = [];
								}
							}
					return service;
				});
