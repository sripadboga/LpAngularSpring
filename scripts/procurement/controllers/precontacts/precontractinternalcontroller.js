'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"internalApproval",
									{
										url : '/internalApproval',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/procurement/pre-contracts/internalApproval/precontractinternal.html',
												controller : 'PreContractInternalController'
											}
										}
									})
				})
		.controller(
				"PreContractInternalController",
				function($rootScope, $scope, $state, ngDialog, $q,
						PreContractInternalService, PreContractInternalFactory,
						GenericAlertService, UserEPSProjectService,
						ViewReqApprPopupFactory) {

					$scope.internalRequest = [];
					var editInternalReq = [];
					$scope.deleteInternalRequest = [];
					$scope.searchProject = {};
					$scope.contractStatus = {};
					$scope.preContractReqApprList = [];
					$scope.approverUserList = [];
					$scope.viewInternalRequest = [];
					$scope.items = [];
					$scope.currentTab = null;
					$scope.preContractTabs = [];

							$scope.getWorkFlowstatus = function() {
								PreContractInternalService
										.getWorkFlowstatus()
										.then(
												function(data) {
													console
															.log(JSON
																	.stringify(data.workFlowStatusTOs));
													$scope.workflowStatusList = data.workFlowStatusTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while gettting workflow status",
																	'Error');
												});
							},

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
							$scope.getInternalRequest = function(projId) {
								var workGetReq = {
									"projId" : projId,
									"approveStatus" : $scope.contractStatus.value,
									"status" : 1
								};
								if (projId == undefined
										|| projId <= 0
										|| $scope.contractStatus == undefined
										|| $scope.contractStatus == null
										|| $scope.contractStatus.value == undefined
										|| $scope.contractStatus.value <= 0) {
									GenericAlertService.alertMessage(
											"Please select project and status",
											'Warning');
									return;
								}
								PreContractInternalService
										.getInternalPreContracts(workGetReq)
										.then(
												function(data) {
													$scope.internalRequest = data.preContractTOs;
													if ($scope.internalRequest.length <= 0) {
														GenericAlertService
																.alertMessage(
																		"Precontracts are not aviable for given search criteria",
																		'Warning');
													}
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting PreContracts",
																	'Error');

												});

							},

							$scope.resetInternalRequest = function() {
								$scope.internalRequest = [];
								$scope.contractStatus = {};
								$scope.searchProject = {};
							},
							$scope.rowSelect = function(req) {
								if (req.select) {
									editInternalReq.push(req);
								} else {
									editInternalReq.pop(req);
								}

							},
							$scope.getApprovelDetails = function(preContractId) {
								var popupDetails = ViewReqApprPopupFactory
										.reqApprDetails(preContractId);
								popupDetails
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting request approvals",
																	'Info');
												})
							},
							$scope.addInternalRequest = function(actionType,
									selectedProject, editInternalReq) {
								if (selectedProject.projId !== undefined
										&& selectedProject.projId != null) {
									var getInternalData = $scope
											.getInternalDetailsById(actionType,
													editInternalReq);
									getInternalData
											.then(
													function(data) {
														var popupDetails = PreContractInternalFactory
																.procInternalApprovalPopUp(
																		data.preContractObj,
																		selectedProject);
														popupDetails
																.then(
																		function(
																				data) {
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occurred while adding or editing the  precontract",
																							'Error');
																		})
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while selecting Project Employee Classification details",
																		'Info');
													})

								} else {
									GenericAlertService.alertMessage(
											"Please select project Id",
											'Warning');
								}
							},
							$scope.getInternalDetailsById = function(
									actionType, editInternalReq) {
								var internalDefer = $q.defer();
								var onLoadReq = {
									"status" : 1,
									"clientId" : $scope.searchProject.clientId,
									"projId" : $scope.searchProject.projId
								};
								if (actionType == 'Edit') {
									onLoadReq = {
										"projId" : editInternalReq.projId,
										"contractId" : editInternalReq.id,
										"clientId" : $scope.searchProject.clientId,
										"status" : 1
									};
								}

								PreContractInternalService
										.getInternalPreContractPopupOnLoad(
												onLoadReq)
										.then(
												function(data) {
													var returnPreContractObj = {
														"preContractObj" : angular
																.copy(data)
													};
													internalDefer
															.resolve(returnPreContractObj);
												});
								return internalDefer.promise;

							}/*
								 * , $scope.deactivateInternalRequest =
								 * function() {
								 * 
								 * if (editInternalReq == undefined ||
								 * editInternalReq.length <= 0) {
								 * GenericAlertService .alertMessage( "Please
								 * select atleast one to Deactivate",
								 * "Warning"); return; } var DeactivateReq = {
								 * "contractIds" : editInternalReq, "status" : 2 };
								 * 
								 * console.log("DeactivateReq Data" +
								 * JSON.stringify(DeactivateReq));
								 * PreContractInternalService
								 * .deactivateInternalRequest( DeactivateReq)
								 * .then( function(data) { GenericAlertService
								 * .alertMessage( "internal Details Deactivated
								 * successfully", "Info"); editInternalReq = [];
								 *  }, function(error) { GenericAlertService
								 * .alertMessage( "Error occured while
								 * Deactivating internal Details", "Error"); });
								 *  };
								 */

				});