'use strict';
app
		.factory(
				'PlantProcurementFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, UserEPSProjectService,
						PlantRegisterService) {
					var plantProcurementPopUp;
					var service = {};
					service.plantProcurementPopUp = function(actionType,
							editProcurement) {
						var deferred = $q.defer();
						plantProcurementPopUp = ngDialog
								.open({
									template : 'views/projresources/projplantreg/plantprocurement/procurementpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addProcurementData = [];
												var selectedProcurement = [];
												$scope.searchPlantProject = {};
												$scope.getUserPlantProjects = function(
														procure) {
													var userProjectSelection = UserEPSProjectService
															.epsProjectPopup();
													userProjectSelection
															.then(
																	function(
																			userEPSProjData) {
																		$scope.searchPlantProject = userEPSProjData.selectedProject;
																				procure.EPSName = $scope.searchPlantProject.parentName,
																				procure.ProjectName = $scope.searchPlantProject.projName
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting EPS Project name",
																						'Error');
																	});
												}

														$scope.addProcurementRowData = function() {
															if (actionType === 'Add') {
																$scope.addProcurementData
																		.push({
																			"selected" : false,
																			"EPSName" : null,
																			"ProjectName" : null,
																			"PurchaseOrderNum" : null,
																			"PoId" : null,
																			"PoIdDescription" : null,
																			"DelDocketDate" : null,
																			"DelDocketNum" : null,
																			"DateofDel" : null,
																			"ReceivedBy" : null,
																			"DelinFullPart" : null,
																			"QntDel" : null,
																			"CuluQtyDel" : null,
																			"LocationDel" : null,
																			"CommentRec" : null,
																			"CommissionDate" : null,
																			"OdoMeterRdng" : null,
																			"RecordsofDel" : null
																		});
															} else {
																$scope.addProcurementData = angular
																		.copy(editProcurement);
																editProcurement = [];
															}
														},
														$scope.procurementDetailsPopUpRowSelect = function(
																procure) {
															if (procure.selected) {
																selectedProcurement
																		.push(procure);
															} else {
																selectedProcurement
																		.pop(procure);
															}
														},
														$scope.deleteRows = function() {
															if (selectedProcurement.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedProcurement.length < $scope.addProcurementData.length) {
																angular
																		.forEach(
																				selectedProcurement,
																				function(
																						value,
																						key) {
																					$scope.addProcurementData
																							.splice(
																									$scope.addProcurementData
																											.indexOf(value),
																									1);
																					GenericAlertService
																					.alertMessage(
																							'Rows are deleted Successfully',
																							"Info");
																				});
																
																selectedProcurement = [];
																
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
														$scope.save = function() {
															var req = {}
															PlantRegisterService
																	.savePlantRegisters(
																			req)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Procurement Details are  '
																										+ data.message,
																								data.status);
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Procurement Details are Failed to Save ',
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
