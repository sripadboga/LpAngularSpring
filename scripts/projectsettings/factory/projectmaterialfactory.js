'use strict';

app
		.factory(
				'ProjMaterialFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,ProjectSettingsService,
						ProjMaterialClassService, GenericAlertService) {
					var projMaterialPopup;
					var service = {};
					service.materialPopupDetails = function(actionType, projId,
							editMaterial) {
						var deferred = $q.defer();
						projMaterialPopup = ngDialog
								.open({

									template : 'views/projectsettings/meterialspopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedMeterials = [];
												$scope.meterialsList = [];
												if (actionType === 'Add') {
													$scope.meterialsList
															.push({
																'projId' : $scope.projId,
																'originalQty' : null,
																'revisedQty' : null,
																'actualQty' : null,
																'remainingQty' : null,
																"projMaterialClassTO" : {
																	id : null,
																	code : null,
																	name : null,
																	"materialSubGroupTO" : {
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
																'schStartDate' : null,
																'schFinishDate' : null,
																'status' : 1
															});
												} else {
													$scope.meterialsList = angular
															.copy(editMaterial);
													editMaterial = [];
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
												
												var materialService = {};
												$scope.meterialsDetails = function(
														tab) {
													var projMaterialsPopup = materialService
															.getMaterialDetails();
													projMaterialsPopup
															.then(
																	function(
																			data) {
																		tab.projMaterialClassTO = data.projMaterialClassTO;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting project material class Details",
																						'Error');
																	});
												}
												materialService.getMaterialDetails = function() {
													var deferred = $q.defer();
													ngDialog
															.open({
																template : 'views/projectsettings/meterialslist.html',
																closeByDocument : false,
																showClose : true,
																controller : [
																		'$scope',
																		function(
																				$scope) {

																			$scope.projMaterialClassDetails = [];

																			$scope.getProjMaterialClassDetails = function() {
																				var req = {
																					"status" : 1,
																					"projId" : $rootScope.projId
																				}
																				ProjMaterialClassService
																						.getProjMaterialClasses(
																								req)
																						.then(
																								function(
																										data) {
																									$scope.projMaterialClassDetails = data.projMaterialClassTOs;
																								});
																			}
																			$scope.projMaterialClassPopUp = function(
																					projMaterialClassTO) {
																				var returnProjMaterialClassTO = {
																					"projMaterialClassTO" : projMaterialClassTO
																				};
																				deferred
																						.resolve(returnProjMaterialClassTO);
																				$scope
																						.closeThisDialog();

																			}
																		} ]
															});
													return deferred.promise;
												}

														$scope.addRows = function() {

															$scope.meterialsList
																	.push({
																		'projId' : $scope.projId,
																		'originalQty' : '',
																		'revisedQty' : '',
																		'actualQty' : '',
																		'remainingQty' : '',
																		'estimateComplete' : '',
																		'estimateCompletion' : '',
																		'schStartDate' : '',
																		'schFinishDate' : '',
																		'status' : 1

																	});
														},
														$scope.saveMeterials = function() {
															var req = {
																"projectMaterialDtlTOs" : $scope.meterialsList,
																"projId" : selectedProject.projId
															}
															console
																	.log(JSON
																			.stringify(req));
															ProjectSettingsService
																	.saveProjectMaterials(
																			req)
																	.then(
																			function(
																					data) {

																				var succMsg = GenericAlertService
																						.alertMessageModal(
																								'Meterials Details are saved Successfully',
																								'Info');
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Meterials Details  are failed to save',
																								"Error");
																			});
															ngDialog.close();
														},

														$scope.meterialsPopUpRowSelect = function(
																meterials) {
															if (meterials.selected) {
																selectedMeterials
																		.push(meterials);
															} else {
																selectedMeterials
																		.pop(meterials);
															}
														},
														$scope.deleteProjRows = function() {
															if (selectedMeterials.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedMeterials.length < $scope.meterialsList.length) {
																angular
																		.forEach(
																				selectedMeterials,
																				function(
																						value,
																						key) {
																					$scope.meterialsList
																							.splice(
																									$scope.meterialsList
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedMeterials = [];
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