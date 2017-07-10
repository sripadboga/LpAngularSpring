'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"plantpo",
									{
										url : '/plantpo',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projresources/projplantpo/plantpodetails.html',
												controller : 'PlantPoController'
											}
										}
									})
				})
		.controller(
				"PlantPoController",
				function($rootScope, $scope, $q, $state, ngDialog,
						 UserEPSProjectService,GenericAlertService,PlantPoService,
						ProjEmpClassService,PlantPurchaseOrderDetailsFactory,PlantDocketDetailsFactory,
						PlantPurchaseOrderFactory) {
					var purchaseOrderMap =[];
					var editPoData = [];
					$scope.searchProject = {};

					$scope.getUserProjects = function() {
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
					
					$scope.plantPoDetails = function() {
						var plantPoService = {};
						var plantPoPopup = PlantPurchaseOrderFactory
								.plantPurchaseOrderPopUp($scope.searchProject);
						plantPoPopup
								.then(
										function(
												data) {
											purchaseOrderMap = data;
											$scope.id = data.purchaseOrderTO.id;
											$scope.code = data.purchaseOrderTO.code;
										},
										function(
												error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting project employee class Details",
															'Error');
										});
					},
					$scope.poRowSelect = function(plantPo) {
						if (plantPo.selected) {
							editPoData.push(plantPo);

						} else {
							editPoData.pop(plantPo);
						}
						
					}
					
					$scope.plantPo = [];
					$scope.getPlantPoDetails = function(projId) {
						var getPlantPoReq = {
							"status" : 1,
							"projId" : $scope.searchProject.projId,
							"purchaseTypeId":$scope.id
						};
						if(getPlantPoReq.projId==null || getPlantPoReq.status==undefined || getPlantPoReq.purchaseTypeId==null){
							GenericAlertService.alertMessage("Please select Project and Purchase Order","Warning");
							return;
						}
						PlantPoService
								.getPlantProjectDtls(getPlantPoReq)
								.then(
										function(data) {
											console.log(JSON.stringify(data));
											$scope.plantPoList = data.plantProjDtlTO;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while getting Plant Purchase Order Details",
															"Error");
										});
						PlantPoService
						.getPlantProjectDtlsOnLoad(getPlantPoReq)
						.then(
								function(data) {
									$scope.plantProjPurchaseType = data.plantProjPurchaseType;
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occured while getting Plant Purchase Order Details",
													"Error");
								});
					},
					
					$scope.resetPurchaseOrderData = function() {
						$scope.searchProject = {};
						$scope.plantPoList = [];
						$scope.plantProjPurchaseType = [];
						$scope.code = [];
					}
					$scope.addplantpoList = function(actionType,projId) {
						if (actionType == 'Edit' && editPoData <= 0) {
							GenericAlertService
									.alertMessage(
											"Please select alteast one row to modify",
											'Warning');
							return;
						} else if (projId !== undefined
								&& projId != null) {
							var popupDetails = PlantPurchaseOrderDetailsFactory
									.poDetailsPopUp(actionType,
											projId, editPoData,purchaseOrderMap);
							popupDetails
									.then(
											function(data) {
												$scope.addPoData = data.plantProjDtlTOs;
												editPoData = [];
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error occurred while selecting Purchase Order Details",
																'Info');
											})
						}else{
							GenericAlertService
							.alertMessage(
									"Please Select Project and Purchase Order",
									'Warning');
							
						}
					}
					$scope.plantDocketDetails = function() {
						var plantDocketService = {};
						var plantDocketPopup = PlantDocketDetailsFactory
								.plantDocketDetailsPopUp($scope.searchProject);
						plantDocketPopup
								.then(
										function(
												data) {
											$scope.id = data.purchaseOrderTO.id;
											$scope.code = data.purchaseOrderTO.code;
										},
										function(
												error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting project employee class Details",
															'Error');
										});
					}
					$scope.deletePlantPo= function() {
						if (editPoData.length <= 0) {
							GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.addPoData = [];
						} else {
							angular.forEach(editPoData, function(value,key) {			
									deleteIds.push(value.id);				
							});
							var req = {
								"storeIds" : deleteIds,
								"status":2
							};
							PlantPoService.deleteStoreDocket(req).then(function(data) {
									});
							angular.forEach(editPoData, function(value,key) {
								GenericAlertService.alertMessage('Material Issue Docket Details Deactivated successfully','Info');
								$scope.addPoData.splice($scope.addPoData.indexOf(value), 1);									
							},
							function(error) {
								GenericAlertService.alertMessage('Material Issue Docket Details are failed to Deactivate',"Error");
							});
							editPoData = [];
							$scope.deleteIds = [];
						}
					}

					
				});
