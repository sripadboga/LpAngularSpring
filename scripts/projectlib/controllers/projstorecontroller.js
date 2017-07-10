'use strict';
app.config(function($stateProvider) {
					$stateProvider.state('projstore',{
										url : '/projstore',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/storeandstock/storeyard.html',
												controller : 'ProjStoreController'
											}
										}
									})
				})
		.controller("ProjStoreController",function($rootScope, $scope, $state, ngDialog,ProjStoreStockService,GenericAlertService,UserEPSProjectService,ProjStocksPopupService) {
					var editStoreData = [];
					$scope.tableData = [];
					$scope.epsProjId = null;
					$scope.projId = null;
					$scope.epsProjects = [];
					 var projStoreClassifyPopUp=null
					$scope.inputPorject ={};
					 var emptyProjStoreClassifyObj =[];
					$scope.projects = [];
					$scope.storeReq={
							"code":'',
							"desc":'',
							"status":"1"
					},
          $scope.searchProject ={};
					$scope.emptyProjStoreClassifyObj =[];
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
							$scope.getProjStoreStocks = function() {
								var workGetReq = {
										"projId" : $scope.searchProject.projId,
									"status" : $scope.storeReq.status
								};
								if (workGetReq.projId == null ||  workGetReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjStoreStockService.getProjStoreStocks(workGetReq).then(function(data) {
									$scope.activeFlag = 0;
									$scope.tableData = data.projStoreStockTOs;
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
										GenericAlertService.alertMessage("StoreStock Details  are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
									});
				},
							$scope.resetProjStoreStock = function() {
								$scope.epsProjId = null;
								$scope.projId = null;
								$scope.tableData = [];
								$scope.searchProject =[];
								$scope.projects.proj = null;
								$scope.epsProjects.proj = null;
								$scope.storeReq={
										"status":"1"
								}
								$scope.activeFlag = 1;
							},
							$scope.rowSelect = function(tab) {
								if (tab.select) {
									editStoreData.push(tab);
								} else {
									editStoreData.pop(tab);
								}
							},	$scope.addpopup = function(actionType,selectedProject) {
								if (actionType == 'Edit' && editStoreData <= 0) {
									 GenericAlertService.alertMessage("Please select alteast one row to modify",'Warning');
									return;
								}else if ( $scope.searchProject.projId !==undefined && $scope.searchProject.projId  != null){
										var popupDetails = ProjStocksPopupService.projStoreClassifyPopUp(actionType,selectedProject,editStoreData);
										popupDetails.then(function(data){
											$scope.tableData = data.projStoreStockTOs;
											editStoreData = [];
										},function(error){
											GenericAlertService.alertMessage("Error occurred while selecting Project Employee Classification details",'Info');
										})
								}else   {
									 GenericAlertService.alertMessage("Please select Project Id",'Warning');
								}
							},
							$scope.deleteStoreClass = function() {
								if (editStoreData.length <= 0) {
									GenericAlertService.alertMessage("Please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editStoreData,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projStoreStockIds" : deleteIds,
										"status" : 2
									};
									ProjStoreStockService.deleteProjStoreStocks(req).then(function(data) {
										GenericAlertService.alertMessage('Stores  are  Deactivated successfully','Info');
											});
									angular.forEach(editStoreData,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage(	' Stores are failed to Deactivate',"Error");
													});
									editStoreData = [];
									$scope.deleteIds = [];
								}
							}
							$scope.activeStoreClass = function() {
								if (editStoreData.length <= 0) {
									GenericAlertService.alertMessage("Please select records to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.tableData = [];
								} else {
									angular.forEach(editStoreData,function(value, key) {
														if (value.id) {
															deleteIds.push(value.id);
														}
													});
									var req = {
										"projStoreStockIds" : deleteIds,
										"status" : 1
									};
									ProjStoreStockService.deleteProjStoreStocks(req).then(function(data) {
										GenericAlertService.alertMessage('Stores  are  Activated successfully','Info');
											});
									angular.forEach(editStoreData,function(value, key) {
														$scope.tableData.splice($scope.tableData.indexOf(value),1);
													},
													function(error) {
														GenericAlertService.alertMessage(	' Stores are failed to Activate',"Error");
													});
									editStoreData = [];
									$scope.deleteIds = [];
								}
							}
				});