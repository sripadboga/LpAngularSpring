'use strict';

app
		.factory(
				'ProjPlantFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjectSettingsService, ProjPlantClassService,
						GenericAlertService) {
					var projPlantPopup;
					var service = {};
					service.plantPopupDetails = function(actionType, projId,
							editPlant) {
						var deferred = $q.defer();
						projPlantPopup = ngDialog
								.open({

									template : 'views/projectsettings/plantspopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedPlants = [];
												$scope.plantsList = [];
												if (actionType === 'Add') {

													$scope.plantsList
															.push({
																'projId' : $scope.projId,
																'originalQty' : null,
																'revisedQty' : null,
																'actualQty' : null,
																'remainingQty' : null,
																"projPlantClassTO" : {
																	id : null,
																	code : null,
																	name : null,
																	"plantClassTO" : {
																		id : null,
																		code : null,
																		name : null
																	},
																	"measureUnitTO" : {
																		id : null,
																		code : null,
																		name : null
																	}
																},
																'estimateComplete' : null,
																'estimateCompletion' : null,
																'startDate' : null,
																'finishDate' : null,
																'status' : 1
															});
												} else {
													$scope.plantsList = angular
															.copy(editPlant);
													editPlant = [];
												}
												
												$scope.calcRemainingUnits = function(
														budgetObj
														) {
													if (budgetObj.revisedQty != undefined
															&& budgetObj.revisedQty > 0) {
														
														budgetObj.remainingQty = budgetObj.revisedQty
																- budgetObj.actualQty;
														return budgetObj.remainingQty;
													} else {
														budgetObj.remainingQty = budgetObj.originalQty
																- budgetObj.actualQty;
														return budgetObj.remainingQty;
													}
												}
												
												var plantService = {};
												$scope.plantsDetails = function(
														tab) {
													var projPlantsPopup = plantService
															.getPlantDetails();
													projPlantsPopup
															.then(
																	function(
																			data) {
																		tab.projPlantClassTO = data.projPlantClassTO;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting project plant class Details",
																						'Error');
																	});
												}

												plantService.getPlantDetails = function() {
													var deferred = $q.defer();
													ngDialog
															.open({
																template : 'views/projectsettings/plantslist.html',
																closeByDocument : false,
																showClose : true,
																controller : [
																		'$scope',
																		function(
																				$scope) {

																			$scope.projPlantClassDetails = [];

																			$scope.getProjPlantClassDetails = function() {
																				var req = {
																					"status" : 1,
																					"projId" : $rootScope.projId
																				}
																				ProjPlantClassService
																						.getProjPlantClasses(
																								req)
																						.then(
																								function(
																										data) {
																									$scope.projPlantClassDetails = data.projPlantClassTOs;
																								});
																			}
																			$scope.projPlantClassPopUp = function(
																					projPlantClassTO) {
																				var returnProjPlantClassTO = {
																					"projPlantClassTO" : projPlantClassTO
																				};
																				deferred
																						.resolve(returnProjPlantClassTO);
																				$scope
																						.closeThisDialog();

																			}
																		} ]
															});
													return deferred.promise;
												}

														$scope.addRows = function() {

															$scope.plantsList
																	.push({
																		'projId' : $scope.projId,
																		'originalQty' : '',
																		'revisedQty' : '',
																		'actualQty' : '',
																		'remainingQty' : '',
																		'estimateComplete' : '',
																		'estimateCompletion' : '',
																		'startDate' : '',
																		'finishDate' : '',
																		'status' : 1

																	});
														},
														$scope.savePlants = function() {
															var req = {
																"projectPlantsDtlTOs" : $scope.plantsList,
																"projId" : $scope.projId
															}
															ProjectSettingsService
																	.saveProjectPlants(
																			req)
																	.then(
																			function(
																					data) {

																				var succMsg = GenericAlertService
																						.alertMessage(
																								'Plants Details are saved Successfully',
																								'Info');
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Plants Details  are failed to save',
																								"Error");
																			});
															ngDialog.close();
														},

														$scope.plantsPopUpRowSelect = function(
																plants) {
															if (plants.selected) {
																selectedPlants
																		.push(plants);
															} else {
																selectedPlants
																		.pop(plants);
															}
														},
														$scope.deleteProjRows = function() {
															if (selectedPlants.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPlants.length < $scope.plantsList.length) {
																angular
																		.forEach(
																				selectedPlants,
																				function(
																						value,
																						key) {
																					$scope.plantsList
																							.splice(
																									$scope.plantsList
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedPlants = [];
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
