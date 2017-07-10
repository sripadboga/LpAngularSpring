'use strict';
app
		.factory(
				'PlantTransfersDetailsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, ProjectCrewPopupService,PlantTransferService,PlantRegisterService,
						UserEPSProjectService) {
					var getPlantTransferDetailsPopup;
					var service = {};
					service.getPlantTransferDetailsPopup = function(projId) {
						var deferred = $q.defer();
						getPlantTransferDetailsPopup = ngDialog
								.open({
									template : 'views/projresources/planttransfer/plantdetailspopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.plantData = [];
												var selectedPlant = [];
												$scope.getPlantFromProjects = function() {
													var getPlantRegisterReq = {
															"status" : 1,
															"projId" : projId
														};
														PlantRegisterService
																.getPlantRegisters($scope.getPlantRegisterReq)
																.then(
																		function(data) {
																			$scope.plantData = data.plantRegisterDtlTOs;
																			$scope.plantClassMstrMap = data.plantClassMstrMap;
																			/*$scope.procureCatgMap = data.procureCatgMap;
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
												$scope.plantRegisterPopUp = function(
														projPlantRegisterTO) {
													var returnProjPlantRegisterTO = {
														"plantRegisterDtlTO" : projPlantRegisterTO
													};
													deferred
															.resolve(returnProjPlantRegisterTO);
													$scope
															.closeThisDialog();

												}
														$scope.getPlantToProjects = function(
																plantPopUp) {
															var userProjectSelection = UserEPSProjectService
																	.epsProjectPopup();
															userProjectSelection
																	.then(
																			function(
																					userEPSProjData) {
																				$scope.searchPlantProject = userEPSProjData.selectedProject;
																				plantPopUp.transferToProject = $scope.searchPlantProject.projName
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
																plantPopUp,
																projLabelKeyTO) {
															$scope.projId = $scope.searchPlantProject.projId;
															var ApproverSerivcePopup = [];
															ApproverSerivcePopup = ProjectCrewPopupService
																	.approverDetailsList($scope.projId);
															ApproverSerivcePopup
																	.then(
																			function(
																					data) {
																				console
																						.log(JSON
																								.stringify(data));
																				projLabelKeyTO.id = data.projApproverTO.userId;
																				projLabelKeyTO.code = data.projApproverTO.firstName;
																				projLabelKeyTO.name = data.projApproverTO.lastName;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting Approver List Details",
																								'Error');
																			});
														}
												$scope.addCreateRequestRowData = function() {
													if (actionType === 'Add') {
														$scope.addPlantTransfers
																.push({
																	"selected" : false,
																	"transferFromProject" : null,
																	"plantRegId" : null,
																	"transferToProject" : null,
																	"apprUserLabelKeyTO" : {
																		id : null,
																		code : null,
																		name : null
																	}
																})
													} else {
														$scope.addPlantTransfers = angular
																.copy(editCreateRequestDetails);
														editCreateRequestDetails = [];
													}
												}

														$scope.plantTranferPopUpRowSelect = function(
																plantPopUp) {
															if (plantPopUp.select) {
																selectedPlant
																		.push(plantPopUp);
															} else {
																selectedPlant
																		.pop(plantPopUp);
															}
														},
														$scope.deleteRows = function() {
															if (selectedPlant.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPlant.length < $scope.addPlantTransfers.length) {
																angular
																		.forEach(
																				selectedPlant,
																				function(
																						value,
																						key) {
																					$scope.addPlantTransfers
																							.splice(
																									$scope.addPlantTransfers
																											.indexOf(value),
																									1);
																				});
																selectedPlant = [];
																GenericAlertService
																		.alertMessage(
																				'Rows are deleted Successfully',
																				"Info");
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
												$scope.savePlantCreate = function() {
													var savePlantTransferReq = {
														"plantReqForTransTOs" : $scope.addPlantTransfers,
														//"projId" : searchProject.projId,
														"apprStatus" : 2
													}
													PlantTransferService
															.savePlantCreateTransfer(
																	savePlantTransferReq)
															.then(
																	function(
																			data) {
																		console
																				.log(JSON
																						.stringify(data));
																		GenericAlertService
																				.alertMessage(
																						'Employee Registration'
																								+ data.message,
																						data.status);
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Employee Registration are Failed to Save ',
																						"Warning");
																	});
													ngDialog.close();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
