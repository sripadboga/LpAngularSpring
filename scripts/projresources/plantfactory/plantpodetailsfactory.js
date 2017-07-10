'use strict';
app
		.factory(
				'PlantPurchaseOrderDetailsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, PlantPoService) {
					var poDetailsPopUp;
					var service = {};
					service.poDetailsPopUp = function(actionType,
							searchProject, editPoData, purchaseOrder) {
						var deferred = $q.defer();
						poDetailsPopUp = ngDialog
								.open({
									template : 'views/projresources/projplantpo/plantpodetailspopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addPoData = [];
												var selectedPoData = [];
												if (actionType === 'Add') {
													$scope.addPoData
															.push({
																"selected" : false,
																"projId" : searchProject,
																"purchaseLabelKeyTO" : {
																	id : purchaseOrder.purchaseOrderTO.id,
																	code : purchaseOrder.purchaseOrderTO.code,
																	name : null
																},
																"usedItems" : null,
																"actualItems" : null,
																"receivedBy" : null,
																"quantity" : null,
																"cumulative" : null
															});
												} else {
													$scope.addPoData = angular
															.copy(editPoData);
													editPoData = [];
												}

														$scope.addRows = function() {
															$scope.addPoData
																	.push({
																		"selected" : false,
																		"projId" : searchProject,
																		"purchaseLabelKeyTO" : {
																			id : purchaseOrder.purchaseOrderTO.id,
																			code : purchaseOrder.purchaseOrderTO.code,
																			name : null
																		},
																		"usedItems" : null,
																		"actualItems" : null,
																		"receivedBy" : null,
																		"quantity" : null,
																		"cumulative" : null
																	});
														}
														var plantService = {};
														$scope.getPlantTypes = function(
																tab) {
															var projPlantPopup = plantService
																	.getPlantTypeDetails();
															projPlantPopup
																	.then(
																			function(
																					data) {
																				tab.plantTypeTO = data.plantTypeTO;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting project employee class Details",
																								'Error');
																			});
														}
														plantService.getPlantTypeDetails = function() {
															var deferred = $q.defer();
															ngDialog
																	.open({
																		template : 'views/projresources/projplantpo/planttypelist.html',
																		closeByDocument : false,
																		showClose : true,
																		controller : [
																				'$scope',
																				function(
																						$scope) {

																					$scope.projPlantTypeDetails = [];

																					$scope.getPlantTypes = function() {
																						var req = {
																							"status" : 1,
																							"projId" : $rootScope.projId
																						}
																						ProjEmpClassService
																								.getProjEmpClasses(
																										req)
																								.then(
																										function(
																												data) {
																											$scope.projEmpClassDetails = data.projEmpClassTOs;
																										});
																					}
																					$scope.plantTypePopUp = function(
																							projEmpClassTO) {
																						var returnProjEmpClassTO = {
																							"projEmpClassTO" : projEmpClassTO
																						};
																						deferred
																								.resolve(returnProjEmpClassTO);
																						$scope
																								.closeThisDialog();

																					}
																				} ]
																	});
															return deferred.promise;
														}

														$scope.plantDetailsPopUpRowSelect = function(
																plant) {
															if (plant.selected) {
																selectedPoData
																		.push(plant);
															} else {
																selectedPoData
																		.pop(plant);
															}
														},
														$scope.deleteRows = function() {
															if (selectedPoData.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPoData.length < $scope.addPoData.length) {
																angular
																		.forEach(
																				selectedPoData,
																				function(
																						value,
																						key) {
																					$scope.addPoData
																							.splice(
																									$scope.addPoData
																											.indexOf(value),
																									1);
																				});

																selectedPoData = [];
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
												$scope.save = function() {
													var req = {
														"plantProjDtlTOs" : $scope.addPoData,
													}
													PlantPoService
															.savePlantProjectDtls(
																	req)
															.then(
																	function(
																			data) {
																		GenericAlertService
																				.alertMessage(
																						'Plant Registration '
																								+ data.message,
																						data.status);
																		console
																				.log("Save"
																						+ JSON
																								.stringify(selectedPoData));
																		editPoData = [];
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Plant Registration are Failed to Save ',
																						"Error");
																	});
													ngDialog.close();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
