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
									"empattendence",
									{
										url : '/empattendence',
										parent : 'site',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/timemanagement/attendance/empattendenceDetails.html',
												controller : 'EmpAttendenceController'
											}
										}
									})
				})
		.controller(
				'EmpAttendenceController',
				function($scope, $q, $state, ngDialog, EmpAttendanceService,
						UserEPSProjectService, EmpRegisterPopUpService,
						EmpAttendPopUpService, EmpAttendenaceLeaveFactory,
						ProjectCrewPopupService, GenericAlertService) {

					$scope.crewListData = [];
					$scope.empAttendenceDetails = [];
					$scope.searchProject = {};
					$scope.empAttendenceSheets = [];
					$scope.empAttendanceDays = [];
					$scope.moreFlag = 0;
					$scope.lessFlag = 0;
					$scope.attendenceDayMap = [];
					$scope.empLeaveTypeMap = [];
					$scope.empDetailsMap = [];

					$scope.empAttendReq = {
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
								$scope.empAttendReq = {
									"status" : 1,
									"crewLabelKeyTO" : {
										"id" : null,
										"code" : null,
										"name" : null
									},
									"attendenceId" : null
								};
								$scope.empAttendenceDetails = [];
								$scope.empLeaveTypeMap = [];
								$scope.empDetailsMap = [];
							},

							$scope.getAttendanceOnLoad = function(projId) {
								var getEmpAttendReq = {
									"status" : 1,
									"projId" : projId
								};
								EmpAttendanceService
										.getAttendanceOnLoad(getEmpAttendReq)
										.then(
												function(data) {
													$scope.empAttendReq.attendenceCode = data.empAttendenceTO.code;
													$scope.empAttendReq.attendenceId = data.empAttendenceTO.id;
													$scope.empAttendReq.month = data.empAttendenceTO.attendenceMonth;
													$scope.empAttendanceDays = data.attendenceDays;
													$scope.attendenceDayMap = data.attendenceDayMap;

												});
							},
							$scope.getEmpAttendanceSheets = function(projId) {
								var getEmpAttendReq = {
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
									empAttendPopUp = EmpAttendPopUpService
											.getEmpAttendenceSheets(projId);
									empAttendPopUp
											.then(
													function(empAttendData) {
														$scope.empAttendReq.attendenceCode = empAttendData.attendanceObj.code;
														$scope.empAttendReq.attendenceId = empAttendData.attendanceObj.id;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occured while selecting Employee ",
																		'Error');
													});
								}
							},
							$scope.getEmpAttendenceDetails = function() {

								if ($scope.searchProject == undefined
										|| $scope.searchProject.projId <= 0
										|| $scope.empAttendReq.attendenceId == undefined
										|| $scope.empAttendReq.attendenceId <= 0
										|| $scope.empAttendReq.crewLabelKeyTO == undefined
										|| $scope.empAttendReq.crewLabelKeyTO.crewId <= 0) {
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
									"crewId" : $scope.empAttendReq.crewLabelKeyTO.id,
									"attendenceId" : $scope.empAttendReq.attendenceId
								};
								EmpAttendanceService
										.getEmpAttendanceDetails(attendReq)
										.then(
												function(data) {
													$scope.empAttendenceDetails = data.empAttendenceDtlTOs;
													$scope.empLeaveTypeMap = data.empLeaveTypeMap;
													$scope.empDetailsMap = data.empDetailsMap;
													if ($scope.empAttendenceDetails.length <= 0) {
														GenericAlertService
																.alertMessage(
																		"Employees are not aviable for the selected crew",
																		'Warning');
													}
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  Employees Attendance details",
																	'Error');
												});
							},
							$scope.saveEmpAttendanceRecords = function() {
								var attendReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId,
									"crewId" : $scope.empAttendReq.crewLabelKeyTO.id,
									"attendenceId" : $scope.empAttendReq.attendenceId,
									"empAttendenceDtlTOs" : $scope.empAttendenceDetails
								};
								console.log(JSON.stringify(attendReq));
								EmpAttendanceService
										.saveEmpAttendanceRecords(attendReq)
										.then(
												function(data) {
													$scope.empAttendenceDetails = data.empAttendenceDtlTOs;
													$scope.empLeaveTypeMap = data.empLeaveTypeMap;
													$scope.empDetailsMap = data.empDetailsMap;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  Employees Attendance details",
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
							$scope.getProjEmpLeaveTypes = function(projId,
									projLeaveTypeLabelKeyTO) {
								if (projId == undefined || projId == null) {
									GenericAlertService
											.alertMessage(
													"Please select project to get crews",
													'Warning');
									return;
								}
								var projEmpLeaveTypePopup = [];
								projEmpLeaveTypePopup = EmpAttendenaceLeaveFactory
										.getProjLeaveCodes();
								projEmpLeaveTypePopup
										.then(
												function(data) {
													projLeaveTypeLabelKeyTO.projLeaveId = data.projLeaveType.id;
												},

												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting Crew List Details",
																	'Error');
												});
							},

							$scope.addEmployeeDetails = function() {
								var empPopup = [];
								empPopup = EmpRegisterPopUpService
										.getEmpRegisters();
								empPopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting  Employee Data",
																	'Error');
												});
							}, $scope.clickForward = function(moreFlag) {
								if ($scope.moreFlag <= 31) {
									$scope.moreFlag = moreFlag + 7;
								}
							}, $scope.clickBackward = function(moreFlag) {
								if ($scope.moreFlag > 0) {
									$scope.moreFlag = moreFlag - 7;
								}
							}
				});