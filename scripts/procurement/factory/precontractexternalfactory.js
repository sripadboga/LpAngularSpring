'use strict';

app
		.factory(
				'PreContractExternalFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractExternalService,
						PreContractAddCompanyFactory,
						PreContractApproverFactory, GenericAlertService,
						FileUploader) {
					var procExternalApprovalPopUp;
					var service = {};
					service.procExternalApprovalPopUp = function(data,
							selectedProject) {
						var deferred = $q.defer();
						procExternalApprovalPopUp = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/externalApproval/requestpopup.html',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {

												$scope.uploader = new FileUploader();

												$scope.currencyList = angular
														.copy(data.currencyTOs);
												$scope.contractTypes = data.preContractTypeTOs;

												$scope.projEmpClassmap = data.projEmpClassMap;
												$scope.projPlantClassmap = data.projPlantMap;
												$scope.projMaterialClassmap = data.projMaterialClassMap;
												$scope.projServiceClassmap = data.projServiceMap;
												$scope.storeClassmap = data.storeMap;
												$scope.projStoreClassmap = data.projStoreMap;
												$scope.projcostCodeMap = data.projCostItemMap;
												$scope.preContractObj = data.preContractTO;
												$scope.companyMap = data.companyMap;
												$scope.approverUserMap = data.usersMap;
												$scope.companyList = data.preContractTO.preContractCmpTOs;

												$scope.preContrctDetailTabs = [
														{
															title : 'Man Power',
															url : 'views/procurement/pre-contracts/externalApproval/precontractexternalmanpower.html'
														},
														{
															title : 'Materials',
															url : 'views/procurement/pre-contracts/externalApproval/precontractexternalmaterial.html'
														},
														{
															title : 'Plants',
															url : 'views/procurement/pre-contracts/externalApproval/precontractexternalplants.html'
														},
														{
															title : 'Services',
															url : 'views/procurement/pre-contracts/externalApproval/precontractexternalservices.html'
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

														$scope.addCompany = function() {
															var addCompanypopup = [];
															var addCompanyService = {};
															var addCompanyServiceData = [];
															var companyData = [];
															var preContractCompanyMap = [];
															addCompanyServiceData = $scope
																	.getPreContractCompanies();

															addCompanyServiceData
																	.then(
																			function(
																					data) {
																				companyData = data.precontractCmpData;
																				preContractCompanyMap = data.preContractCompanyMap;

																				addCompanypopup = PreContractAddCompanyFactory
																						.getCompanies(
																								$scope.preContractObj,
																								companyData,
																								preContractCompanyMap);
																				addCompanypopup
																						.then(
																								function(
																										data) {
																									$scope.preContractObj.preContractCmpTOs = data.preContractCmpTOs;
																								},
																								function(
																										error) {
																									GenericAlertService
																											.alertMessage(
																													"Error occured while adding companies to precontract",
																													'Error');
																								});

																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while adding companies to precontract",
																								'Error');
																			});

														},
														$scope.getPreContractCompanies = function() {
															var defferComapny = $q
																	.defer();
															var cmpGetReq = {
																"status" : 1,
																"preContractId" : $scope.preContractObj.id

															};
															PreContractExternalService
																	.getPreContratCompanies(
																			cmpGetReq)
																	.then(
																			function(
																					data) {
																				var returnCompanies = {
																					"precontractCmpData" : angular
																							.copy(data.preContractCmpTOs),
																					"preContractCompanyMap" : angular
																							.copy(data.preContractCompanyMap)
																				};
																				defferComapny
																						.resolve(returnCompanies);
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Material classes",
																								'Error');
																			});
															return defferComapny.promise;
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

														$scope.saveExternalRequest = function(
																apprvStatus) {

															var savereq = {
																"preContractTO" : $scope.preContractObj,
																"apprvStatus" : apprvStatus,
																"projId" : selectedProject.projId

															};
															console
																	.log(JSON
																			.stringify(savereq));
															PreContractExternalService
																	.saveExternalPreContracts(
																			savereq)
																	.then(
																			function(
																					data) {
																				console
																						.log(data);
																				$scope.preContractObj = data.preContractTOs[0]
																				if (apprvStatus == 2) {
																					GenericAlertService
																							.alertMessage(
																									"Bid has been sent for approval",
																									"Info");
																					ngDialog
																							.close();
																				} else {
																					GenericAlertService
																							.alertMessage(
																									"Bid has been Saved Succuessfully",
																									"Info");
																				}
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"error");
																			});
														}

														$scope.saveManPowerDetails = function() {

															var savereq = {
																"preContractEmpDtlTOs" : $scope.preContractObj.preContractEmpDtlTOs,
																"preContractId" : $scope.preContractObj.id,
																"external" : true
															};
															console
																	.log(JSON
																			.stringify(savereq));
															PreContractExternalService
																	.savePreContratEmpTypes(
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
																"external" : true
															};
															PreContractExternalService
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
																"external" : true
															};
															PreContractExternalService
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
																"external" : true
															};
															PreContractExternalService
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

														}

											} ]
								});
						return deferred.promise;
					};
					return service;

				});
