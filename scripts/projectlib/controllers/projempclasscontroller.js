'use strict';
app.config(function($stateProvider) {
					$stateProvider.state('projempclass',{
									url : '/projempclass',
									data : {
										roles : []
									},
									views : {
										'content@' : {
											templateUrl : 'views/projectlib/empclass/projempclass.html',
											controller : 'ProjEmpClassController'
										}
									}
							})
}).controller("ProjEmpClassController",	function($rootScope, $scope, $state, ngDialog,ProjEmpClassService,GenericAlertService,UserEPSProjectService,ProjectEmpClassificationService) {
					$scope.epsProjId = null;
					$scope.projId = null;
					$scope.tableData = [];
					$scope.UiDelete=[];
					var editEmpClass = [];
					$scope.epsProjects = [];
					$scope.projects = [];
					$scope.searchProject ={};
					$scope.inputPorject ={};
					var projEmpClassifiPopUp = null;
					$scope.projEmpReq={
							"empClassTO.code":null,
							"empClassTO.name":null,
							"projEmpCatgTO.code":null,
							"tradeContrName":null,
							"unionWorkerName" :null,
							"measureUnitTO":{id:null,code:null,name:null},
							"status":"1"
					}
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
					$scope.getProjEmpClasses = function(projId) {
						var req = {
							"projId" : projId,
							"status" : $scope.projEmpReq.status,
						};
						if (req.projId == null ||  req.status == undefined) {
							GenericAlertService.alertMessage("Please select project and status", 'Warning');
							return;
						}
						ProjEmpClassService.getProjEmpClasses(req).then(function(data) {
							$scope.activeFlag = 0;
							$scope.tableData = data.projEmpClassTOs;
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
								GenericAlertService.alertMessage("Employee Details are not aviable for given search criteria",'Warning');
							}
							},
							function(error) {
								GenericAlertService.alertMessage("Error occured while getting EPS Projects ",'Error');
							});
		},
		
					$scope.reset = function() {
						$scope.tableData = [];
						$scope.projEmpReq={
								"status":"1"
						}
						$scope.activeFlag = 1;
						$scope.projects = [];
						$scope.searchProject ={};
					},
					$scope.rowSelect = function(tab) {
						if (tab.select) {
							editEmpClass.push(tab);
						} else {
							editEmpClass.pop(tab);
						}
					},
					$scope.addpopup = function(actionType,selectedProject,projId) {
								if (actionType == 'Edit' && editEmpClass <= 0) {
									 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
									return;
								}else if ( $scope.searchProject.projId !==undefined && $scope.searchProject.projId  != null){
										var popupDetails = ProjectEmpClassificationService.projEmpClassifyPopup(actionType,editEmpClass,projId);
										popupDetails.then(function(data){
											$scope.tableData = data.projEmpClassTOs;
											$scope.catgData=data.measureUnitTOs;
											editEmpClass = [];
										},function(error){
											GenericAlertService.alertMessage("Error occurred while selecting Project Employee Classification details",'Info');
										})
								}else {
									 GenericAlertService.alertMessage("Please select Project Id",'Warning');
								}
							},
							$scope.deleteEmpClass = function() {
								if (editEmpClass.length <= 0) {
									GenericAlertService.alertMessage("Please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editEmpClass,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projEmpClassIds" : deleteIds,
										"status" : 2
									};
									ProjEmpClassService.deleteProjEmpClasses(req).then(function(data) {
										GenericAlertService.alertMessage('Employee Details are  Deactivated successfully','Info');
											});
									
									angular.forEach(editEmpClass,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('Employee Details are   failed to Deactivate',"Error");
													});
									editEmpClass = [];
									$scope.deleteIds = [];

								}
							}
							$scope.activeEmpClass = function() {
								if (editEmpClass.length <= 0) {
									GenericAlertService.alertMessage("Please select records to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editEmpClass,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projEmpClassIds" : deleteIds,
										"status" : 1
									};
									ProjEmpClassService.deleteProjEmpClasses(req).then(function(data) {
										GenericAlertService.alertMessage('Employee Details are  Activated successfully','Info');
											});
									
									angular.forEach(editEmpClass,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('Employee Details are   failed to Activate',"Error");
													});
									editEmpClass = [];
									$scope.deleteIds = [];

								}
							}
				});