'use strict';

/**
 * @ngdoc function
 * @name potApp.controller : CompanyController
 * @description # CompanyController of the potApp
 */
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"plantattendence",
									{
										url : '/plantattendence',
										parent : 'site',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/timemanagement/attendance/plantattendance.html',
												controller : 'PlantAttendenceController'
											}
										}
									})
				})
		.controller(
				'PlantAttendenceController',
				function($scope, $q, $state, ngDialog, PlantAttendanceService,
						UserEPSProjectService, ProjEmpClassService,
						ProjectCrewPopupService, PlantAttendPopUpService,
						PlantRegisterPopUpService, GenericAlertService) {

					$scope.searchProject = {};
					$scope.plantAttendenceDetails = [];
					$scope.plantAttendanceMap = [];
					$scope.plantDetailsMap = [];
					$scope.plantAttendanceDays = [];
					$scope.moreFlag = 0;
					$scope.plantAttendReq = {
						"status" : 1,
						"crewLabelKeyTO" : {
							"id" : null,
							"code" : null,
							"name" : null
						},
						"attendenceId" : null
					};

							$scope.getUserProjects = function() {
								var userProjectSelection = UserEPSProjectService
										.epsProjectPopup();
								userProjectSelection
										.then(
												function(userEPSProjData) {
													$scope.searchProject = userEPSProjData.selectedProject;
													$scope
															.getAttendanceOnLoad($scope.searchProject.projId);
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting EPS Project name",
																	'Error');
												});
							},

							$scope.resetEmpAttendData = function() {
								$scope.searchProject = {};
								$scope.plantAttendReq = {
									"status" : 1,
									"crewLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null
									},
									"attendenceId" : null
								};
								$scope.plantAttendenceDetails = [];
								$scope.plantAttendanceMap = [];
								$scope.plantDetailsMap = [];
							},

							$scope.getAttendanceOnLoad = function(projId) {
								var getPlantAttendReq = {
									"status" : 1,
									"projId" : projId
								};
								PlantAttendanceService
										.getAttendanceOnLoad(getPlantAttendReq)
										.then(
												function(data) {
													$scope.plantAttendReq.attendenceCode = data.plantAttendenceTO.code;
													$scope.plantAttendReq.attendenceId = data.plantAttendenceTO.id;
													$scope.plantAttendReq.month = data.plantAttendenceTO.attendenceMonth;
													$scope.plantAttendanceDays = data.attendenceDays;
													$scope.attendenceDayMap = data.attendenceDayMap;

												});
							},
							$scope.getPlantAttendanceSheets = function(projId) {
								var getPlantAttendReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId,
								};
								if (projId == undefined || projId == null) {
									GenericAlertService
											.alertMessage(
													"Please select project to get attendence sheets",
													'Warning');
								} else {
									var empAttendPopUp = [];
									empAttendPopUp = PlantAttendPopUpService
											.getPlantAttendenceSheets(projId);
									empAttendPopUp
											.then(
													function(plantAttendData) {
														$scope.plantAttendReq.attendenceCode = plantAttendData.attendanceObj.code;
														$scope.plantAttendReq.attendenceId = plantAttendData.attendanceObj.id;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occured while selecting Plant ",
																		'Error');
													});
								}
							},
							$scope.getPlantAttendenceDetails = function() {

								if ($scope.searchProject == undefined
										|| $scope.searchProject.projId <= 0
										|| $scope.plantAttendReq.attendenceId == undefined
										|| $scope.plantAttendReq.attendenceId <= 0
										|| $scope.plantAttendReq.crewLabelKeyTO == undefined
										|| $scope.plantAttendReq.crewLabelKeyTO.crewId <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select all the search criteria "
															+ "to get attendence details",
													'Warning');
									return;
								}

								var attendReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId,
									"crewId" : $scope.plantAttendReq.crewLabelKeyTO.id,
									"attendenceId" : $scope.plantAttendReq.attendenceId
								};
								PlantAttendanceService
										.getPlantAttendanceDetails(attendReq)
										.then(
												function(data) {
													$scope.plantAttendenceDetails = data.plantAttendenceDtlTOs;
													$scope.plantAttendanceMap = data.plantAttendanceMap;
													$scope.plantDetailsMap = data.plantDetailsMap;
													if ($scope.plantAttendenceDetails.length <= 0) {
														GenericAlertService
																.alertMessage(
																		"Plant are not aviable for the selected crew",
																		'Warning');
													}
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  Plant Attendance details",
																	'Error');
												});
							},
							$scope.savePlantAttendanceRecords = function() {
								var attendReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId,
									"crewId" : $scope.plantAttendReq.crewLabelKeyTO.id,
									"attendenceId" : $scope.plantAttendReq.attendenceId,
									"plantAttendenceDtlTOs" : $scope.plantAttendenceDetails
								};
								console.log(JSON.stringify(attendReq));
								PlantAttendanceService
										.savePlantAttendanceRecords(attendReq)
										.then(
												function(data) {
													$scope.plantAttendenceDetails = data.plantAttendenceDtlTOs;
													$scope.plantAttendanceMap = data.plantAttendanceMap;
													$scope.plantDetailsMap = data.plantDetailsMap;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  Plant Attendance details",
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
																	"Error occured while getting Crew  Details",
																	'Error');
												});

							},

							$scope.getPlantAttendDtls = function(projId) {
								var getPlantAttendDtlsReq = {
									"status" : 1,
									"projId" : projId
								};
								PlantAttendanceService
										.getPlantAttendOnLoad(
												getPlantAttendDtlsReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.palntAttendData = data.projAttendanceTOs;
												});
							},
							$scope.clickForward = function(moreFlag) {
								if ($scope.moreFlag <= 31) {
									$scope.moreFlag = moreFlag + 7;
								}
							},
							$scope.clickBackward = function(moreFlag) {
								if ($scope.moreFlag > 0) {
									$scope.moreFlag = moreFlag - 7;
								}
							},
							$scope.addPlantDetails = function() {
								var plantPopUp = [];
								plantPopUp = PlantRegisterPopUpService
										.getPlantRegistersDtls();
								plantPopUp
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  Plants",
																	'Error');
												});
							}
				});