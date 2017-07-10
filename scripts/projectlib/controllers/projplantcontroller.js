'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'projplantclass',
									{
										url : '/projplantclass',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/plantclass/projplant.html',
												controller : 'ProjPlantController'
											}
										}
									})
				})
		.controller(
				"ProjPlantController",
				function($rootScope, $scope, $state, ngDialog,
						ProjPlantClassService, ProjEmpClassService,GenericAlertService,UserEPSProjectService,ProjPlantClassificationPopupService) {
					$scope.epsProjId = null;
					$scope.projId = null;
					$scope.projPlantData = [];
					$scope.epsProjects = [];
					$scope.projects = [];
					$scope.plantReq={
							"plantClassTO.code":'',
						     "plantContrName":'',
							"measureUnitTO.name":'',
							"status":"1"
					}
					var editPlantClass = [];
								 $scope.searchProject ={};
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
							$scope.getProjPlantClasses = function(projId) {
								var req = {
										"projId" : $scope.searchProject.projId,
										"status" : $scope.plantReq.status
								};
								if (req.projId == null ||  req.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjPlantClassService.getProjPlantClasses(req).then(function(data) {
									$scope.activeFlag = 0;
									$scope.projPlantData = data.projPlantClassTOs;
									if ($scope.projPlantData != null
											&& $scope.projPlantData.length > 0) {
										if ($scope.projPlantData[0].status == 1) {
											$scope.activeFlag = 1;
										} else if ($scope.projPlantData[0].status == 2) {
											$scope.activeFlag = 2;
										}
									}
									if ($scope.projPlantData<=0) {
										$scope.activeFlag = 1;
										GenericAlertService.alertMessage("Plant Classifications  are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
									});
				},
								$scope.resetProjPlantClasses= function() {
								$scope.searchProject = {};
								$scope.projPlantData = [];
								$scope.projects.proj = null;
								$scope.plantReq={
										"status":"1"
								};
								$scope.activeFlag = 1;
							}, $scope.rowSelect = function(tab) {
								if (tab.select) {
									editPlantClass.push(tab);
								} else {
									editPlantClass.pop(tab);
								}
							}
							$scope.addprojetplant = function(actionType,selectedProject) {
								if (actionType == 'Edit' && editPlantClass <= 0) {
									 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
									return;
								}else if ( $scope.searchProject.projId !==undefined && $scope.searchProject.projId  != null){
										var popupDetails = ProjPlantClassificationPopupService.projPlantClassifiPopUp(actionType,selectedProject,editPlantClass);
										popupDetails.then(function(data){
											$scope.projPlantData = data.projPlantClassTOs;
											editPlantClass = [];
										},function(error){
											GenericAlertService.alertMessage("Error occurred while selecting Project Employee Classification details",'Info');
										})
								}else   {
									 GenericAlertService.alertMessage("Please select Project Id",'Warning');
								}
							}, 
							$scope.deletePlantClass = function() {
								if (editPlantClass.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.projPlantData = [];
								} else {
									angular.forEach(editPlantClass,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projPlantClassIds" : deleteIds,
										"status" : 2
									};
									ProjPlantClassService.deleteProjPlantClasses(req).then(function(data) {
										GenericAlertService.alertMessage('Plants Details are  Deactivated successfully','Info');
											});
								
									angular.forEach(editPlantClass,function(value, key) {
														$scope.projPlantData.splice(
																		$scope.projPlantData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('Plants Details are failed to Deactivate',"Error");
													});
									editPlantClass = [];
									$scope.deleteIds = [];

								}
							}
							$scope.activePlantClass = function() {
								if (editPlantClass.length <= 0) {
									GenericAlertService.alertMessage("Please select alteast one row to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.projPlantData = [];
								} else {
									angular.forEach(editPlantClass,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projPlantClassIds" : deleteIds,
										"status" : 1
									};
									ProjPlantClassService.deleteProjPlantClasses(req).then(function(data) {
										GenericAlertService.alertMessage('Plants Details are  Activated successfully','Info');
											});
								
									angular.forEach(editPlantClass,function(value, key) {
														$scope.projPlantData.splice($scope.projPlantData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage('Plants Details are failed to Activate',"Error");
													});
									editPlantClass = [];
									$scope.deleteIds = [];

								}
							}
				});