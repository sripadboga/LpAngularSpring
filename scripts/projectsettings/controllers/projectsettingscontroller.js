'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state("projsettings", {
				url : '/projsettings',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/projectsettings/projectview.html',
						controller : 'ProjectSettingsController'
					}
				}
			})
		})
		.controller(
				'ProjectSettingsController',
				function($rootScope, $scope, $state, $q,
						ProjectSettingsService, ngDialog, GenericAlertService,
						ModuleService, ProjManPowerFactory, ProjPlantFactory,
						ProjNoteBookFactory, ProjMaterialFactory,
						ProjectCrewPopupService, EpsService,
						ProjectSettingCostItemFactory,
						ProjectSettingSOWItemFactory) {

					$rootScope.projId = null;
					$scope.treeData = [];
					var deferred = $q.defer();

					$scope.moreFlag = 0;
					$scope.currentTab = null;
					$scope.currentTab1 = null;

					$scope.projSummaryTab = null;

					var editManpower = [];
					var editPlants = [];
					var editMeterials = [];
					var editNoteBook = [];
					var selectedPlants = [];
					var selectedManpower = [];
					var selectedMeterials = [];

					$scope.editing = false;
					$scope.supervisors = [];
					$scope.reqNumbers = [];

					$scope.projTabs = [];
					$scope.generalValues = {};
					$scope.responsibleManagers = [];
					$scope.calenders = [];
					$scope.countries = [];
					$scope.currencies = [];
					$scope.timeZones = [];
					$scope.resourceCurves = [];
					$scope.projectOwners = [];
					$scope.attendDetails = [];
					$scope.projWorkDairys = [];
					$scope.projWorkDairysAppr = [];
					$scope.projTimeSheetData = [];
					$scope.projProcureDetails = [];
					$scope.projEmpDetails = [];
					$scope.plantTransDetails = [];
					$scope.MaterialTransDtls = [];
					$scope.projEstimateDetails = [];
					$scope.projReportsDtls = [];
					$scope.projClaimDetails = [];
					$scope.projPayRollDtls = [];
					$scope.costDatamoreFlag = 0;
					$scope.projManpowerDetails = [];
					$scope.projPlantsDetails = [];
					$scope.projMaterialDetails = [];
					$scope.projCostStmtDtls = [];
					$scope.projMeasureDetails = [];

					$scope.measureunits = [];
					$scope.plantunits = [];
					$scope.costunits = [];
					$scope.dateunits = [];
					$scope.tableData = [];

					var getReq = {
						"status" : 1,
						"projId" : null
					};
					$scope.attendAppr = {
						"status" : 1,
						"projId" : null,
						"projCrewLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						}
					};
					$scope.workDiaryAppr = {
						"status" : 1,
						"projId" : null,
						"projWorkDairyCrewLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						},
						"projWorkDairyApprLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						},
						"workDairyId" : null
					};
					$scope.timeSheetAppr = {
						"status" : 1,
						"projId" : null,
						"projtimeSheetCrewLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						},
						"projtimeSheetApprLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						}
					};
					$scope.procureAppr = {
						"status" : 1,
						"projId" : null,
						"projProcureLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						}
					};
					$scope.empTransAppr = {
						"status" : 1,
						"projId" : null,
						"projEmpTransLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						}
					};
					$scope.plantTransAppr = {
						"status" : 1,
						"projId" : null,
						"projPlantTransLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						}
					};
					$scope.materialTransAppr = {
						"status" : 1,
						"projId" : null,
						"projMaterialTransLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						}
					};
							/*---------Project Tabs----------*/

							$scope.onClickTab = function(tab) {
								if ($rootScope.projId) {
									if ($scope.projTabs[6].urlValue == tab.urlValue) {
										$scope
												.clickProjSummaryTab($scope.projTabs[6].childTabs[0]);
										$scope
												.projSummaryActiveTab($scope.projTabs[6].childTabs[0].urlValue);
										$scope.getMeasureUnitsRecords();
									}
									$scope.currentTab = tab.urlValue;
								}

								if ($scope.projTabs[1].urlValue == tab.urlValue) {
									$scope.getManpowerRecords();
								}
								if ($scope.projTabs[2].urlValue == tab.urlValue) {
									$scope.getPlantRecords();
								}
								if ($scope.projTabs[3].urlValue == tab.urlValue) {
									$scope.getMaterialRecords();
								}
								if ($scope.projTabs[4].urlValue == tab.urlValue) {
									$scope.getCostStatementRecords();
								}
								if ($scope.projTabs[5].urlValue == tab.urlValue) {
									$scope.getProjMeasureRecords();
								}
								if ($scope.projTabs[7].urlValue == tab.urlValue) {
									$scope.getProjectStatus();
								}
								if ($scope.projTabs[8].urlValue == tab.urlValue) {
									$scope.getProjNoteBooks();
								}
							},

							/*---------Setting Tabs----------*/

							$scope.onClickTab1 = function(innerTab) {
								if ($scope.projTabs[0].childTabs[1].urlValue === innerTab.urlValue) {
									$scope.currentAttendanceTab = $scope.projTabs[0].childTabs[1].childTabs[0].urlValue;
									$scope.attendOnLoadRecords();
								} else if ($scope.projTabs[0].childTabs[2].urlValue === innerTab.urlValue) {
									$scope.currentWorkTab = $scope.projTabs[0].childTabs[2].childTabs[0].urlValue;
									$scope.workDairyOnLoadRecords();

								} else if ($scope.projTabs[0].childTabs[3].urlValue === innerTab.urlValue) {
									$scope.currentTimeTab = $scope.projTabs[0].childTabs[3].childTabs[0].urlValue;
									$scope.timeSheetOnLoadRecords();
								} else if ($scope.projTabs[0].childTabs[4].urlValue === innerTab.urlValue) {
									$scope.currentProcurementTab = $scope.projTabs[0].childTabs[4].childTabs[0].urlValue;
									$scope.getProcurementRecords();
								} else if ($scope.projTabs[0].childTabs[5].urlValue === innerTab.urlValue) {
									$scope.currentEmployeeTab = $scope.projTabs[0].childTabs[5].childTabs[0].urlValue;
									$scope.empTransOnLoadRecords();
								} else if ($scope.projTabs[0].childTabs[6].urlValue === innerTab.urlValue) {
									$scope.currentPlantTab = $scope.projTabs[0].childTabs[6].childTabs[0].urlValue;
									$scope.plantTransOnLoadRecords();
								} else if ($scope.projTabs[0].childTabs[7].urlValue === innerTab.urlValue) {
									$scope.currentMaterialTab = $scope.projTabs[0].childTabs[7].childTabs[0].urlValue;
									$scope.materialTransOnLoadRecords();
								} else if ($scope.projTabs[0].childTabs[8].urlValue === innerTab.urlValue) {
									$scope.getEstimateRecords();
								} else if ($scope.projTabs[0].childTabs[9].urlValue === innerTab.urlValue) {
								} else if ($scope.projTabs[0].childTabs[10].urlValue === innerTab.urlValue) {
									$scope.getProjReportsRecords();
								} else if ($scope.projTabs[0].childTabs[11].urlValue === innerTab.urlValue) {
									$scope.currentProgressTab = $scope.projTabs[0].childTabs[11].childTabs[0].urlValue;
									$scope.getProjClaimsRecords();
								} else if ($scope.projTabs[0].childTabs[12].urlValue === innerTab.urlValue) {
									$scope.getPayRollOnLoadRecords();
								}
								$scope.currentTab1 = innerTab.urlValue;
							},

							$scope.isActiveTab = function(taburlValue) {
								return taburlValue == $scope.currentTab;
							},
							$scope.isActiveTab1 = function(taburlValue) {
								return taburlValue == $scope.currentTab1;
							},
							$scope.clickForwardCostData = function(
									costDatamoreFlag1) {
								if ($scope.costDatamoreFlag < 6) {
									$scope.costDatamoreFlag = costDatamoreFlag1 + 1;
								}
							},
							$scope.clickBackwardCostData = function(
									costDatamoreFlag1) {
								if ($scope.costDatamoreFlag > 0) {
									$scope.costDatamoreFlag = costDatamoreFlag1 - 1;
								}
							},
							$scope.clickMore1 = function(moreFlag1) {
								if ($scope.moreFlag < 1) {
									$scope.moreFlag = moreFlag1 + 1;
									$scope
											.onClickTab1($scope.projTabs[0].childTabs[7]);
								}
							},
							$scope.clickMore = function(moreFlag1) {
								if ($scope.moreFlag > 0) {
									$scope.moreFlag = moreFlag1 - 1;
									$scope
											.onClickTab1($scope.projTabs[0].childTabs[0]);
								}
							},

							/*---------Project Summary Tabs----------*/

							$scope.clickProjSummaryTab = function(summary) {
								if ($scope.projTabs[6].childTabs[1].urlValue == summary.urlValue) {
									$scope.getPlantUnitsRecords();
								} else if ($scope.projTabs[6].childTabs[2].urlValue == summary.urlValue) {
									$scope.getCostUnitsRecords();
								} else if ($scope.projTabs[6].childTabs[3].urlValue == summary.urlValue) {
									$scope.getDateUnitsRecords();
								}
								$scope.projSummaryTab = summary.urlValue;
							},
							$scope.projSummaryActiveTab = function(
									summaryurlValue) {
								return summaryurlValue == $scope.projSummaryTab;
							},

							/*---------Attendance Tabs----------*/
							$scope.onClickAttendanceTab = function(
									attendanceTabs) {
								$scope.currentAttendanceTab = attendanceTabs.urlValue;
							},
							$scope.isActiveAttendanceTab = function(
									attendanceTaburlValue) {
								return attendanceTaburlValue == $scope.currentAttendanceTab;
							},
							/*---------Work Tabs----------*/
							$scope.onClickWorkTab = function(workTabs) {
								$scope.currentWorkTab = workTabs.urlValue;
							},
							$scope.isActiveWorkTab = function(workTaburlValue) {
								return workTaburlValue == $scope.currentWorkTab;
							},
							/*---------Time Tabs----------*/
							$scope.onClickTimeTab = function(timeTabs) {
								$scope.currentTimeTab = timeTabs.urlValue;
							},
							$scope.isActiveTimeTab = function(timeTaburlValue) {
								return timeTaburlValue == $scope.currentTimeTab;
							},

							/*---------Procurement Tabs----------*/
							$scope.onClickProcurementTab = function(
									procurementTabs) {
								$scope.currentProcurementTab = procurementTabs.urlValue;
							},
							$scope.isActiveProcurementTab = function(
									procurementTaburlValue) {
								return procurementTaburlValue == $scope.currentProcurementTab;
							},
							/*---------Employee transfer Tabs----------*/
							$scope.onClickEmployeeTab = function(
									employeetransferTabs) {
								$scope.currentEmployeeTab = employeetransferTabs.urlValue;
							},
							$scope.isActiveEmployeeTab = function(
									employeetransferTaburlValue) {
								return employeetransferTaburlValue == $scope.currentEmployeeTab;
							},

							/*---------Plant transfer Tabs----------*/
							$scope.onClickPlantTab = function(planttransferTabs) {
								$scope.currentPlantTab = planttransferTabs.urlValue;
							},
							$scope.isActivePlantTab = function(
									planttransferTaburlValue) {
								return planttransferTaburlValue == $scope.currentPlantTab;
							},
							/*---------Material transfer Tabs----------*/
							$scope.onClickMaterialTab = function(
									materialtransferTabs) {
								$scope.currentMaterialTab = materialtransferTabs.urlValue;
							},
							$scope.isActiveMaterialTab = function(
									materialtransferTaburlValue) {
								return materialtransferTaburlValue == $scope.currentMaterialTab;
							},
							/*------------Progress tabs-----------*/
							$scope.onClickProgressTab = function(progressTabs) {
								$scope.currentProgressTab = progressTabs.urlValue;
							},
							$scope.isActiveProgressTab = function(
									progressTaburlValue) {
								return progressTaburlValue == $scope.currentProgressTab;
							},

							/* EPS Projects */
							$scope.openSettings = function(projId) {
								$rootScope.projId = projId;
								$scope.onClickTab($scope.projTabs[0]);
								$scope
										.onClickTab1($scope.projTabs[0].childTabs[0]);
								$scope.getGeneralValuesOnLoad();
							},
							$scope.getEPSDetails = function() {
								var epsReq = {
									"status" : 1
								};
								EpsService
										.getEPSDetails(epsReq)
										.then(
												function(data) {
													$scope.epsData = data.ePSProjectTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting  EPS Project Details",
																	"Error");
												});
							};
							/* Setting Tabs */
							$scope.getProjSettings = function() {
								var getReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjSettings(getReq)
										.then(
												function(data) {
													$scope.projTabs = data.projSettingsTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting  Project Setting Details",
																	"Error");
												});
							},
							/* General Values Tab */
							$scope.getGeneralValuesOnLoad = function() {
								var getGVOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projGeneralOnLoad(getGVOnLoadReq)
										.then(
												function(data) {
													$scope.generalValues = data.projGeneralMstrTO;
													$scope.responsibleManagers = data.users;
													$scope.calenders = data.projCalenderTOs;
													$scope.countries = data.countryTOs;
													$scope.currencies = data.currencyTOs;
													$scope.timeZones = data.timeZoneTOs;
													$scope.resourceCurves = data.projresourceCurveTOs;
													$scope.projectOwners = data.companyTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting General Values",
																	"Error");
												});
							},
							$scope.getCountryDetailsById = function(countryId) {
								var getCountryReq = {
									"status" : 1,
									"countryId" : countryId,
									"projId" : $rootScope.projId
								};
								console.log(JSON.stringify(getCountryReq));
								ProjectSettingsService
										.getCountryDetailsById(getCountryReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.generalValues.countryTO = data.countryTOs[0];
												},
												function(error) {
													console.log(JSON
															.stringify(data));
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Province Details",
																	"Error");
												});
							},
							$scope.saveGeneralValues = function() {
								var saveReq = {
									"projGeneralMstrTO" : $scope.generalValues
								};
								ProjectSettingsService
										.saveProjGeneralValues(saveReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'General Value(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'General Value(s) are failed to save',
																	"Error");
												});
							},
							/* Attendance Records Tab */
							/* Create Attendance Records Tab */
							$scope.attendOnLoadRecords = function() {
								var attOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projAttendenceOnLoad(attOnLoadReq)
										.then(
												function(data) {
													$scope.attendDetails = data.projAttendenceTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Attendance Details",
																	"Error");
												});
							},
							$scope.saveProjAttendence = function() {
								var saveAttenReq = {
									"projAttendenceTOs" : $scope.attendDetails
								};
								ProjectSettingsService
										.saveProjAttendence(saveAttenReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Attendence(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Attendence(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Attendance Records Tab */
							$scope.saveProjAttendenceAppr = function() {
								$scope.attendAppr.projId = $rootScope.projId;
								var saveAttenReq = {
									"projAttendceApprTOs" : [ $scope.attendAppr ]
								};
								ProjectSettingsService.saveProjAttendenceAppr(saveAttenReq).then(function(data) {
										GenericAlertService.alertMessage('Attendence Approval(s) are saved succuessfully',"Info");
								},function(error) {
										GenericAlertService.alertMessage('Attendence Approval(s) are failed to save',"Error");
								});
								$scope.attendAppr = {};
							},

							/* Work Dairy Tab */
							/* Create Work Dairy Tab */
							$scope.workDairyOnLoadRecords = function() {
								var workOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projWorkDairyOnLoad(workOnLoadReq)
										.then(
												function(data) {
													console
															.log("workDairy"
																	+ JSON
																			.stringify(data));
													$scope.projWorkDairys = data.projWorkDairyMstrTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Work Dairy Details",
																	"Error");
												});
							},

							$scope.saveWorkDairy = function() {
								var saveAttenReq = {
									"projWorkDairyMstrTOs" : $scope.projWorkDairys
								};
								ProjectSettingsService
										.saveWorkDairy(saveAttenReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Work Dairy(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Work Dairy(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Work Dairy Tab */
							$scope.workDiaryOriginalType = function(
									workDiaryAppr, normalTimeObj) {
								workDiaryAppr.workDairyId = normalTimeObj.id;
								if (workDiaryAppr.originalType) {
									projWorkDairysAppr.push(workDiaryAppr);
								} else {
									projWorkDairysAppr.pop(workDiaryAppr);
								}
							},
							$scope.workDiaryInternalType = function(
									workDiaryAppr, normalTimeObj) {
								workDiaryAppr.workDairyId = normalTimeObj.id;
								if (workDiaryAppr.internalType) {
									projWorkDairysAppr.push(workDiaryAppr);
								} else {
									projWorkDairysAppr.pop(workDiaryAppr);
								}
							},
							$scope.workDiaryExternalType = function(
									workDiaryAppr, normalTimeObj) {
								workDiaryAppr.workDairyId = normalTimeObj.id;
								if (workDiaryAppr.externalType) {
									projWorkDairysAppr.push(workDiaryAppr);
								} else {
									projWorkDairysAppr.pop(workDiaryAppr);
								}
							},
							$scope.saveWorkDairyApprs = function() {
								$scope.workDiaryAppr.projId = $scope.projId;
								var saveWorkDairyApprReq = {
									"projWorkDairyApprTOs" : [ $scope.projWorkDairysAppr ]
								};
								console.log("saveWorkDairyApprReq"
										+ JSON.stringify(saveWorkDairyApprReq));
								ProjectSettingsService
										.saveWorkDairyApprs(
												saveWorkDairyApprReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Work Dairy Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Work Dairy Approval(s) are failed to save',
																	"Error");
												});
							},
							/* Time Sheet Tab */
							/* Create Time Sheet Tab */
							$scope.timeSheetOnLoadRecords = function() {
								var timeSheetOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projTimeSheetOnLoad(timeSheetOnLoadReq)
										.then(
												function(data) {
													console
															.log("timeSheetOnLoadRecords"
																	+ JSON
																			.stringify(data));
													$scope.projTimeSheetData = data.projTimeSheetTOs;
													$scope.weekDays = data.weekDays;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Time Sheet Details",
																	"Error");
												});
							},
							$scope.saveProjTimeSheet = function() {
								var saveTimeSheetReq = {
									"projTimeSheetTOs" : $scope.projTimeSheetData
								};
								ProjectSettingsService
										.saveProjTimeSheet(saveTimeSheetReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Time Sheet(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Time Sheet(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Time Sheet Tab */
							$scope.saveProjTimeSheetAppr = function() {
								$scope.timeSheetAppr.projId = $scope.projId;
								var saveAttenReq = {
									"projWorkDairyApprTOs" : [ $scope.timeSheetAppr ]
								};
								ProjectSettingsService
										.saveProjTimeSheetAppr(saveAttenReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Time Sheet Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Time Sheet Approval(s) are failed to save',
																	"Error");
												});
							},
							/* Procurement Tab */
							/* Create Procurement Tab */
							$scope.getProcurementRecords = function() {
								var getProcureReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjProcurements(getProcureReq)
										.then(
												function(data) {
													$scope.projProcureDetails = data.projProcurementTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Procurement Details",
																	"Error");
												});
							},
							$scope.saveProjProcurements = function() {
								var saveProjProcureReq = {
									"projProcurementTOs" : $scope.projProcureDetails
								};
								ProjectSettingsService
										.saveProjProcurements(
												saveProjProcureReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Procurement(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Procurement(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Procurement Tab */
							$scope.saveProjProcurementAppr = function() {
								$scope.procureAppr.projId = $scope.projId;
								var saveProjProcureApprReq = {
									"projProcurementApprTOs" : [ $scope.procureAppr ]
								};
								ProjectSettingsService
										.saveProjProcurementAppr(
												saveProjProcureApprReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Procurement Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Procurement Approval(s) are failed to save',
																	"Error");
												});
							},
							/* Employee Transfer Tab */
							/* Create Employee Transfer Tab */
							$scope.empTransOnLoadRecords = function() {
								var empTransOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projEmpTransOnLoad(empTransOnLoadReq)
										.then(
												function(data) {
													$scope.projEmpDetails = data.projEmpTransTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Employee Transfer Details",
																	"Error");
												});
							},
							$scope.saveEmpTransDetails = function() {
								var saveEmpTransReq = {
									"projEmpTransTOs" : $scope.projEmpDetails
								};
								ProjectSettingsService
										.saveEmpTransDetails(saveEmpTransReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Employee Detail(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Employee Detail(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Employee Transfer Tab */
							$scope.saveEmpTransAppr = function() {
								var saveEmpTransApprReq = {
									"projEmpTransApprTOs" : [$scope.empTransAppr]
								};
								ProjectSettingsService
										.saveEmpTransAppr(saveEmpTransApprReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Employee Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Employee Approval(s) are failed to save',
																	"Error");
												});
							},
							/* Plant Transfer Tab */
							/* Create Plant Transfer Tab */
							$scope.plantTransOnLoadRecords = function() {
								var plantTransOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projPlantTransOnLoad(
												plantTransOnLoadReq)
										.then(
												function(data) {
													$scope.plantTransDetails = data.projPlantTransTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Plant Transfer Details",
																	"Error");
												});
							},
							$scope.saveProjPlantTrans = function() {
								var savePlantDetailReq = {
									"projPlantTransTOs" : $scope.plantTransDetails
								};
								ProjectSettingsService
										.saveProjPlantTrans(savePlantDetailReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Plant Transfer Detail(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Plant Transfer Detail(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Plant Transfer Tab */
							$scope.saveProjPlantTransAppr = function() {
								$scope.plantAppr.projId = $scope.projId;
								var savePlantTransApprReq = {
									"projPlantTransApprTOs" : [ $scope.plantTransAppr ]
								};
								ProjectSettingsService
										.saveProjPlantTransAppr(
												savePlantTransApprReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Plant Transfer Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Plant Transfer Approval(s) are failed to save',
																	"Error");
												});
							},
							/* Material Transfer Tab */
							/* Create Material Transfer Tab */
							$scope.materialTransOnLoadRecords = function() {
								var materialsOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projMaterialTransOnLoad(
												materialsOnLoadReq)
										.then(
												function(data) {
													$scope.MaterialTransDtls = data.projMaterialTransTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Material Details",
																	"Error");
												});
							},
							$scope.saveProjMaterialTrans = function() {
								var saveMaterialDetailsReq = {
									"projMaterialTransTOs" : $scope.MaterialTransDtls
								};
								ProjectSettingsService
										.saveProjMaterialTrans(
												saveMaterialDetailsReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Material Transfer Detail(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Material Transfer Detail(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Material Transfer Tab */
							$scope.saveProjMaterialTransAppr = function() {
								$scope.materialAppr.projId = $scope.projId;
								var saveMaterialTransApprReq = {
									"projMaterialTransApprTOs" : [ $scope.materialTransAppr ]
								};
								ProjectSettingsService
										.saveProjMaterialTransAppr(
												saveMaterialTransApprReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Material Transfer Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Material Transfer Approval(s) are failed to save',
																	"Error");
												});
							},
							/* Estimate to Complete Tab */
							$scope.getEstimateRecords = function() {
								var getEstimateReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjEstimate(getEstimateReq)
										.then(
												function(data) {
													$scope.projEstimateDetails = data.projEstimateTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Estimate Details",
																	"Error");
												});
							},
							$scope.selectEstimate = function(id, type) {

								angular
										.forEach(
												$scope.projEstimateDetails,
												function(value, key) {
													if (type == 1) {
														if (id == value.id) {
															value.estimateCost = 1;
														} else {
															if (value.estimateCost < 2) {
																value.estimateCost = 0;
															}
														}
													}
													if (type == 2) {
														if (id == value.id) {
															value.manHrs = 1;
														} else {
															if (value.manHrs < 2) {
																value.manHrs = 0;
															}
														}
													}
													if (type == 3) {
														if (id == value.id) {
															value.plantHrs = 1;
														} else {
															if (value.plantHrs < 2) {
																value.plantHrs = 0;
															}
														}
													}
													if (type == 4) {
														if (id == value.id) {
															value.materialHrs = 1;
														} else {
															if (value.materialHrs < 2) {
																value.materialHrs = 0;
															}
														}
													}
													if (type == 5) {
														if (id == value.id) {
															value.otherHrs = 1;
														} else {
															if (value.otherHrs < 2) {
																value.otherHrs = 0;
															}
														}
													}
												});
							},
							$scope.getEstmateMstrRecords = function() {
								var getEstimateMstrReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getEstimateMstrs(getEstimateMstrReq)
										.then(
												function(data) {
													$scope.projEstimateDetails = data.projEstimateMstrTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Master Estimate Details",
																	"Error");
												});
							},
							$scope.saveProjEstimate = function() {
								var saveProjEstimateReq = {
									"projEstimateTOs" : $scope.projEstimateDetails
								};
								console
										.log(JSON
												.stringify(saveProjEstimateReq));
								ProjectSettingsService
										.saveProjEstimate(saveProjEstimateReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Estimate(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Estimate(s) are failed to save',
																	"Error");
												});
							},
							/* Project Reports Tab */
							$scope.getProjReportsRecords = function() {
								var getReportsReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjReports(getReportsReq)
										.then(
												function(data) {
													$scope.projReportsDtls = data.projectReportsTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Project Reports Details",
																	"Error");
												});
							},
							$scope.saveProjReports = function() {
								var saveProjReportsReq = {
									"projectReportsTOs" : $scope.projReportsDtls
								};
								ProjectSettingsService
										.saveProjReports(saveProjReportsReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Report(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Report(s) are failed to save',
																	"Error");
												});
							},
							/* Progress Claim Tab */
							/* Create Progress Claim Tab */
							$scope.getProjClaimsRecords = function() {
								var getClaimsReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjProgressClaims(getClaimsReq)
										.then(
												function(data) {
													$scope.projClaimDetails = data.projProgressClaimTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Progress Claim Details",
																	"Error");
												});
							},
							$scope.saveProjClaims = function() {
								var saveProjClaimReq = {
									"projProgressClaimTOs" : $scope.projClaimDetails
								};
								ProjectSettingsService
										.saveProjProgressClaim(saveProjClaimReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Claim(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Claim(s) are failed to save',
																	"Error");
												});
							},
							/* Approval Progress Claim Tab */
							$scope.saveProjClaimAppr = function() {
								$scope.projctClaimAppr.projId = $scope.projId;
								var saveProjClaimApprReq = {
									"projProgressClaimApprTOs" : $scope.projctClaimAppr
								};
								ProjectSettingsService
										.saveProgressClaimAppr(
												saveProjClaimApprReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Claim Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Claim Approval(s) are failed to save',
																	"Error");
												});
							},

							/* Pay Roll Tab */
							$scope.getPayRollOnLoadRecords = function() {
								var getPayRollOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projPayRollCycleOnLoad(
												getPayRollOnLoadReq)
										.then(
												function(data) {
													$scope.projPayRollDtls = data.projProgressClaimTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Pay Roll Details",
																	"Error");
												});
							},
							$scope.saveProjPayRollCycle = function() {
								$scope.projPayRollDtls.projId = $scope.projId;
								var saveProjPayRollCycleReq = {
									"projProgressClaimApprTOs" : $scope.projPayRollDtls
								};
								ProjectSettingsService
										.saveProjPayRollCycle(
												saveProjPayRollCycleReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Claim Approval(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Claim Approval(s) are failed to save',
																	"Error");
												});
							},

							// ------------------------------------------------------------------------------------------------------------------//
							$scope.calcEstimateToComplete = function(budgetObj,
									formulaType) {
								var BAC = 0;
								if (budgetObj.revisedQty != undefined
										&& budgetObj.revisedQty > 0) {
									BAC = budgetObj.revisedQty
											- budgetObj.actualQty;
								} else {
									BAC = budgetObj.originalQty
											- budgetObj.actualQty
								}
								if (formulaType == 1) {
									budgetObj.estimateComplete = BAC;
									return budgetObj.estimateComplete;
								} else if (formulaType == 2) {
									budgetObj.estimateComplete = (BAC - budgetObj.earnedValue);
									return budgetObj.estimateComplete;
								} else if (formulaType == 3) {
									budgetObj.estimateComplete = (BAC - budgetObj.earnedValue)
											/ budgetObj.costPermIndex;
									return budgetObj.estimateComplete;
								} else if (formulaType == 4) {
									budgetObj.estimateComplete = (BAC - budgetObj.earnedValue)
											/ (budgetObj.costPermIndex * budgetObj.schedulePermIndex);
									return budgetObj.estimateComplete;
								} else if (formulaType == 5) {
									budgetObj.estimateComplete = (BAC - budgetObj.earnedValue)
											/ budgetObj.progressFactor;
									return budgetObj.estimateComplete;
								} else if (formulaType == 6) {
									budgetObj.estimateComplete = (BAC - budgetObj.earnedValue)
											/ (budgetObj.progressFactor * budgetObj.schedulePermIndex);
									return budgetObj.estimateComplete;
								}

							}

					$scope.calcEstimateAtCompletion = function(budgetObj) {
						budgetObj.estimateCompletion = budgetObj.actualQty
								+ budgetObj.estimateComplete;
						return budgetObj.estimateCompletion;
					}

					/* Man Power Tab */
							$scope.getManpowerRecords = function() {
								var getManpowerReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjManpowers(getManpowerReq)
										.then(
												function(data) {
													$scope.projManpowerDetails = data.projManpowerTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Man Power Details",
																	"Error");
												});
							}, $scope.manPowerRowSelect = function(manpower) {
								if (manpower.select) {
									editManpower.push(manpower);
								} else {
									editManpower.pop(manpower);
								}
							}

							$scope.editManPowerDetails = function(actionType,
									projId) {
								if (actionType == 'Edit' && editManpower <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else if ($scope.projId !== undefined
										&& $scope.projId != null) {
									var popupDetails = ProjManPowerFactory
											.manPowerPopupDetails(actionType,
													projId, editManpower);
									popupDetails
											.then(
													function(data) {
														$scope.projManpowerDetails = data.projManpowerTOs;
														editManpower = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Project Man Power Details",
																		'Info');
													})
								}
							},
							$scope.calcRemainingUnits = function(manpower) {
								ProjManPowerFactory.manPowerPopupDetails()
										.calcRemainingUnits(manpower);
							},

							/* Plants Tab */
							$scope.getPlantRecords = function() {
								var getPlantReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjectPlants(getPlantReq)
										.then(
												function(data) {
													$scope.projPlantsDetails = data.projectPlantsDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Plant Details",
																	"Error");
												});
							},
							$scope.rowSelectPlant = function(plant) {
								if (plant.select) {
									editPlants.push(plant);
								} else {
									editPlants.pop(plant);
								}
							},

							$scope.editPlantDetails = function(actionType,
									projId) {
								if (actionType == 'Edit' && editPlants <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else if ($scope.projId !== undefined
										&& $scope.projId != null) {
									var popupDetails = ProjPlantFactory
											.plantPopupDetails(actionType,
													projId, editPlants);
									popupDetails
											.then(
													function(data) {
														$scope.projPlantsDetails = data.projectPlantsDtlTOs;
														editPlants = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Project Plant Details",
																		'Info');
													})
								}

							}

					/* Material Tab */
							$scope.getMaterialRecords = function() {
								var getMaterialReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjectMaterials(getMaterialReq)
										.then(
												function(data) {
													$scope.projMaterialDetails = data.projectMaterialDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Material Details",
																	"Error");
												});
							},
							$scope.rowSelectMaterial = function(material) {
								if (material.select) {
									editMeterials.push(material);
								} else {
									editMeterials.pop(material);
								}
							},

							$scope.editMaterialDetails = function(actionType,
									projId) {
								if (actionType == 'Edit' && editMeterials <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else if ($scope.projId !== undefined
										&& $scope.projId != null) {
									var popupDetails = ProjMaterialFactory
											.materialPopupDetails(actionType,
													projId, editMeterials);
									popupDetails
											.then(
													function(data) {
														$scope.projMaterialDetails = data.projectMaterialDtlTOs;
														editMeterials = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Project Material Details",
																		'Info');
													})
								}
							},

							/* Cost Statement Tab */

							$scope.getCostStatementRecords = function() {
								var getCostStatReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjCostStatements(getCostStatReq)
										.then(
												function(data) {
													$scope.projCostStmtDtls = data.projCostStmtDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Cost Details",
																	"Error");
												});
							},
							$scope.saveCostStmts = function() {
								$scope.editMode = false;
								$scope.editing = false;
								var saveCostStmtReq = {
									"projCostStmtDtlTOs" : $scope.projCostStmtDtls
								};
								ProjectSettingsService
										.saveCostStatement(saveCostStmtReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Cost Statement(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Cost Statement(s) are failed to save',
																	"Error");
												});
							}

					/* Progress Measure Tab */

							$scope.getProjMeasureRecords = function() {
								var getProgMeasureReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjProgMeasure(getProgMeasureReq)
										.then(
												function(data) {

													console.log(JSON
															.stringify(data));

													$scope.projMeasureDetails = data.projProgressTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Progress Measure Details",
																	"Error");
												});
							},
							$scope.saveProgMeasures = function() {
								$scope.editing = false;
								var saveProgMeasureReq = {
									"projProgressTOs" : $scope.projMeasureDetails
								};
								ProjectSettingsService
										.saveProjProgMeasure(saveProgMeasureReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Project Progress Measure(s) are saved succuessfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Project Progress Measure(s) are failed to save',
																	"Error");
												});
							}

					/* Project Summary Tab */
					/* Man Power Tab */
							$scope.getMeasureUnitsRecords = function() {
								var getMeasureUnitsReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getMeasureUnits(getMeasureUnitsReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.measureunits = data.projManPowerStatusTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Man Power Units",
																	"Error");
												});
							},
							/* Plant Tab */
							$scope.getPlantUnitsRecords = function() {
								var getPlantUnitsReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getPlantUnits(getPlantUnitsReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.plantunits = data.projectPlantsStatusTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Plant Units",
																	"Error");
												});
							},
							/* Cost Tab */
							$scope.getCostUnitsRecords = function() {
								var getCostUnitsReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getCostUnits(getCostUnitsReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.projCostStatementsSummaryTOs = data.projCostStatementsSummaryTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Cost Units",
																	"Error");
												});
							},
							/* Date Tab */
							$scope.getDateUnitsRecords = function() {
								var getDateUnitsReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getDateUnits(getDateUnitsReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.dateunits = data.projScheduledSummaryTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Dates",
																	"Error");
												});
							},
							/* Project Status Tab */
							$scope.getProjectStatus = function() {
								var getProjectStatusReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjectStatus(getProjectStatusReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.projManPowerStatusTOs = data.projManPowerStatusTOs;
													$scope.projCostStatementsSummaryTOs = data.projCostStatementsSummaryTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Project Status Details",
																	"Error");
												});
							},
							$scope.spent = function(projManPowerStatus) {
								if (projManPowerStatus.revisedQty != undefined) {
									return projManPowerStatus.actualQty
											/ projManPowerStatus.originalQty;
								} else {
									return projManPowerStatus.actualQty
											/ projManPowerStatus.revisedQty;
								}

							},
							$scope.spentCost = function(budgetCosts) {
								if (budgetCosts[1].cost != undefined
										&& budgetCosts[1].cost != null) {
									return budgetCosts[2].cost
											/ budgetCosts[1].cost;
								} else {
									return budgetCosts[1].cost
											/ budgetCosts[0].cost;
								}
							},
							/* Note Book Tab */
							$scope.getProjNoteBooks = function() {
								var getNoteBookReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjNoteBook(getNoteBookReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													console.log(JSON
															.stringify(data));
													console.log(JSON
															.stringify(data));
													$scope.projNoteBookDetails = data.projNoteBookTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Note Book Details",
																	"Error");
												});
							},
							$scope.rowSelectNoteBook = function(notebook) {
								console.log(notebook.select);
								if (notebook.select) {
									editNoteBook.push(notebook);
								} else {
									editNoteBook.pop(notebook);
								}
								console.log(JSON.stringify(editNoteBook));
							},

							$scope.editNoteBookDetails = function(actionType,
									projId) {
								if (actionType == 'Edit' && editNoteBook <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else if ($scope.projId !== undefined
										&& $scope.projId != null) {
									var popupDetails = ProjNoteBookFactory
											.noteBookPopupDetails(actionType,
													projId, editNoteBook);
									popupDetails
											.then(
													function(data) {
														$scope.projNoteBookDetails = data.projNoteBookTOs;
														editNoteBook = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Project NoteBook Details",
																		'Info');
													})
								}
							}

					
					$scope.crewList = function(projLabelKeyTO) {
						var crewReq = {
								"status" : 1,
								"projId" : $rootScope.projId
							};
								var crewSerivcePopup  = ProjectCrewPopupService.getCrewPopup(crewReq);
										crewSerivcePopup.then(function(data) {
															projLabelKeyTO.id = data.projCrewTO.id;
															projLabelKeyTO.code = data.projCrewTO.code;
															projLabelKeyTO.name = data.projCrewTO.desc;
										},function(error) {
											GenericAlertService.alertMessage("Error occured while selecting Crew List Details",'Error');
										});
					}
					var ApproverSerivcePopup = [];
					$scope.approversList = function(projLabelKeyTO) {
						ApproverSerivcePopup = ProjectCrewPopupService
								.approverDetailsList($rootScope.projId);
						ApproverSerivcePopup
								.then(
										function(data) {
											projLabelKeyTO.id = data.projApproverTO.userId;
											projLabelKeyTO.code = data.projApproverTO.firstName;
											projLabelKeyTO.name = data.projApproverTO.lastName;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting Approver List Details",
															'Error');
										});
					}

					$scope.getProcurementNotifications = function(
							procurementNotificationTO) {
						$scope.getNotificationsByModuleCode('PROCUREMENT',procurementNotificationTO);
					},
					
					$scope.getEmpNotifications = function(
							empNotificationTO) {
						$scope.getNotificationsByModuleCode('EMPLOYEETRANSFER',empNotificationTO);
					},
					
					$scope.getPlantNotifications = function(
							plantNotificationTO) {
						$scope.getNotificationsByModuleCode('PLANTTRANSFER',plantNotificationTO);
					},
					
					$scope.getMaterialNotifications = function(
							plantNotificationTO) {
						$scope.getNotificationsByModuleCode('MATERIALTRANSFER',plantNotificationTO);
					},
					
					$scope.getNotificationsByModuleCode = function(moduleCode,notificationLabelKeyTO) {
						var notificationPopup = [];
						notificationPopup = ProjectCrewPopupService
								.getNotificationDetailsByModuleCode(moduleCode,$rootScope.projId);
						notificationPopup
								.then(
										function(data) {
											notificationLabelKeyTO.id = data.projNotificationTO.id;
											notificationLabelKeyTO.code = data.projNotificationTO.code;
											notificationLabelKeyTO.referenceId = data.projNotificationTO.notifyRefId;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting Notification Details",
															'Error');
										});

					}

					var EPSPopUp = [];
							$scope.project = function(projLabelKeyTO) {
								EPSPopUp = ProjectCrewPopupService
										.projctDetailList($rootScope.projId);
								EPSPopUp
										.then(
												function(data) {
													projLabelKeyTO.id = data.projEPSTO.id;
													projLabelKeyTO.code = data.projEPSTO.projCode;
													projLabelKeyTO.name = data.projEPSTO.projName;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting Projects List Details",
																	'Error');
												});
							},

							$scope.addCostItemDetails = function() {
								var costCodePopup = [];
								costCodePopup = ProjectSettingCostItemFactory
										.getCostItemDetails($rootScope.projId);
								costCodePopup
										.then(
												function(data) {
													$scope.projCostStmtDtls = data.projCostStmtDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  cost codes",
																	'Error');
												});
							},
							$scope.calculateBudgetAmount = function(tab) {
								var budgetAmount = tab.projCostBudgetTOs[0];
								tab.projCostBudgetTOs[0].total = budgetAmount.labourCost
										+ budgetAmount.materialCost
										+ budgetAmount.plantCost
										+ budgetAmount.otherCost;

							},
							$scope.calculateRevisedBudget = function(tab) {
								var revisedBudget = tab.projCostBudgetTOs[1];
								tab.projCostBudgetTOs[1].total = revisedBudget.labourCost
										+ revisedBudget.materialCost
										+ revisedBudget.plantCost
										+ revisedBudget.otherCost;
							}
					var originalBudgetTotal = 0;
					var revisedBudgetTotal = 0;
					var actualCost = 100000;
							$scope.costPercentage = function(tab) {
								// var actualCost = tab.actualCost;
								var originalBudget = tab.projCostBudgetTOs[0];
								originalBudgetTotal = originalBudget.labourCost
										+ originalBudget.materialCost
										+ originalBudget.plantCost
										+ originalBudget.otherCost;

								var revisedBudget = tab.projCostBudgetTOs[1];
								revisedBudgetTotal = revisedBudget.labourCost
										+ revisedBudget.materialCost
										+ revisedBudget.plantCost
										+ revisedBudget.otherCost;

								if (revisedBudgetTotal != undefined
										&& revisedBudgetTotal > 0) {
									tab.costPercentage = (actualCost / revisedBudgetTotal) * 100;
								} else if (originalBudgetTotal != undefined) {
									tab.costPercentage = (actualCost / originalBudgetTotal) * 100;
								}
							},
							$scope.percentageOfWork = function(tab) {
								var earnedValueAmount = tab.earnedValue;
								if (revisedBudgetTotal != undefined
										&& revisedBudgetTotal > 0) {
									tab.percentageOfWork = (earnedValueAmount / revisedBudgetTotal) * 100;
								} else if (originalBudgetTotal != undefined) {
									tab.percentageOfWork = (earnedValueAmount / revisedBudgetTotal) * 100;
									tab.percentageOfWork = (earnedValueAmount / originalBudgetTotal) * 100;
								}
							},
							$scope.productivityFactor = function(tab) {
								var earnedAmount = tab.earnedValue;
								// var actualCost = tab.actualCost;
								if (earnedAmount != undefined
										&& earnedAmount > 0) {
									tab.productivityFactor = (earnedAmount / actualCost) * 100;
								}
							},
							$scope.actualAmount = function(tab) {
								var workDairy = 0;
								var registers = 0;
								var empWages = 0;
								var timsSheet = 0;
								var projLib = 0;
								var attendance = 0;
								var purchaseOrder = 0;
								tab.projCostBudgetTOs[2].labourCost = ((workDairy.usedValue
										* registers.ratePerUnit * empWages.wageRate)
										* (workDairy.idleValue
												* registers.idleTimeRate * empWages.wageRate)
										+ (timsSheet.timsSheetHrs * timsSheet.wageFactor)
										+ (timsSheet.timeSheetExpenses)
										+ (attendance.attenValue * projLib.paidLeaves) + (registers.mobilisationRate * registers.deMobilisationRate));
								tab.projCostBudgetTOs[2].materialCost = ((workDairy.value * purchaseOrder.purcahseOrderListRate) + purchaseOrder.paidAmount);
								tab.projCostBudgetTOs[2].plantCost = ((workDairy.usedValue * registers.rateWithFuel) + (workDairy.idleValue * registers.plantIdleTime));
								tab.projCostBudgetTOs[2].otherCost = purchaseOrder.paidAmount;
							},
							$scope.remainingAmount = function(tab) {
								var actualAmount = tab.projCostBudgetTOs[0];
								var revisedBudget = tab.projCostBudgetTOs[1];
								tab.projCostBudgetTOs[2].labourCost = actualAmount.labourCost
										- revisedBudget.labourCost;
								tab.projCostBudgetTOs[2].materialCost = actualAmount.materialCost
										- revisedBudget.materialCost;
								tab.projCostBudgetTOs[2].plantCost = actualAmount.plantCost
										- revisedBudget.plantCost;
								tab.projCostBudgetTOs[2].otherCost = actualAmount.otherCost
										- revisedBudget.otherCost;
								tab.projCostBudgetTOs[2].total = tab.projCostBudgetTOs[1].total
										- tab.projCostBudgetTOs[0].total;
							},
							$scope.applyProgsMeasure = function(fromDate,
									toDate) {

							},
							$scope.addSOWItems = function() {
								var sowPopup = [];
								sowPopup = ProjectSettingSOWItemFactory
										.getSOWItemDetails($rootScope.projId);
								sowPopup
										.then(
												function(data) {
													$scope.projMeasureDetails = data.projSOWDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  cost codes",
																	'Error');
												});
							}, $scope.checkErr = function(startDate, endDate) {
								$scope.errMessage = '';
								var curDate = new Date();
								if (!(startDate && endDate)) {
									$scope.errMessage = 'Please Select Date';
									return false;
								}
								if (new Date(startDate) >= new Date(endDate)) {
									$scope.errMessage = 'From Date > To Date';
									return false;
								}
							}, $scope.editItem = function() {
								$scope.editing = true;
							}, $scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};
					function itemexpandCollpase(item, expand) {
						angular.forEach(item.children, function(o) {
							o.expand = !expand;
							if (o.children != null && o.children.length > 0) {
								o.expand = false;
								itemexpandCollpase(o, expand);
							}
						});
					}
				}).filter('slice', function() {
			return function(arr, start, end) {
				return (arr || []).slice(start, end);
			}
		}).filter(
				'filterTreeItem',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o, key) {
							if (o.childProjs && o.childProjs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.projId === itemId) {
									o.expand = isExpand;
								}
								if (o.expand === true) {
									recursive(o.childProjs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.proj) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								newObj.push(o);
								return false;
							}
						});
					}
					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'projCostStatementFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.projCostStmtChildTOs
									&& o.projCostStmtChildTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								newObj.push(o);
								if (o.expand == true) {
									recursive(o.projCostStmtChildTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
									newObj.push(o);
								} else {
									obj.splice(obj.indexOf(o), 1);
									o.leaf = false;
								}
								return false;
							}
						});
					}
					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'projCostFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o != undefined && o.projCostCodeItemTOs
									&& o.projCostCodeItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.projCostCodeItemTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								newObj.push(o);
								return false;
							}
						});
					}
					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'sowFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childSOWItemTOs
									&& o.childSOWItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childSOWItemTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								newObj.push(o);
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'sowProgMeasureFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childProjProgressTOs
									&& o.childProjProgressTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								newObj.push(o);
								if (o.expand == true) {
									recursive(o.childProjProgressTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
									newObj.push(o);
								} else {
									obj.splice(obj.indexOf(o), 1);
									o.leaf = false;
								}
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				});