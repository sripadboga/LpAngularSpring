'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"planttransfer",
									{
										url : '/planttransfer',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projresources/planttransfer/planttransfer.html',
												controller : 'PlantTransferController'
											}
										}
									})
				})
		.controller(
				"PlantTransferController",
				function($rootScope, $scope, $state, ngDialog,PlantTransfersDetailsFactory,
						UserEPSProjectService, PlantTransfersCreateFactory,
						GenericAlertService, PlantTransferService) {

					$scope.searchProject = {};
					$scope.plantTransferDetails = {};
					var editCreateRequestDetails = [];
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
							}, $scope.plantReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId,
									"apprStatus":2
							}
							$scope.resetSearchData = function() {
								$scope.searchProject = {};
								$scope.plantTransferDetails = {};
							},
							$scope.getPlantDetails = function(projId) {
								if (projId == undefined || projId == null) {
									GenericAlertService.alertMessage(
											"Please Select Project ID First",
											'Warning');
								} else {
									var plantDetailsPopUp = PlantTransfersDetailsFactory
											.getPlantTransferDetailsPopup(projId);
									plantDetailsPopUp
											.then(
													function(plantDetails) {
														$scope.searchPlant = plantDetails.plantRegisterDtlTO.assertId;
														alert(JSON.stringify(plantDetails));
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occured while selecting Employee name",
																		'Error');
													});
								}
							},
							
							$scope.getPlantTransferDetails = function(projId) {
								/*var getPlantTransferReq = {
									"status" : 1,
									"projId" : projId
								};*/
								PlantTransferService
										.getPlantreqForTrans($scope.plantReq)
										.then(
												function(data) {
													$scope.plantRequestDetails = data.plantReqForTransTOs;
													alert(JSON.stringify($scope.plantRequestDetails));
													/*$scope.plantClassMstrMap = data.plantClassMstrMap;
													$scope.procureCatgMap = data.procureCatgMap;
													$scope.plantCompanyMap = data.plantCompanyMap;
													$scope.assertTypes = data.assertTypes;*/
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Registered Plant Details",
																	"Error");
												});
							}
							$scope.createPlantRequest = function(actionType) {
								if (actionType == 'Edit'
										&& editCreateRequestDetails <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit",
													'Warning');
									return;
								}

								var plantReqPopUp = PlantTransfersCreateFactory
										.getPlantTransferDetailsPopup(
												actionType,
												editCreateRequestDetails);
								plantReqPopUp
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching employee details",
																	'Error');
												});
							}
				});
