'use strict';
app.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"projworkshift",
									{
										url : '/projworkshift',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/workshift/workingshifts.html',
												controller : 'ProjWorkShiftController'
											}
										}
									})
				})
		.controller(
				"ProjWorkShiftController",
				function($rootScope, $scope, $state, ngDialog,
						ProjWorkShiftService, ProjWorkShiftPopupService,
						GenericAlertService, UserEPSProjectService) {
					$scope.epsProjId = null;
					$scope.projId = null;
					$scope.addtableData = [];
					$scope.tableData = [];
					$scope.epsProjects = [];
					$scope.projects = [];
					$scope.searchProject = {};
					var editTableData = [];
							$scope.workShiftReq = {
								"code" : '',
								"status" : "1"
							},
							$scope.getUserProjects = function() {
								$scope.activeFlag = 1;
								var userProjectSelection = UserEPSProjectService
										.epsProjectPopup();
								userProjectSelection
										.then(
												function(userEPSProjData) {
													$scope.searchProject = userEPSProjData.selectedProject;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting EPS Project name",
																	'Error');
												});
							},
							$scope.activeFlag = 0;
							$scope.getProjWorkShifts = function() {
								var workGetReq = {
									"projId" : $scope.searchProject.projId,
									"status" : $scope.workShiftReq.status
								};
								if (workGetReq.projId == null ||  workGetReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjWorkShiftService.getProjWorkShifts(workGetReq).then(function(data) {
									$scope.activeFlag = 0;
									$scope.tableData = data.projWorkShiftTOs
									if ($scope.tableData != null
											&& $scope.tableData.length > 0) {
										if ($scope.tableData[0].status == 1) {
											$scope.activeFlag = 1;
										} else if ($scope.tableData[0].status == 2) {
											$scope.activeFlag = 2;
										}
									}
									if ($scope.tableData<=0) {
										$scope.activeFlag = 1;
										GenericAlertService.alertMessage("Working Shifts Details  are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
									});
				},
							$scope.resetProjWorkShift = function() {
								$scope.tableData = [];
								$scope.searchProject ={};
								$scope.workShiftReq = {
									"status" : "1"
								}
								$scope.activeFlag = 1;
							},
							
							$scope.rowSelect = function(tab) {
								if (tab.select) {
									editTableData.push(tab);
								} else {
									editTableData.pop(tab);
								}
							},
							$scope.addTableData = function(actionType,
									selectedProject) {
								if (actionType == 'Edit' && editTableData <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select alteast one row to modify",
													'Warning');
									return;
								} else if ($scope.searchProject.projId !== undefined
										&& $scope.searchProject.projId != null) {
									var popupDetails = ProjWorkShiftPopupService
											.projWorkShiftPopUp(actionType,
													selectedProject,
													editTableData);
									popupDetails
											.then(
													function(data) {
														$scope.tableData = data.projWorkShiftTOs;
														editTableData = [];
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Project Employee Classification details",
																		'Info');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select Project Id",
											'Warning');
								}
							},
							$scope.deleteWorkShifts = function() {
								if (editTableData.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editTableData,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projWorkShiftIds" : deleteIds,
										"status" : 2
									};
									ProjWorkShiftService.deleteProjWorkShifts(req).then(function(data) {
										GenericAlertService.alertMessage('WorkingShifts are Deactivated Successfully','Info');
											});
								
									angular.forEach(editTableData,function(value, key) {
														$scope.tableData.splice(
																		$scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('WorkingShifts  are failed to Deactivate',"Error");
													});
									editTableData = [];
									$scope.deleteIds = [];

								}
							}
							$scope.activeWorkShifts = function() {
								if (editTableData.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editTableData,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projWorkShiftIds" : deleteIds,
										"status" : 1
									};
									ProjWorkShiftService.deleteProjWorkShifts(req).then(function(data) {
										GenericAlertService.alertMessage('WorkingShifts are Activated Successfully','Info');
											});
								
									angular.forEach(editTableData,function(value, key) {
														$scope.tableData.splice(
																		$scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('WorkingShifts  are failed to Activate',"Error");
													});
									editTableData = [];
									$scope.deleteIds = [];

								}
							}
				});
