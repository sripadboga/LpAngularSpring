'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:CreateWorkDairyController
 * @description # Module Controller of the potApp
 */
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"createworkdairy",
									{
										url : '/createworkdairy',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/timemanagement/workdairy/createworkdairy/createworkdairy.html',
												controller : 'CreateWorkDairyController'
											}
										}
									})
				})
		.controller(
				'CreateWorkDairyController',
				function($scope, $state, ngDialog, UserEPSProjectService,
						UserService, $rootScope, ManpowerFactory, PlantFactory,
						MaterialFactory, ProjectCrewPopupService,
						CreateWorkShiftPopupFactory, CreateWorkDiaryService,
						EmpRegisterPopUpService, ApproverPersonFactory,
						WeatherService, CreateWeatherPopupFactory,
						WorkDairyCostCodeFactory, ProgressFactory,
						GenericAlertService) {
					$scope.currentTab = null;
					var editMans = [];
					$scope.man = [];
					$scope.deleteIds = [];
					$scope.plant = [];
					$scope.mans = [];
					var editPlants = [];
					$scope.matestore = [];
					var editMatestores = [];
					$scope.progress = [];
					var editProgress = [];
					$scope.workDairyCostCodeMap = [];
					$scope.workDairyCostCodeList = [ {
						"id" : null,
						"code" : null,
						"name" : null,
						"select" : false
					} ];
					$scope.workDairySearchReq = {
						"projectLabelKeyTO" : {
							"projId" : null,
							"parentName" : null,
							"projName" : null

						},
						"crewLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null

						},
						"weatherLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null

						},
						"shiftLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null

						},
						"costLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						},
						"userLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null

						},
						"workDairyDate" : null
					};

							$scope.getUserProjects = function(projectLabelKeyTO) {
								var userProjectSelection = UserEPSProjectService
										.epsProjectPopup();
								userProjectSelection
										.then(
												function(userEPSProjData) {
													projectLabelKeyTO.projId = userEPSProjData.selectedProject.projId;
													projectLabelKeyTO.parentName = userEPSProjData.selectedProject.parentName;
													projectLabelKeyTO.projName = userEPSProjData.selectedProject.projName;

												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting EPS Project name",
																	'Error');
												});
							},
							$scope.getCreateWorkDairySearch = function(projId) {
							
								$rootScope.projId = projId;
								var createGetReq = {
									"projId" : projId,
									"status" : 1
								};
								if ($scope.workDairySearchReq == undefined
										|| projId <= 0
										|| $scope.workDairySearchReq.crewLabelKeyTO == null
										|| $scope.workDairySearchReq.crewLabelKeyTO.id == null
										|| $scope.workDairySearchReq.workDairyDate == null
										
										

								) {
									
									GenericAlertService
											.alertMessage(
													"Please select project,crewList,CostCode and Date",
													'Warning');
									return;
								}
								CreateWorkDiaryService
										.getManpowers(createGetReq)
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting workDairy Details",
																	'Error');

												});

							},
							$scope.resetCreateWorkDairy = function() {
								$scope.workDairySearchReq = {
									"projectLabelKeyTO" : {
										"projId" : null,
										"parentName" : null,
										"projName" : null

									},
									"crewLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null

									},
									"weatherLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null

									},
									"shiftLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null

									},
									"costLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null
									},
									"userLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null

									},
									"workDairyDate" : null
								};
							},
							$scope.getWorkingShiftId = function(projId,
									shiftLabelKeyTO) {
								if (projId == undefined || projId == null) {
									GenericAlertService
											.alertMessage(
													"Please select project to get WorkingShift",
													'Warning');
									return;
								}
								var workshiftPopup = [];
								workshiftPopup = CreateWorkShiftPopupFactory
										.workShiftDetailsList(projId);
								workshiftPopup
										.then(
												function(data) {
													shiftLabelKeyTO.id = data.projWorkShiftTO.id;
													shiftLabelKeyTO.code = data.projWorkShiftTO.code;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting Working Shift Details",
																	'Error');
												});
							},

							$scope.getCrewList = function(projId,
									crewLabelKeyTO) {
								if (projId == undefined || projId == null) {
									GenericAlertService
											.alertMessage(
													"Please select project to get crews",
													'Warning');
									return;
								}

								var crewReq = {
									"status" : 1,
									"projId" : projId

								};

								var crewSerivcePopup = ProjectCrewPopupService
										.getCrewPopup(crewReq);

								crewSerivcePopup
										.then(
												function(data) {
													crewLabelKeyTO.id = data.projCrewTO.id;
													crewLabelKeyTO.code = data.projCrewTO.code;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting Crew List Details",
																	'Error');
												});
							}

							$scope.getWeatherClassId = function(projId,
									weatherLabelKeyTO) {
								if (projId == undefined || projId == null) {
									GenericAlertService
											.alertMessage(
													"Please select project to get Weather",
													'Warning');
									return;
								}
								var weatherPopup = [];
								weatherPopup = CreateWeatherPopupFactory
										.weatherDetailsList(projId);
								weatherPopup
										.then(
												function(data) {
													weatherLabelKeyTO.id = data.weatherTO.id;
													weatherLabelKeyTO.code = data.weatherTO.code;
													weatherLabelKeyTO.name = data.weatherTO.name;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting Weather Details",
																	'Error');
												});
							},
							$scope.approverPerson = function(userLabelKeyTO) {
								var addapproverPersonPopup = [];
								addapproverPersonPopup = ApproverPersonFactory
										.getApprovers();
								addapproverPersonPopup
										.then(
												function(data) {
													userLabelKeyTO.id = data.userListTO.id;
													userLabelKeyTO.name = data.userListTO.firstName;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while adding companies to precontract",
																	'Error');
												});
							},
							$scope.addCostCodeItemsToWorkDairy = function(
									projId) {
								if (projId !== undefined
										&& projId != null) {
								var workDairyCostCodes = $scope.workDairyCostCodeList;
								var costCodepopup = WorkDairyCostCodeFactory
										.getCostCodeDetails(projId,
												workDairyCostCodes);
								costCodepopup
										.then(
												function(data) {
													$scope.workDairyCostCodeList = data.projCostItemTOs;
													console
															.log(JSON
																	.stringify($scope.workDairyCostCodeList));
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching costcode details",
																	'Error');
												})
								} else {
									GenericAlertService.alertMessage(
											"Please select project Id",
											'Warning');
								}
							},
							$scope.createWorkDiaryTabs = [
									{
										title : 'Man Power Utilisation',
										url : 'views/timemanagement/workdairy/createworkdairy/manpower.html'
									},
									{
										title : 'plant Utilisation',
										url : 'views/timemanagement/workdairy/createworkdairy/plantsutilisation.html'
									},
									{
										title : 'Material and store Consumption',
										url : 'views/timemanagement/workdairy/createworkdairy/materialandstoreutilisation.html'
									},
									{
										title : 'Progress',
										url : 'views/timemanagement/workdairy/createworkdairy/progress.html'
									} ];

					$scope.currentTab = 'views/timemanagement/workdairy/createworkdairy/manpower.html';
					$scope.onClickTab = function(tab) {
						$scope.currentTab = tab.url;
					}, $scope.isActiveTab = function(tabUrl) {
						return tabUrl == $scope.currentTab;
					},

					$scope.mans = [ {
						"select" : false,
						"resourceId" : '',
						"empRegLableKeyTO" : {
							"code" : null,
							"firstName" : null,
							"lastName" : null,
							
							
						},
						"wageFactorLabelKeyTO" : {
								"id" : null,
								"code" : null,
								"name" : null

							},
					
						"workDairyCostCodeList" : null,
						"total1" : '',
						
						"workDairyCostCodeList" : null,
						"total2" : '',
						"totalAndIdle" : null,
						"comments" : null,
						"approvalPerson" : null
					} ];
					$scope.manpowerRowSelect = function(man) {
						if (man.select) {
							editMans.push(man);
						} else {
							editMans.pop(man);
						}
					}
					$scope.addManpower = function(actionType) {
						if (actionType === 'Edit' && editMans <= 0) {
							GenericAlertService.alertMessage(
									"Please select atleast one row to edit",
									'Warning');
							return;
						}
						// alert(JSON.stringify($rootScope.projId));
						var manpowerPopup = ManpowerFactory
								.manpowerFactoryPopup(actionType, editMans,
										$rootScope.projId,$scope.workDairyCostCodeList);
					
						manpowerPopup
								.then(
										function(data) {
											
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching manpower details",
															'Error');
										});
					}
					$scope.deleteManpower = function() {
						if (editMans.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];

						if ($scope.selectedAll) {
							$scope.manpowerDetails = [];
						} else {
							angular.forEach(editMans, function(value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"manpowerIds" : deleteIds,
								"status" : 2
							};
							ManpowerService.deleteManpowers(req).then(
									function(data) {
									});
							angular
									.forEach(
											editMans,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Manpower Details are  Deactivated successfully',
																'Info');
												$scope.manpowerDetails
														.splice(
																$scope.manpowerDetails
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Manpower Details are failed to Deactivate',
																"Error");
											});
							editMans = [];
							$scope.deleteIds = [];
						}

					}

					/* ==========plant============== */
					$scope.plants = [ {
						"select" : false,
						"resourceId" : '1',
						"rego" : '',
						"description" : '',
						"make" : '',
						"model" : '',
						"unitOfMeasure" : '',
						"mobilisationRate" : '',
						"plantChargeCatg" : '',
						"code11" : '',
						"code12" : '',
						"total1" : '',
						"code21" : '',
						"code22" : '',
						"total2" : '',
						"totalAndIdle" : '',
						"approvalStatus" : ''
					} ];
					$scope.plantRowSelect = function(plant) {
						if (plant.select) {
							editPlants.push(plant);
						} else {
							editPlants.pop(plant);
						}
					}

					$scope.addPlants = function(actionType) {
						if (actionType === 'Edit' && editPlants <= 0) {
							GenericAlertService.alertMessage(
									"Please select atleast one row to edit",
									'Warning');
							return;
						}
						var plantPopup = PlantFactory.plantFactoryPopup(
								actionType, editPlants);
						plantPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching manpower details",
															'Error');
										});
					}

					$scope.deletePlant = function() {
						if (editPlants.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.plantDetails = [];
						} else {
							angular.forEach(editPlants, function(value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"plantIds" : deleteIds,
								"status" : 2
							};
							PlantService.deletePlants(req).then(function(data) {
							});
							angular
									.forEach(
											editPlants,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Plant Details are  Deactivated successfully',
																'Info');
												$scope.plantDetails
														.splice(
																$scope.plantDetails
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant Details are failed to Deactivate',
																"Error");
											});
							editPlants = [];
							$scope.deleteIds = [];
						}

					}

					/* ===========material========== */
					$scope.matestores = [ {
						"select" : false,
						"sourceOfMaterials" : 'a',
						"material" : '',
						"poScheduleItem" : '',
						"purchaseOrder" : '',
						"docketNumber" : '',
						"docketDate" : '',
						"supplier" : '',
						"unitOfMeasure" : '',
						"locationOfDelivery" : '',
						"quantityReceived" : '',
						"rateForUnits" : '',
						"uploadDeliveryDoc" : '',
						"defectsIfAny" : '',
						"code1" : '',
						"code2" : '',
						"totalConsumQty" : '',
						"approvalStatus" : ''
					} ];
					$scope.materialStoreRowSelect = function(matestore) {
						if (matestore.select) {
							editMatestores.push(matestore);
						} else {
							editMatestores.pop(matestore);
						}
					}
					$scope.addMatestores = function(actionType) {
						if (actionType === 'Edit' && editMatestores <= 0) {
							GenericAlertService.alertMessage(
									"Please select atleast one row to edit",
									'Warning');
							return;
						}
						var materialPopup = MaterialFactory
								.materialFactoryPopup(actionType,
										editMatestores);
						materialPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching manpower details",
															'Error');
										});
					}
					$scope.deleteMatestore = function() {
						if (editMatestores.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.materialDetails = [];
						} else {
							angular.forEach(editMatestores,
									function(value, key) {
										deleteIds.push(value.id);
									});
							var req = {
								"materialIds" : deleteIds,
								"status" : 2
							};
							MaterialService.deleteMaterials(req).then(
									function(data) {
									});
							angular
									.forEach(
											editMatestores,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Material Details are  Deactivated successfully',
																'Info');
												$scope.materialDetails
														.splice(
																$scope.materialDetails
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant Details are failed to Deactivate',
																"Error");
											});
							editMatestores = [];
							$scope.deleteIds = [];
						}

					}

					/* ============progress========== */
					$scope.progresses = [ {
						"select" : false,
						"sowItemId" : '',
						"sorItemId" : '',
						"soeItemId" : '',
						"costCodeId" : '',
						"workDescrp" : '',
						"unitOfMeasure" : '',
						"code1" : '',
						"code2" : '',
						"total" : '',
						"approvalStatus" : ''
					} ];
					$scope.progressRowSelect = function(progress) {
						if (progress.select) {
							editProgress.push(progress);
						} else {
							editProgress.pop(progress);
						}
					}

					$scope.addProgress = function(actionType) {
						if (actionType === 'Edit' && editProgress <= 0) {
							GenericAlertService.alertMessage(
									"Please select atleast one row to edit",
									'Warning');
							return;
						}
						var progressPopup = ProgressFactory
								.progressFactoryPopup(actionType, editProgress);
						progressPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching manpower details",
															'Error');
										});
					}
					$scope.deleteProgress = function() {
						if (editProgress.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.progressDetails = [];
						} else {
							angular.forEach(editProgress, function(value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"progressIds" : deleteIds,
								"status" : 2
							};
							ProgressService.deleteProgress(req).then(
									function(data) {
									});
							angular
									.forEach(
											editProgress,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Progress Details are  Deactivated successfully',
																'Info');
												$scope.progressDetails
														.splice(
																$scope.progressDetails
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant Details are failed to Deactivate',
																"Error");
											});
							editProgress = [];
							$scope.deleteIds = [];
						}

					}

				});