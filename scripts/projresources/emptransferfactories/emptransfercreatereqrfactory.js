'use strict';
app
		.factory(
				'EmpTransferCreateReqFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						UserEPSProjectService, ProjectCrewPopupService,
						EmpTransferService, GenericAlertService) {
					var empTransferFactoryPopUp;
					var service = {};
					service.empCreateReqPopUp = function(actionType) {
						var deferred = $q.defer();
						empTransferFactoryPopUp = ngDialog
								.open({
									template : 'views/projresources/projempreg/emptransfer/emptransferpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addEmpTransfers = [];
												var selectedTranasferRecords = [];
												var editEmpTransfer = [];
												$scope.searchProject = {};

														$scope.getUserProjects = function(
																projectLabelKeyTO) {
															var userProjectSelection = UserEPSProjectService
																	.epsProjectPopup(projectLabelKeyTO);
															userProjectSelection
																	.then(
																			function(
																					userEPSProjData) {
																				projectLabelKeyTO.id = userEPSProjData.selectedProject.projId;
																				projectLabelKeyTO.code = userEPSProjData.selectedProject.projName;
																				projectLabelKeyTO.name = userEPSProjData.selectedProject.parentName;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting EPS Project name",
																								'Error');
																			});
														},

														$scope.getApproversList = function(
																reqUserLabelKeyTO) {
															var ApproverSerivcePopup = [];
															ApproverSerivcePopup = ProjectCrewPopupService
																	.approverDetailsList($scope.searchProject.projId);
															ApproverSerivcePopup
																	.then(
																			function(
																					data) {
																				reqUserLabelKeyTO.id = data.projApproverTO.userId;
																				reqUserLabelKeyTO.code = data.projApproverTO.firstName;
																				reqUserLabelKeyTO.name = data.projApproverTO.lastName;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting Approver List Details",
																								'Error');
																			});
														}

												if (actionType === 'Add') {
													$scope.addEmpTransfers .push({
														"status" : 1,
														"selected" : false,
														"apprStatus" : 2,
														"empRegLabelKeyTO" : {
															"id" : 1,
															"code" : null
														},
														"fromProjectLabelKeyTO" : {
															"id" : null,
															"code" : null,
															"name" : null
														},
														"toProjectLabelKeyTO" : {
															"id" : null,
															"code" : null,
															"name" : null
														},
														"reqUserLabelKeyTO" : {
															"id" : null,
															"code" : null,
															"name" : null
														}
													})
												} else {
													$scope.addEmpTransfers = angular
															.copy(editEmpTransfer);
													editEmpTransfer = [];
												}
														$scope.addRows = function() {
															$scope.addEmpTransfers
																	.push({
																		"status" : 1,
																		"selected" : false,
																		"apprStatus" : 2,
																		"empRegLabelKeyTO" : {
																			"id" : 1,
																			"code" : null
																		},
																		"fromProjectLabelKeyTO" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"toProjectLabelKeyTO" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"reqUserLabelKeyTO" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		}
																	});
														},
														$scope.empTransPopUpRowSelect = function(transfer) {
															if (transfer.selected) {
																selectedTranasferRecords.push(transfer);
															} else {
																selectedTranasferRecords.pop(transfer);
															}
														},
														$scope.deleteRows = function() {
															if(selectedTranasferRecords.length==0){
																GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
															}else if(selectedTranasferRecords.length < $scope.addEmpTransfers.length)
															{
																angular.forEach(selectedTranasferRecords, function(value,key) {
																	$scope.addEmpTransfers.splice($scope.addEmpTransfers.indexOf(value), 1);
																});
																selectedTranasferRecords=[];
																GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
																}else
																{
																	GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
																	}
														},
														$scope.saveEmpTransfersferDetails = function() {
															var saveEmptransReq = {
																"empReqTransTOs" : $scope.addEmpTransfers
															};
															EmpTransferService
																	.saveEmpTransferDetails(
																			saveEmptransReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Employee  Approval Transfer Details  '
																										+ data.message,
																								data.status);
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Employee  Approval Transfer Details Failed to Save ',
																								"Error");
																			});
															ngDialog.close();
														}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
