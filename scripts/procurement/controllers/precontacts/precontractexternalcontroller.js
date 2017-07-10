'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"externalApproval",
									{
										url : '/externalApproval',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/procurement/pre-contracts/externalApproval/precontractexternal.html',
												controller : 'PreContractExternalController'
											}
										}
									})
				})
		.controller(
				"PreContractExternalController",
				function($rootScope, $scope, $state, ngDialog, $q,
						PreContractExternalService, GenericAlertService,
						UserEPSProjectService, PreContractExternalFactory,
						ViewReqApprPopupFactory, PreContractBidanalysisFactory) {
					$scope.externalRequest = [];
					var editExternalReq = [];
					$scope.deleteExternalRequest = [];
					$scope.searchProject = {};
					$scope.contractStatus = {};
					$scope.preContractReqApprList = [];
					$scope.viewExternalRequest = [];
					$scope.items = [];
					$scope.currentTab = null;
					$scope.preContractTabs = [];
							$scope.getWorkFlowstatus = function() {
								$scope.workflowStatusList = [];

								PreContractExternalService
										.getWorkFlowstatus()
										.then(
												function(data) {
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
							$scope.getExternalRequest = function(projId) {
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
								PreContractExternalService
										.getExternalPreContracts(workGetReq)
										.then(
												function(data) {
													$scope.externalRequest = data.preContractTOs;
													if ($scope.externalRequest.length <= 0) {
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

							$scope.resetExternalRequest = function() {
								$scope.externalRequest = [];
								$scope.contractStatus = {};
								$scope.searchProject.parentName = null;
								$scope.searchProject.projName = null;

							},
							$scope.rowSelect = function(req) {
								if (req.select) {
									editExternalReq.push(req);
								} else {
									editExternalReq.pop(req);
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
																	"Error occurred while getting requeest approvals",
																	'Info');
												})
							},
							$scope.getBidAnalysisDetails = function(searchProject,
									preContractId) {
								var bidDetails = $scope
										.getCompanyBidDetails(searchProject,preContractId);
								bidDetails
										.then(
												function(data) {
													var popupDetails = PreContractBidanalysisFactory
															.getCompanyBidDetails(data.preContractObj);
													popupDetails
															.then(
																	function(
																			data) {
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occurred while getting requeest approvals",
																						'Info');
																	})
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting requeest approvals",
																	'Info');
												})

							},
							$scope.addExternalRequest = function(actionType,
									selectedProject, editInternalReq) {
								if (selectedProject.projId !== undefined
										&& selectedProject.projId != null) {
									var getExternalData = $scope
											.getExternalPrecontractDetails(
													actionType, editInternalReq);
									getExternalData
											.then(
													function(data) {
														var popupDetails = PreContractExternalFactory
																.procExternalApprovalPopUp(
																		data.preContractObj,
																		selectedProject);
														popupDetails
																.then(
																		function(
																				data) {
																			$scope.externalRequest = data.preContractTOs;
																			editInternalReq = [];
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occurred while selecting Project Employee Classification details",
																							'Info');
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
											"Please select Project Id", 'Info');
								}
							},

							$scope.getExternalPrecontractDetails = function(
									actionType, editInternalReq) {
								var externalDefer = $q.defer();

								var onLoadReq = {
									"status" : 1,
									"clientId" : editInternalReq.clientId,
									"projId" : editInternalReq.projId
								};
								if (actionType == 'Edit') {
									onLoadReq = {
										"projId" : editInternalReq.projId,
										"contractId" : editInternalReq.id,
										"clientId" : $scope.searchProject.clientId,
										"status" : 1
									};
								}

								PreContractExternalService
										.getExternalPreContractPopupOnLoad(
												onLoadReq)
										.then(
												function(data) {
													var returnPreContractObj = {
														"preContractObj" : angular
																.copy(data)
													};
													externalDefer
															.resolve(returnPreContractObj);

												});

								return externalDefer.promise;
							},

							$scope.getCompanyBidDetails = function(searchProject,
									preContractId) {
								var onLoadReq = {
									"projId" : searchProject.projId,
									"contractId" : preContractId,
									"clientId" : searchProject.clientId,
									"status" : 1

								};

								var bidAnalysisDefer = $q.defer();
								PreContractExternalService
										.getExternalPreContractPopupOnLoad(
												onLoadReq)
										.then(
												function(data) {
													var returnPreContractObj = {
														"preContractObj" : angular
																.copy(data)
													};
													bidAnalysisDefer
															.resolve(returnPreContractObj);
												});
								return bidAnalysisDefer.promise;

							}/*,

							$scope.deactivateExternalRequest = function(
									deleteInternalRequest) {

								if (deleteExternalRequest == undefined
										|| deleteExternalRequest.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one pre Contract to deactivate",
													"Warning");
									return;
								}
								var deactivateReq = {
									"contractIds" : deleteInternalRequest,
									"status" : 2
								};

								console.log("deactivateInternalRequest Data"
										+ JSON.stringify(deactivateReq));
								PreContractExternalService
										.deactivateExternalRequest(
												deactivateReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"Internal Request Details deactivated successfully",
																	"Info");
													deleteInternalRequest = [];

												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while deactivating Internal Approval Details",
																	"Error");
												});

							};*/

				});
