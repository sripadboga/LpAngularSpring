'use strict';
app.config(function($stateProvider) {
					$stateProvider.state(
									"projcrewlist",
									{
										url : '/projcrewlist',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/crewlist/projcrewlist.html',
												controller : 'ProjCrewController'
											}
										}
									})
				})
		.controller("ProjCrewController",function($scope, $state, ngDialog, ProjCrewListService,ProjCrewListPopupService,GenericAlertService,UserEPSProjectService) {
					$scope.tab = [];
					$scope.tableData = [];
					$scope.epsProjId = null;
					$scope.projId = null;
					$scope.epsProjects = [];
					$scope.projects = [];
					var editTableData = [];
					$scope.searchProject ={};
					$scope.crewReq={
							"code":'',
							"desc":'',
							"projWorkShiftTO.code" :'',
							"status":"1"
					},
					$scope.activeFlag = 0;
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
							$scope.getProjCrewLists = function(projId) {
								var workGetReq = {
										"projId" : $scope.searchProject.projId,
									"status" : $scope.crewReq.status
								};
								if (workGetReq.projId == null ||  workGetReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjCrewListService.getProjCrewLists(workGetReq).then(function(data) {
									$scope.activeFlag = 0;
									$scope.tableData = data.projCrewTOs;
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
										GenericAlertService.alertMessage("CrewLists are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects ",'Error');
									});
				},
								
				$scope.resetProjCrewList = function() {
					$scope.tableData = [];
					$scope.searchProject ={};
					$scope.activeFlag = 1;
								$scope.crewReq={
										"status":"1"
								}
							},
							$scope.rowSelect = function(tab) {
								if (tab.select) {
									editTableData.push(tab);
								} else {
									editTableData.pop(tab);
								}
							}
							$scope.addTableData = function(actionType,selectedProject) {
								if (actionType == 'Edit' && editTableData <= 0) {
									 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
									return;
								}else if ( $scope.searchProject.projId !==undefined && $scope.searchProject.projId  != null){
										var popupDetails=ProjCrewListPopupService.projCrewListPopUp(actionType,selectedProject,editTableData);
										popupDetails.then(function(data){
											$scope.tableData = data.projCrewTOs;
											$scope.shiftData = data.projWorkShiftTOs;
											editTableData = [];
										},function(error){
											GenericAlertService.alertMessage("Error occurred while selecting Project Employee Classification details",'Info');
										})
								}else {
									 GenericAlertService.alertMessage("Please select Project Id",'Warning');
								}
							}, $scope.checkAll = function() {
								angular.forEach($scope.tableData,
										function(tab) {
											if ($scope.selectedAll) {
												tab.select = false;
											} else {
												tab.select = true;
											}
										});
							},
							$scope.deleteCrewList= function() {
								if (editTableData.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Deactivate","Warning");
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
										"projCrewIds" : deleteIds,
										"status" : 2
									};
									ProjCrewListService.deleteProjCrewLists(req).then(function(data) {
										GenericAlertService.alertMessage('CrewLists are  Deactivated successfully','Info');
											});
									
									angular.forEach(editTableData,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage(	' CrewLists are failed to Deactivate',"Error");
													});
									editTableData = [];
									$scope.deleteIds = [];

								}
							}

							$scope.activeCrewList= function() {
								if (editTableData.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Activate","Warning");
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
										"projCrewIds" : deleteIds,
										"status" : 1
									};
									ProjCrewListService.deleteProjCrewLists(req).then(function(data) {
										GenericAlertService.alertMessage('CrewLists are  Activated successfully','Info');
											});
									
									angular.forEach(editTableData,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage(	' CrewLists are failed to Activate',"Error");
													});
									editTableData = [];
									$scope.deleteIds = [];

								}
							}

				});
