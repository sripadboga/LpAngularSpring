'use strict';

app
		.factory(
				'PreContractInternalFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractInternalService, GenericAlertService,
						ProjCostCodeService, StoreService,
						PrecontractDocUploadFactory,
						PreContractCostPopupFactory,
						PreContractProjEmpClassFactory,
						PreContractProjPlantClassFactory,
						PreContractProjServiceClassFactory,
						PreContractMaterialClassFactory,
						PreContractStoreFactory, PreContractApproverFactory) {
					var procInternalApprovalPopUp;
					var service = {};
					service.procInternalApprovalPopUp = function(data,
							selectedProject) {
						/*
						 * console .log(JSON .stringify(data));
						 */
						var deferred = $q.defer();

						procInternalApprovalPopUp = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/requestpopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {

												$scope.costcode = [];
												$scope.defaultcostcode = {};
												$scope.currentTab1 = null;
												$scope.contractTypes = data.preContractTypeTOs;
												$scope.currencyList = angular
														.copy(data.currencyTOs);
												$scope.projEmpClassmap = data.projEmpClassMap;
												$scope.projPlantClassmap = data.projPlantMap;
												$scope.projMaterialClassmap = data.projMaterialClassMap;
												$scope.projServiceClassmap = data.projServiceMap;
												$scope.storeClassmap = data.storeMap;
												$scope.projStoreClassmap = data.projStoreMap;
												$scope.projcostCodeMap = data.projCostItemMap;
												$scope.approverUserMap = data.usersMap;
												$scope.preContractObj = data.preContractTO;
												var deleteEmpDtlIds = [];
												var deletePlantDtlIds = [];
												var deleteMaterialDtlds = [];
												var deleteServiceDtlIds = [];

												$scope.preContrctDetailTabs = [
														{
															title : 'Man Power',
															url : 'views/procurement/pre-contracts/internalApproval/precontractinternalmanpower.html'
														},
														{
															title : 'Materials',
															url : 'views/procurement/pre-contracts/internalApproval/precontractinternalmaterial.html'
														},
														{
															title : 'Plants',
															url : 'views/procurement/pre-contracts/internalApproval/precontractinternalplants.html'
														},
														{
															title : 'Services',
															url : 'views/procurement/pre-contracts/internalApproval/precontractinternalservices.html'
														} ];

												$scope.onClickTab1 = function(
														tab) {
													$scope.currentTab1 = tab.url;
													$scope
															.isActiveTab1($scope.currentTab1);
												}
												$scope.isActiveTab1 = function(
														tabUrl) {
													return tabUrl == $scope.currentTab1;
												}
												$scope
														.onClickTab1($scope.preContrctDetailTabs[0]);

														$scope.projCostCodeDetails = function(
																projCostCodeLabelKeyTO) {
															var projCostCodePopup = PreContractCostPopupFactory
																	.getProjCostDetails(selectedProject.projId);
															projCostCodePopup
																	.then(
																			function(
																					data) {
																				projCostCodeLabelKeyTO.id = data.projCostStmtDtlTO.id;
																				projCostCodeLabelKeyTO.referenceId = data.projCostStmtDtlTO.costId;
																				projCostCodeLabelKeyTO.code = data.projCostStmtDtlTO.code;
																				projCostCodeLabelKeyTO.name = data.projCostStmtDtlTO.name;

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting project cost codes",
																								'Error');
																			});
														},
														$scope.getUsersByModulePermission = function() {
															var approverFactoryPopup = [];
															approverFactoryPopup = PreContractApproverFactory
																	.getUsersByModulePermission();
															approverFactoryPopup
																	.then(
																			function(
																					data) {
																				$scope.preContractObj.preContractReqApprTO.apprUserLabelkeyTO = data.approverUserTO;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while gettting approver users",
																								'Error');
																			});
														},
														$scope.projEmpClassDetails = function(
																projEmpClassLabelKeyTO) {
															var projEmpClassDetailsPopup = PreContractProjEmpClassFactory
																	.getProjEmpClasses(selectedProject.projId);
															projEmpClassDetailsPopup
																	.then(
																			function(
																					data) {
																				projEmpClassLabelKeyTO.id = data.projEmpclassTO.id;
																				projEmpClassLabelKeyTO.code = data.projEmpclassTO.code;
																				projEmpClassLabelKeyTO.name = data.projEmpclassTO.name;

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting project employee classes",
																								'Error');
																			});
														},
														$scope.projPlantClassDetails = function(
																projPlantClassLabelKeyTO) {
															var projPlantClassDetailsPopup = PreContractProjPlantClassFactory
																	.getProjPlantClasses(selectedProject.projId);
															projPlantClassDetailsPopup
																	.then(
																			function(
																					data) {
																				projPlantClassLabelKeyTO.id = data.projPlantClassTO.id;
																				projPlantClassLabelKeyTO.code = data.projPlantClassTO.code;
																				projPlantClassLabelKeyTO.name = data.projPlantClassTO.name;
																				projPlantClassLabelKeyTO.unitOfMeasure = data.projPlantClassTO.measureUnitTO.name;

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting project plant classes",
																								'Error');
																			});
														},

														$scope.projmaterialClassDetails = function(
																projMaterialClassLabelKeyTO) {
															var projMaterialClassDetailsPopup = PreContractMaterialClassFactory
																	.getProjMaterialClasses(selectedProject.projId);
															projMaterialClassDetailsPopup
																	.then(
																			function(
																					data) {
																				projMaterialClassLabelKeyTO.id = data.projMaterialclassTO.id;
																				projMaterialClassLabelKeyTO.code = data.projMaterialclassTO.code;
																				projMaterialClassLabelKeyTO.name = data.projMaterialclassTO.name;
																				projMaterialClassLabelKeyTO.unitOfMeasure = data.projMaterialClassTO.measureUnitTO.name;

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting project material classes",
																								'Error');
																			});
														},
														$scope.serviceClassDetails = function(
																serviceClassLabelKeyTO) {
															var serviceClassificationPopup = PreContractProjServiceClassFactory
																	.getServiceClasses(selectedProject.clientId);
															serviceClassificationPopup
																	.then(
																			function(
																					data) {
																				serviceClassLabelKeyTO.id = data.serviceClassTO.id;
																				serviceClassLabelKeyTO.code = data.serviceClassTO.code;
																				serviceClassLabelKeyTO.name = data.serviceClassTO.name;

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting service classes",
																								'Error');
																			});
														},
														$scope.selectDeliveryPlace = function(
																storeLabelKeyTO,
																projStoreLabelKeyTO) {
															var storeYardPopup = PreContractStoreFactory
																	.getStocks(
																			selectedProject.clientId,
																			selectedProject.projId);
															storeYardPopup
																	.then(
																			function(
																					data) {

																				if (data.type === 2) {
																					projStoreLabelKeyTO.id = data.storeStockTO.id;
																					projStoreLabelKeyTO.code = data.storeStockTO.code;
																				} else {
																					storeLabelKeyTO.id = data.storeStockTO.id;
																					storeLabelKeyTO.code = data.storeStockTO.code;
																				}
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Store Delivery Details",
																								'Error');
																			});
														},
														$scope.addManPowerRows = function() {
															$scope.preContractObj.preContractEmpDtlTOs
																	.push({
																		"select" : false,
																		"itemCode" : null,
																		"itemDesc" : null,
																		"preContractId" : $scope.preContractObj.id,
																		"projEmpLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"storeLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projStoreLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projCostLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"quantity" : null,
																		"startDate" : new Date(),
																		"finishDate" : new Date(),
																		"apprStatus" : null
																	});
														},

														$scope.addPlantRows = function() {
															$scope.preContractObj.preContractPlantDtlTOs
																	.push({
																		"select" : false,
																		"itemCode" : '',
																		"itemDesc" : '',
																		"preContractId" : $scope.preContractObj.id,
																		"projPlantLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null,
																			"unitOfMeasure" : null
																		},
																		"storeLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projStoreLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projCostLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"quantity" : null,
																		"startDate" : new Date(),
																		"finishDate" : new Date(),
																		"apprStatus" : null
																	});
														},
														$scope.addMaterialRows = function() {
															$scope.preContractObj.preContractMaterialDtlTOs
																	.push({
																		"select" : false,
																		"itemCode" : '',
																		"itemDesc" : '',
																		"preContractId" : $scope.preContractObj.id,
																		"projMaterialLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null,
																			"unitOfMeasure" : null
																		},
																		"storeLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projStoreLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projCostLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"quantity" : null,
																		"startDate" : new Date(),
																		"finishDate" : new Date(),
																		"apprStatus" : null
																	});
														},
														$scope.addServiceRows = function() {
															$scope.preContractObj.preContractServiceDtlTOs
																	.push({
																		"select" : false,
																		"itemCode" : '',
																		"itemDesc" : '',
																		"preContractId" : $scope.preContractObj.id,
																		"projServiceLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"storeLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projStoreLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"projCostLabelKey" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},
																		"quantity" : null,
																		"startDate" : new Date(),
																		"finishDate" : new Date(),
																		"apprStatus" : null
																	});
														},
														$scope.deleteManPowerDetails = function() {
															deleteEmpDtlIds = [];
															var tempInternalRequest = [];
															var flag = false;
															angular
																	.forEach(
																			$scope.preContractObj.preContractEmpDtlTOs,
																			function(
																					value,
																					key) {
																				if (!value.select) {
																					tempInternalRequest
																							.push(value);
																				} else {
																					if (value.id > 0) {
																						deleteEmpDtlIds
																								.push(value.id);
																					}
																					flag = true;
																				}
																			});
															if (!flag) {
																GenericAlertService
																		.alertMessage(
																				"please select records to delete",
																				"Warning");

															}
															$scope.preContractObj.preContractEmpDtlTOs = tempInternalRequest;
														},
														$scope.deletePlantDetails = function() {
															deletePlantDtlIds = [];
															var tempInternalRequest = [];
															var flag = false;
															angular
																	.forEach(
																			$scope.preContractObj.preContractPlantDtlTOs,
																			function(
																					value,
																					key) {
																				if (!value.select) {
																					tempInternalRequest
																							.push(value);
																				} else {
																					if (value.id > 0) {
																						deletePlantDtlIds
																								.push(value.id);
																					}
																					flag = true;
																				}
																			});
															if (!flag) {
																GenericAlertService
																		.alertMessage(
																				"please select records to delete",
																				"Warning");

															}
															$scope.preContractObj.preContractPlantDtlTOs = tempInternalRequest;
														},
														$scope.deleteMaterialDetails = function() {
															deleteMaterialDtlds=[];
															var tempInternalRequest = [];
															var flag = false;
															angular
																	.forEach(
																			$scope.preContractObj.preContractMaterialDtlTOs,
																			function(
																					value,
																					key) {
																				if (!value.select) {
																					tempInternalRequest
																							.push(value);
																				} else {
																					if (value.id > 0) {
																						deleteMaterialDtlds
																								.push(value.id);
																					}
																					flag = true;
																				}
																			});
															if (!flag) {
																GenericAlertService
																		.alertMessage(
																				"please select records to delete",
																				"Warning");

															}
															$scope.preContractObj.preContractMaterialDtlTOs = tempInternalRequest;
														},
														$scope.deleteServiceDetails = function() {
															deleteServiceDtlIds=[];
															var tempInternalRequest = [];
															var flag = false;
															angular
																	.forEach(
																			$scope.preContractObj.preContractServiceDtlTOs,
																			function(
																					value,
																					key) {
																				if (!value.select) {
																					tempInternalRequest
																							.push(value);
																				} else {
																					if (value.id > 0) {
																						deleteServiceDtlIds
																								.push(value.id);
																					}
																					flag = true;
																				}
																			});
															if (!flag) {
																GenericAlertService
																		.alertMessage(
																				"please select records to delete",
																				"Warning");

															}
															$scope.preContractObj.preContractServiceDtlTOs = tempInternalRequest;
														},
														$scope.saveInternalRequest = function(
																apprvStatus) {
														
															var validateFalg = true;
															if (apprvStatus == 2) {
																validateFalg = $scope
																		.validateProcurmentDetails();
															}
															if (apprvStatus == 2) {
																validateFalg = $scope
																		.validateApproverId();
															}
															if (validateFalg) {
																var savereq = {
																	"preContractTO" : $scope.preContractObj,
																	"apprvStatus" : apprvStatus,
																	"projId" : selectedProject.projId

																};
																console
																		.log(JSON
																				.stringify(savereq));
																PreContractInternalService
																		.saveInternalPreContracts(
																				savereq)
																		.then(
																				function(
																						data) {
																					console
																							.log(JSON
																									.stringify(data));

																					$scope.preContractObj = data.preContractTOs[0]

																					GenericAlertService
																							.alertMessage(
																									"Approval "
																											+ data.message,
																									data.status);
																				},

																				function(
																						error) {
																					GenericAlertService
																							.alertMessage(
																									"Internal Approval Failed To save",
																									"Error");
																				});
															}

														},

														$scope.validateProcurmentDetails = function() {
															if ($scope.preContractObj.preContractEmpDtlTOs != null
																	&& $scope.preContractObj.preContractEmpDtlTOs.length > 0) {
																return true;
															} else if ($scope.preContractObj.preContractPlantDtlTOs != null
																	&& $scope.preContractObj.preContractPlantDtlTOs.length > 0) {
																return true;
															} else if ($scope.preContractObj.preContractMaterialDtlTOs != null
																	&& $scope.preContractObj.preContractMaterialDtlTOs.length > 0) {
																return true;
															} else if ($scope.preContractObj.preContractServiceDtlTOs != null
																	&& $scope.preContractObj.preContractServiceDtlTOs.length > 0) {
																return true;
															} else {
																GenericAlertService
																		.alertMessage(
																				"Please add atleast any one of procurement records",
																				"Warning");
															}
															return false;

														},
														$scope.validateApproverId = function() {
															if ($scope.preContractObj.preContractReqApprTO.apprUserLabelkeyTO != null
																	&& $scope.preContractObj.preContractReqApprTO.apprUserLabelkeyTO.id > 0) {
																return true;
															} else {
																GenericAlertService
																		.alertMessage(
																				"Please select approver  user",
																				"Warning");
																return false;
															}

														},
														$scope.validateTabsData = function() {
															if ($scope.procureForm.$valid) {
																return true;
															} else {
																GenericAlertService
																		.alertMessage(
																				"Please enter manpower details",
																				"Warning");
																return false;
															}

														},

														$scope.saveManPowerDetails = function() {
															var savereq = {
																"preContractEmpDtlTOs" : $scope.preContractObj.preContractEmpDtlTOs,
																"preContractId" : $scope.preContractObj.id,
																"empDtlIds" : deleteEmpDtlIds
															};
															console
																	.log(JSON
																			.stringify(savereq));
															PreContractInternalService
																	.saveManPowerDetails(
																			savereq)
																	.then(
																			function(
																					data) {
																				$scope.preContractObj.preContractEmpDtlTOs = data.preContractEmpDtlTOs
																				GenericAlertService
																						.alertMessage(
																								"Success",
																								"Info");
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"error");
																			});

														},

														$scope.savePlantDetails = function() {

															var savereq = {
																"preContractPlantDtlTOs" : $scope.preContractObj.preContractPlantDtlTOs,
																"preContractId" : $scope.preContractObj.id,
																"plantDtlIds" : deletePlantDtlIds
															};
															PreContractInternalService
																	.savePreContratPlants(
																			savereq)
																	.then(
																			function(
																					data) {
																				$scope.preContractObj.preContractPlantDtlTOs = data.preContractPlantDtlTOs

																				GenericAlertService
																						.alertMessage(
																								"Success",
																								"Info");
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"error");
																			});

														},
														$scope.saveMaterialDetails = function() {

															var savereq = {
																"preContractMaterialDtlTOs" : $scope.preContractObj.preContractMaterialDtlTOs,
																"preContractId" : $scope.preContractObj.id,
																"materialDtlIds" : deleteMaterialDtlds
															};
															PreContractInternalService
																	.savePreContratMaterials(
																			savereq)
																	.then(
																			function(
																					data) {
																				$scope.preContractObj.preContractMaterialDtlTOs = data.preContractMaterialDtlTOs

																				GenericAlertService
																						.alertMessage(
																								"Success",
																								"Info");
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"error");
																			});

														},
														$scope.saveServiceDetails = function() {

															var savereq = {
																"preContractServiceDtlTOs" : $scope.preContractObj.preContractServiceDtlTOs,
																"preContractId" : $scope.preContractObj.id,
																"serviceDtlIds" : deleteServiceDtlIds
															};
															PreContractInternalService
																	.savePreContratServices(
																			savereq)
																	.then(
																			function(
																					data) {
																				$scope.preContractObj.preContractServiceDtlTOs = data.preContractServiceDtlTOs

																				GenericAlertService
																						.alertMessage(
																								"Success",
																								"Info");
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"error");
																			});

														},
														$scope.uploadContractDocs = function(
																contractId) {
															PrecontractDocUploadFactory
																	.uplodPreContractDocs(contractId);
														}

											} ]
								});
						return deferred.promise;
					};
					return service;

				});
