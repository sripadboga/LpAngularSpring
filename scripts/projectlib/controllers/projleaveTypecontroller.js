'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider.state(
									'projleavetype',
									{
										url : '/projleavetype',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/leavetype/projleaveType.html',
												controller : 'ProjLeaveTypeController'
											}
										}
									})
				})
		.controller(
				"ProjLeaveTypeController",
				function($rootScope, $scope, $state, ngDialog,
						ProjLeaveTypeService, ProjectLeaveTypePopUpService,
						GenericAlertService,UserEPSProjectService) {
					$scope.projects = [];
					var editLeaveClass = [];
					$scope.tableData = [];
					$scope.deletecodes = [];
					  $scope.searchProject ={};
						$scope.leaveReq={
								"status":"1"
						},
					$scope.inputPorject ={};
					$scope.dataExist = false;
					
					$scope.getUserProjects = function() {		
						$scope.activeFlag = 1;
					    var userProjectSelection=UserEPSProjectService.epsProjectPopup();
					    	userProjectSelection.then(function(userEPSProjData) {
					    		$scope.searchProject = userEPSProjData.selectedProject;
	                        }, function(error) {
	                             GenericAlertService.alertMessage("Error occured while selecting EPS Project name",'Error');
	                        });                   
					}, 
					$scope.activeFlag = 0;
					$scope.getProjLeaveTypes = function() {
						var req = {
								"projId" : $scope.searchProject.projId,
							"status" : $scope.leaveReq.status
						};
						if (req.projId == null ||  req.status == undefined) {
							GenericAlertService.alertMessage("Please select project and status", 'Warning');
							return;
						}
						ProjLeaveTypeService.getProjLeaveTypes(req).then(function(data) {
							$scope.activeFlag = 0;
							$scope.tableData = data.projLeaveTypeTOs;
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
								GenericAlertService.alertMessage("Leave and Attendence Details not aviable for given search criteria",'Warning');
							}
							},
							function(error) {
								GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
							});
		},
						$scope.resetProjLeaveTypes = function() {
						$scope.tableData = [];
						$scope.searchProject = {};
						$scope.activeFlag = 1;
						$scope.leaveReq={
								"status":"1"
						}
					}, $scope.rowSelect = function(tab) {
						if (tab.select) {
							editLeaveClass.push(tab);
						} else {
							editLeaveClass.pop(tab);
						}
					}
					
					$scope.addpopup = function(actionType,selectedProject) {
						if (actionType == 'Edit' && editLeaveClass <= 0) {
							 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
							return;
						}else if ( $scope.searchProject.projId !==undefined && $scope.searchProject.projId  != null){
								var popupDetails = ProjectLeaveTypePopUpService.projLeaveTypePopUp(actionType,selectedProject,editLeaveClass);
								popupDetails.then(function(data){
									$scope.tableData = data.projLeaveTypeTOs;
									editLeaveClass = [];
								},function(error){
									GenericAlertService.alertMessage("Error occurred while selecting Project Employee Classification details",'Info');
								})
						}else   {
							 GenericAlertService.alertMessage("Please select Project Id",'Warning');
						}
					},
							$scope.deleteLeaveClass = function() {
								if (editLeaveClass.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Error');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editLeaveClass,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projLeaveTypeIds" : deleteIds,
										"status" : 2
									};
									ProjLeaveTypeService.deleteProjLeaveTypes(req).then(function(data) {
										GenericAlertService.alertMessage('LeaveTypes are  Deactivated successfully','Info');
											});
								
									angular.forEach(editLeaveClass,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('LeaveTypes  are  failed to Deactivate',"Error");
													});
									editLeaveClass = [];
									$scope.deleteIds = [];

								}
							}
					$scope.activeLeaveClass = function() {
						if (editLeaveClass.length <= 0) {
							GenericAlertService.alertMessage("Please select alteast one row to Activate",'Error');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.tableData = [];
						} else {
							angular.forEach(editLeaveClass,function(value, key) {
												if (value.id) {
													deleteIds.push(value.id);
												}
											});
							var req = {
								"projLeaveTypeIds" : deleteIds,
								"status" : 1
							};
							ProjLeaveTypeService.deleteProjLeaveTypes(req).then(function(data) {
								GenericAlertService.alertMessage('LeaveTypes are  Activated successfully','Info');
									});
						
							angular.forEach(editLeaveClass,function(value, key) {
												$scope.tableData.splice($scope.tableData.indexOf(value),1);
											},
											function(error) {
												GenericAlertService.alertMessage('LeaveTypes  are  failed to Activate',"Error");
											});
							editLeaveClass = [];
							$scope.deleteIds = [];

						}
					}
				});