'use strict';
app.config(function($stateProvider) {
					$stateProvider.state('projmaterial',
									{
										url : '/projmaterial',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/materialclass/projmaterialclass.html',
												controller : 'ProjMaterialClassController'
											}
										}
									})
				})
		.controller("ProjMaterialClassController",function($rootScope, $scope, $state, ngDialog,ProjMaterialClassService, ProjMaterialClassPopupService,GenericAlertService, UserEPSProjectService) {
					$scope.deletecodes = [];
					$scope.projId = null;
					$scope.tableData = [];
					var editTableData = [];
					$scope.projects = [];
					$scope.materialReq = {
						"code" : '',
						"name" : '',
						"measurementTO.name" : '',
						"materialSubGroupTO.name" : '',
						"materialSubGroupTO.code" : '',
						"status" : "1"
					}, $scope.searchProject = {};
					$scope.inputPorject = {};
					$scope.dataExist = false;
							$scope.getUserProjects = function() {
								$scope.activeFlag = 1;
								var userProjectSelection = UserEPSProjectService.epsProjectPopup();								
								userProjectSelection.then(function(userEPSProjData) {
													$scope.searchProject = userEPSProjData.selectedProject;
												},
												function(error) {
													GenericAlertService.alertMessage("Error occured while selecting EPS Project name",'Error');
												});
							},
							$scope.activeFlag = 0;
							$scope.getProjMaterialClasses = function(projId) {
								var req = {
									"projId" : $scope.searchProject.projId,
									"status" : $scope.materialReq.status,
								};
								if (req.projId == null ||  req.status == undefined) {
								GenericAlertService.alertMessage("Please select project and status", 'Warning');
								return;
							}
							ProjMaterialClassService.getProjMaterialClasses(req).then(function(data) {
								$scope.activeFlag = 0;
								$scope.tableData = data.projMaterialClassTOs;
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
									GenericAlertService.alertMessage("Materials are not aviable for given search criteria",'Warning');
								}
								},
								function(error) {
									GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
								});
			},
								
								
								
								
							$scope.resetProjMaterialClasses = function() {
								$scope.epsProjId = null;
								$scope.tableData = [];
								$scope.searchProject = {};
								$scope.dataExist = false;
								$scope.activeFlag = 1;
								$scope.materialReq = {
									"status" : "1"
								};
							},
							$scope.rowSelect = function(tab) {
								if (tab.select) {
									editTableData.push(tab);
								} else {
									editTableData.pop(tab);
								}
							},
							$scope.addTableData = function(actionType,selectedProject,projectId) {
								if (actionType == 'Edit' && editTableData <= 0) {
									 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
									return;
								}else if ( $scope.searchProject.projId !==undefined && $scope.searchProject.projId  != null){
										var popupDetails = ProjMaterialClassPopupService.projMaterialClassifiPopUp(actionType,selectedProject,editTableData);
										popupDetails.then(function(data){
											$scope.tableData = data.projMaterialClassTOs;
											$scope.catgData=data.measureUnitTOs;
											editTableData = [];
										},function(error){
											GenericAlertService.alertMessage("Error occurred while selecting Project Employee Classification details",'Info');
										})
								}else   {
									 GenericAlertService.alertMessage("Please select Project Id",'Warning');
								}
							}, $scope.checkAll = function() {
								angular.forEach($scope.tableData,function(tab) {
											if ($scope.selectedAll) {
												tab.select = false;
											} else {
												tab.select = true;
											}
										});
							},
								$scope.deleteProjMaterialClasses = function() {
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
											"projMaterialClassIds" : deleteIds,
											"status" : 2
										};
										ProjMaterialClassService.deleteProjMaterialClasses(req).then(function(data) {
											GenericAlertService.alertMessage('Materials are  Deactivated succuessfully','Info');
											angular.forEach(editTableData,function(value, key) {
												$scope.tableData.splice($scope.tableData.indexOf(value),1);
											},
											function(error) {
												GenericAlertService.alertMessage('Materials are failed to Deactivate',"Error");
											});
							editTableData = [];
							$scope.deleteIds = [];

												});
									
									}
								}
							$scope.activeProjMaterialClasses = function() {
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
										"projMaterialClassIds" : deleteIds,
										"status" : 1
									};
									ProjMaterialClassService.deleteProjMaterialClasses(req).then(function(data) {
										GenericAlertService.alertMessage('Materials are  Activated succuessfully','Info');
										angular.forEach(editTableData,function(value, key) {
											$scope.tableData.splice($scope.tableData.indexOf(value),1);
										},
										function(error) {
											GenericAlertService.alertMessage('Materials are failed to Activate',"Error");
										});
						editTableData = [];
						$scope.deleteIds = [];

											});
								
									
								}
							}
				});