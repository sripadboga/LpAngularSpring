'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"plantregistor",
									{
										url : '/plantregistor',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projresources/projplantreg/planttabs/plantreg.html',
												controller : 'PlantRegController'
											}
										}
									})
				})
		.controller(
				"PlantRegController",
				function($rootScope, $scope, $q, $state, ngDialog,
						PlantDetailsFactory, PlantPendingRequestFactory,
						PlantPendingApprovalFactory, ProjEmpClassService,
						PlantRegisterService, GenericAlertService,
						UserEPSProjectService, $location,
						PlantProcurementFactory, PlantDeploymentFactory,
						PlantChargeFactory, PlantUtilizationFactory,
						PlantLogBookFactory, PlantServiceHistoryFactory,
						PlantDepreciationFactory, PlantNewRequestFactory) {

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
					}
					$scope.plantData = [];
					var editPlantData = [];

					var editNewRequest = [];
					$scope.searchProject = {};

					$scope.showabout = 1;
					$scope.go = function() {
						$scope.showabout = 2;
					};
					$scope.Back = function() {
						$scope.showabout = 1;
					};

					$scope.logBookData = [];
					var editLogBook = [];

					$scope.serviceHistoryData = [];
					var editServiceHistory = [];

					$scope.newRequestData = [];
					var editNewRequest = [];

					$scope.pendingApproval = [];
					var editPendingApproval = [];

					$scope.procurementData = [];
					var editProcurement = [];

					$scope.deploymentData = [];
					var editDeployment = [];

					$scope.chargeData = [];
					var editCharge = [];

					$scope.utilizationData = [];
					var editUtilization = [];

					$scope.depreciationData = [];
					var editDepreciation = [];

					$scope.pendingRequest = [];
					var editRequestApproval = [];

					$scope.plantDetailsTabs = [
							{
								title : 'Plant Details',
								url : 'views/projresources/projplantreg/plantdetails/plantdetails.html',
								innerTabs : [
										{
											title : 'Procurement and Delivery Details',
											url : 'views/projresources/projplantreg/plantprocurement/procurement.html'
										},
										{
											title : 'Deployment History',
											url : 'views/projresources/projplantreg/plantdeployment/deployment.html'
										},
										{
											title : 'Charge out Rates',
											url : 'views/projresources/projplantreg/plantcharge/charge.html'
										},
										{
											title : 'Utilization Records',
											url : 'views/projresources/projplantreg/plantutilization/plantutilization.html'
										},
										{
											title : 'Log Book Records',
											url : 'views/projresources/projplantreg/plantlogbook/plantlogbook.html'
										},
										{
											title : 'Service History and Repairs',
											url : 'views/projresources/projplantreg/plantservicehistory/servicehistory.html'
										},
										{
											title : 'Depreciation and Salvage Value',
											url : 'views/projresources/projplantreg/plantdepreciation/depreciation.html'
										},
										{
											title : 'Request for Transfer',
											url : 'views/projresources/projplantreg/planttabs/requestTabs.html',
											requestForTransferTabs : [
													{
														title : 'New Request',
														url : 'views/projresources/projplantreg/plantnewrequest/newrequest.html'
													},
													{
														title : 'Pending Request',
														url : 'views/projresources/projplantreg/plantrequestapproval/pendingrequest.html'
													},
													{
														title : 'Approved',
														url : 'views/projresources/projplantreg/approvedrequest.html'
													} ]
										},
										{
											title : 'Approval  for  transfer',
											url : 'views/projresources/projplantreg/planttabs/approvaltransferTabs.html',
											approvalForTransferTabs : [
													{
														title : 'Pending Approval',
														url : 'views/projresources/projplantreg/plantapprovaltransfer/pendingapproval.html'
													},
													{
														title : 'Approved',
														url : 'views/projresources/projplantreg/approvaltransferapproved.html'
													} ]
										} ]
							},
							{
								title : 'Current Status',
								url : 'views/projresources/projplantreg/plantstatus/currentstatus.html'
							} ];

					$scope.resetData = function() {
						$scope.searchProject = {};
						$scope.plantData = [];
					}

					$scope.getPlantRegisters = function() {
						var getPlantRegisterReq = {
							"status" : 1,
							"projId" : $scope.searchProject.projId
						};
						PlantRegisterService
								.getPlantRegisters($scope.getPlantRegisterReq)
								.then(
										function(data) {
											$scope.plantData = data.plantRegisterDtlTOs;
											$scope.plantClassMstrMap = data.plantClassMstrMap;
											$scope.procureCatgMap = data.procureCatgMap;
											$scope.plantCompanyMap = data.plantCompanyMap;
											$scope.assertTypes = data.assertTypes;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while getting Registered Plant Details",
															"Error");
										});
					}
					/* =========plantDetails tabs======= */
					$scope.currentPlantDetailsTab = 'views/projresources/projplantreg/plantdetails/plantdetails.html';
							$scope.onClickPlantDetailsTab = function(masterTabs) {
								$scope.currentPlantDetailsTab = masterTabs.url;
							},
							$scope.isActivePlantDetailsTab = function(
									masterTabsUrl) {
								return masterTabsUrl == $scope.currentPlantDetailsTab;
							}
					/* =========Inner tabs======= */
					$scope.currentInnerTab = 'views/projresources/projplantreg/plantprocurement/procurement.html';
					$scope.onClickInnerTab = function(innerTabs) {
						$scope.currentInnerTab = innerTabs.url;
					}, $scope.isActiveInnerTab = function(innerTabsUrl) {
						return innerTabsUrl == $scope.currentInnerTab;
					}
					/* =========Request for Transfer tabs======= */
					$scope.currentReqApprovalTab = 'views/projresources/projplantreg/plantnewrequest/newrequest.html';
							$scope.onClickReqApprovalTab = function(
									requestForTransferTabs) {
								$scope.currentReqApprovalTab = requestForTransferTabs.url;
							},
							$scope.isActiveReqApprovalTab = function(
									requestForTransferTabsUrl) {
								return requestForTransferTabsUrl == $scope.currentReqApprovalTab;
							}
					/* =========Approval for Transfer tabs======= */
					$scope.currentApprovalTransferTab = 'views/projresources/projplantreg/plantapprovaltransfer/pendingapproval.html';
							$scope.onClickApprovalTransferTab = function(
									approvalForTransferTabs) {
								$scope.currentApprovalTransferTab = approvalForTransferTabs.url;
							},
							$scope.isActiveApprovalTransferTab = function(
									approvalForTransferTabsUrl) {
								return approvalForTransferTabsUrl == $scope.currentApprovalTransferTab;
							}

					$scope.moreFlag = 0;
							$scope.clickMore = function(moreFlag1) {
								if ($scope.moreFlag > 0) {
									$scope.moreFlag = moreFlag1 - 1;
								}
								$scope
										.onClickInnerTab($scope.plantDetailsTabs[0].innerTabs[0]);
							},
							$scope.clickMore1 = function(moreFlag1) {
								if ($scope.moreFlag < 1) {
									$scope.moreFlag = moreFlag1 + 1;
								}
								$scope
										.onClickInnerTab($scope.plantDetailsTabs[0].innerTabs[6]);
							},

							$scope.plantRowSelect = function(plant) {
								if (plant.selected) {
									editPlantData.push(plant);

								} else {
									editPlantData.pop(plant);
								}
								
							}
							$scope.addplantList = function(actionType) {
								if (actionType == 'Edit' && editPlantData <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit ",
													'Warning');
									return;
								}
								var getPlantData = $scope.getPlantDetailsById(
										actionType);
								getPlantData
										.then(function(data) {
											var plantdetailspopup = PlantDetailsFactory
													.plantDetailsPopUp(
															data.plantObj,
															actionType,
															editPlantData,
															$scope.searchProject);
											plantdetailspopup
													.then(
															function(data) {
																//editPlantData=[];
															},
															function(error) {
																GenericAlertService
																		.alertMessage(
																				"Error occurred while fetching Plant  details",
																				'Error');
															});
										})
							}, $scope.getPlantDetailsById = function(
									actionType) {
								var plantDefer = $q.defer();
								var onLoadReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId
								};
								if (actionType == 'Edit') {
									onLoadReq = {
										"status" : 1
									};
								}
								PlantRegisterService.getPlantRegisters(
										onLoadReq).then(function(data) {
									var returnPlantObj = {
										"plantObj" : angular.copy(data)
									};
									plantDefer.resolve(returnPlantObj);
								});
								return plantDefer.promise;
							}

					$scope.deletePlantRegisters = function() {
						if (editPlantData.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.plantData = [];
						} else {
							angular.forEach(editPlantData,
									function(value, key) {
										deleteIds.push(value.id);
									});
							var req = {
								"plantIds" : deleteIds,
								"status" : 2
							};
							alert(JSON.stringify(req));
							PlantRegisterService
									.deletePlantRegisters(req)
									.then(
											function(data) {
												GenericAlertService
														.alertMessage(
																'Plant Registration Details are  Deactivated successfully',
																'Info');
											});
							angular
									.forEach(
											editPlantData,
											function(value, key) {
												$scope.plantData
														.splice(
																$scope.plantData
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant Registration Details are failed to Deactivate',
																"Error");
											});
							editPlantData = [];
							$scope.deleteIds = [];
						}
					}
					/*
					 * =======================for log book
					 * =================================
					 */

					$scope.logBookData = [ {
						"selected" : false,
						"date" : '',
						"AssName" : 'fgdg',
						"Eps" : 'rtyr',
						"Project" : 'rfyr',
						"DriverId" : 'dghyd',
						"DriverName" : 'fgd',
						"StrtMtrRdng" : 'ryhr',
						"EndMeterRdng" : 'dfgyrd',
						"NetUnit" : 'dry',
						"Purpose" : 'drfd'
					}, {
						"selected" : false,
						"date" : '',
						"AssName" : 'fgdh',
						"Eps" : 'rtyr',
						"Project" : 'rfyr',
						"DriverId" : 'dghyd',
						"DriverName" : 'fgd',
						"StrtMtrRdng" : 'ryhr',
						"EndMeterRdng" : 'dfgyrd',
						"NetUnit" : 'dry',
						"Purpose" : 'drfd'

					} ];

					$scope.logBookRowSelect = function(logbook) {
						if (logbook.selected) {
							editLogBook.push(logbook);
						} else {
							editLogBook.pop(logbook);
						}
					}

					$scope.addLogBook = function(actionType) {
						if (actionType == 'Edit' && editLogBook <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantLogBookPopup = PlantLogBookFactory
								.plantLogBookPopUp(actionType, editLogBook);
						plantLogBookPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant log book details",
															'Error');
										});
					}

					$scope.deleteLogBook = function() {
						if (editLogBook.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.logBookData = [];
						} else {
							angular.forEach(editLogBook, function(value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"plantIds" : deleteIds,
								"status" : 2
							};
							PlantRegisterService.deleteLogBook(req).then(
									function(data) {
									});
							angular
									.forEach(
											editLogBook,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Plant LogBook Details are  Deactivated successfully',
																'Info');
												$scope.logBookData
														.splice(
																$scope.logBookData
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant LogBook Details are failed to Deactivate',
																"Error");
											});
							editLogBook = [];
							$scope.deleteIds = [];
						}
					}

					/*
					 * ================For ServiceHistory Controller
					 * ==============
					 */
					$scope.serviceHistoryData = [ {
						"selected" : false,
						"date" : 'dg',
						"odoMeterRdng" : 'fgdh',
						"ServiceCateg" : 'rtyr',
						"ServiceSubCate" : 'rfyr',
						"OdoMtrReaches" : 'dghyd',
						"ServiceCate2" : 'fgd',
						"ServiceSubCate2" : 'ryhr',
						"Date2" : 'dfgyrd',
						"OdoMeterRdng2" : 'dry',
						"RepairCate" : 'drfd',
						"ItemOfRepair" : 'dghyd',
						"MajorSpare" : 'fgd',
						"UnitOfMeasure" : 'ryhr',
						"Qty" : 'dfgyrd',
						"ProjectDocket" : 'dry',
						"Notes" : 'drfd'
					}, {
						"selected" : false,
						"date" : 'dg',
						"odoMeterRdng" : 'fgdh',
						"ServiceCateg" : 'rtyr',
						"ServiceSubCate" : 'rfyr',
						"OdoMtrReaches" : 'dghyd',
						"ServiceCate2" : 'fgd',
						"ServiceSubCate2" : 'ryhr',
						"Date2" : 'dfgyrd',
						"OdoMeterRdng2" : 'dry',
						"RepairCate" : 'drfd',
						"ItemOfRepair" : 'dghyd',
						"MajorSpare" : 'fgd',
						"UnitOfMeasure" : 'ryhr',
						"Qty" : 'dfgyrd',
						"ProjectDocket" : 'dry',
						"Notes" : 'drfd'

					} ];

					$scope.serviceHistoryRowSelect = function(servicehistory) {
						if (servicehistory.selected) {
							editServiceHistory.push(servicehistory);
						} else {
							editServiceHistory.pop(servicehistory);
						}
					}

					$scope.addServiceHistory = function(actionType) {
						if (actionType == 'Edit' && editServiceHistory <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantServiceHistoryPopup = PlantServiceHistoryFactory
								.plantServiceHistoryPopUp(actionType,
										editServiceHistory);
						plantServiceHistoryPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant Service History details",
															'Error');
										});

					}
					$scope.deleteService = function() {
						if (editServiceHistory.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.serviceHistoryData = [];
						} else {
							angular.forEach(editServiceHistory, function(value,
									key) {
								deleteIds.push(value.id);
							});
							var req = {
								"plantIds" : deleteIds,
								"status" : 2
							};
							PlantRegisterService.deleteService(req).then(
									function(data) {
									});
							angular
									.forEach(
											editServiceHistory,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Plant Service History Details are  Deactivated successfully',
																'Info');
												$scope.serviceHistoryData
														.splice(
																$scope.serviceHistoryData
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant Service History Details are failed to Deactivate',
																"Error");
											});
							editServiceHistory = [];
							$scope.deleteIds = [];
						}
					}
					/*
					 * * ====================Controller for "Request for
					 * Transfer"=========================
					 */

					$scope.newRequestData = [ {
						"selected" : false,
						"dateOfReq" : 'dg',
						"originatorIdName" : 'fgdh',
						"approverPersonIdName" : 'rtyr',
						"RequisitionNotification" : 'rfyr',
						"companyAssetId" : 'dghyd',
						"RegNum" : 'fgd',
						"plantDes" : 'ryhr',
						"Make" : 'dfgyrd',
						"Model" : 'dry',
						"CurrentProjId" : 'drfd',
						"CurrentProjName" : 'dghyd',
						"ProjectId" : 'fgd',
						"ProjectName" : 'ryhr',
						"AnticipatedDemoDate" : '',
						"TransferReqDate" : '',
						"ApprvalStatus" : 'drfd',
						"DateSet" : ''
					} ];

					$scope.newRequestRowSelect = function(request) {
						if (request.selected) {
							editNewRequest.push(request);
						} else {
							editNewRequest.pop(request);
						}
					}

					$scope.addRequest = function(actionType) {
						if (actionType == 'Edit' && editNewRequest <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit ",
									'Warning');
							return;
						}
						var plantnewrequestPopup = PlantNewRequestFactory
								.plantNewRequestPopUp(actionType,
										editNewRequest);
						plantnewrequestPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant New Request  details",
															'Error');
										});
					}

					$scope.deleteNewRequest = function() {
						if (editNewRequest.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.newRequestData = [];
						} else {
							angular.forEach(editNewRequest,
									function(value, key) {
										deleteIds.push(value.id);
									});
							var req = {
								"plantIds" : deleteIds,
								"status" : 2
							};
							PlantRegisterService.deleteNewRequest(req).then(
									function(data) {
									});
							angular
									.forEach(
											editNewRequest,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Plant New Request Details are  Deactivated successfully',
																'Info');
												$scope.newRequestData
														.splice(
																$scope.newRequestData
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Plant New Request Details are failed to Deactivate',
																"Error");
											});
							editNewRequest = [];
							$scope.deleteIds = [];
						}
					}
					/*
					 * =====================for procurement
					 * Controller======================
					 */
					$scope.proRowSelect = function(procure) {
						if (procure.selected) {
							editProcurement.push(procure);
						} else {
							editProcurement.pop(procure);
						}
					}
					$scope.addProcurement = function(actionType) {
						if (actionType == 'Edit' && editProcurement <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantProcPopup = PlantProcurementFactory
								.plantProcurementPopUp(actionType,
										editProcurement);
						plantProcPopup
								.then(
										function(data) {
											editProcurement=[];
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant Procurement details",
															'Error');
										});
					}

					/*
					 * ===================for Deployment
					 * Controller==========================
					 */

					$scope.deploymentData = [ {
						"selected" : false,
						"projectDeploy" : "fghj",
						"epsId" : "fghj",
						"epsName" : "fghj",
						"projectId" : "fghj",
						"projectName" : "dfgh",
						"commissioningDate" : "dfghj",
						"assetId" : "sdfgh",
						"projectplntId" : "dfghj",
						"mobilisationDate" : "rtgyhj",
						"antiDemobilisationDate" : "xcvbn",
						"demobilisationDate" : "erfgh",
						"postDemobilisation" : "edrfgh",
						"odoMeterRdngMobi" : "erftgh",
						"odoMeterRdngDeMobi" : "edrfgh",
						"notes" : "sedfgh",
					} ];
					$scope.deployRowSelect = function(deployment) {
						if (deployment.selected) {
							editDeployment.push(deployment);
						} else {
							editDeployment.pop(deployment);
						}
					}
					$scope.addDeployment = function(actionType) {
						if (actionType == 'Edit' && editDeployment <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantDeployPopup = PlantDeploymentFactory
								.plantDeploymentPopUp(actionType,
										editDeployment);
						plantDeployPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant Deployement details",
															'Error');
										});
					}
					/* =================for Charge controller================= */

					$scope.chargeData = [ {
						"selected" : false,
						"projectDeploy" : "rdg",
						"effectiveFrom" : "dgdf",
						"epsName" : "jere",
						"projecName" : "dfgdf",
						"assertId" : "agsz",
						"projectPlntId" : "hts",
						"chargeoutUnit" : "arhearhg",
						"plntchrgOutCateg" : "aseeg",
						"currency" : "reyea",
						"rateswithfuelNormal" : "aga",
						"RateswithoufuelNormal" : "agraedra",
						"RateswithfuelDouble" : "kjhdf",
						"Rateswithoutfueldouble" : "dsgsd",
						"PlantIdleTimeCharge" : "gds",
						"plantmobilisationcostcode" : "agvgv",
						"Plantmobilisationrate" : "dvz",
						"PlantDemobilisationCostCode" : "gsdv",
						"PlantDemobilisation" : "drgzg",
						"notes" : "drgxbdzx"
					} ];

					$scope.chargeRowSelect = function(charge) {
						if (charge.selected) {
							editCharge.push(charge);
						} else {
							editCharge.pop(charge);
						}
					}

					$scope.addCharge = function(actionType) {
						if (actionType == 'Edit' && editCharge <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantChargePopup = PlantChargeFactory
								.plantChargePopUp(actionType, editCharge);
						plantChargePopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant ChargeRate details",
															'Error');
										});
					}

					/*
					 * ================controller for
					 * utilization========================
					 */

					$scope.utilizationData = [ {
						"selected" : false,
						"projectDeploy" : "aej",
						"effectiveFrom" : "eafsad",
						"epsName" : "",
						"projecName" : "wesf",
						"assertId" : "",
						"projectPlntId" : "fsdf",
						"chargeoutUnit" : "",
						"plntchrgOutCateg" : "fsdfds",
						"currency" : "",
						"rateswithfuelNormal" : "dsf",
						"RateswithoufuelNormal" : "kgff",
						"RateswithfuelDouble" : "ffsd",
						"Rateswithoutfueldouble" : "",
						"PlantIdleTimeCharge" : "",
						"plantmobilisationcostcode" : "",
						"Plantmobilisationrate" : "",
						"PlantDemobilisationCostCode" : "",
						"PlantDemobilisation" : "",
						"notes" : ""
					} ];

					$scope.utilizationRowSelect = function(utilization) {
						if (utilization.selected) {
							editUtilization.push(utilization);
						} else {
							editUtilization.pop(utilization);
						}
					}
					$scope.addUtilization = function(actionType) {
						if (actionType == 'Edit' && editUtilization <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantUtilizationPopup = PlantUtilizationFactory
								.plantUtilizationPopUp(actionType,
										editUtilization);
						plantUtilizationPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant Utilization  details",
															'Error');
										});
					}

					/*
					 * ===================for Approval
					 * controller==============================
					 */
					$scope.pendingApproval = [ {
						"selected" : false,
						"dateofRequest" : "121",
						"originatorIdName" : "jb",
						"reqNotification" : "sdvv",
						"approvaldate" : "xdv",
						"approverpersonIdName" : "vvd",
						"approverDecision" : "v xv",
						"companyassetId" : "vcvx",
						"regNum" : "vcv",
						"plntDes" : "cv",
						"make" : "cvc",
						"model" : "vbv",
						"currentprojectId" : "cvb",
						"currentprojectName" : "vb",
						"forprojId" : "rgrd",
						"forprojName" : "rdg",
						"anticipateDemodate" : "rdfg",
						"transferReqDate" : "rgr",
						"multipleplnt" : "rsfv",
						"approverDecision" : "cfvr",
						"agreedDate" : "rfgfz"
					} ];

					$scope.pendingApprovalRowSelect = function(approval) {
						if (approval.selected) {
							editPendingApproval.push(approval);
						} else {
							editPendingApproval.pop(approval);
						}
					}

					$scope.addApprovalFortransfer = function(actionType) {
						if (actionType == 'Edit' && editPendingApproval <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}
						var plantpendingapprovalPopup = PlantPendingApprovalFactory
								.plantPendingApprovalPopUp(actionType,
										editPendingApproval);
						plantpendingapprovalPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant pending approval  details",
															'Error');
										});
					}
					/*
					 * ======================controller for
					 * depreciation============================
					 */
					$scope.depreciationData = [ {
						"selected" : false,
						"projectDeploy" : "gf",
						"effectiveFrom" : "dhd",
						"epsName" : "fdf",
						"projectName" : "dfsd",
						"projectPlntId" : "dssad",
						"dateOfPurchase/commissioningDate" : "asdf",
						"MobilisationDate" : "dfd",
						"deMobilisationDate" : "asf",
						"unitOfMeasure" : "saf",
						"estimatedUsefullLife" : "asf",
						"uptoDateStage" : "fsa",
						"remainingUsefullLife" : "fdsa"
					} ];

					$scope.depreciationRowSelect = function(depreciation) {
						if (depreciation.selected) {
							editDepreciation.push(depreciation);
						} else {
							editDepreciation.pop(depreciation);
						}
					}
					$scope.addDepreciation = function(actionType) {
						if (actionType == 'Edit' && editDepreciation <= 0) {
							GenericAlertService.alertMessage(
									'Please select atleast one row to edit',
									"Warning");
							return;
						}
						var plantdepreciationPopup = PlantDepreciationFactory
								.plantDepreciationPopUp(actionType,
										editDepreciation);
						plantdepreciationPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant Depreciation and salvage details",
															'Error');
										});
					}
					$scope.showDeployment = function(remarks) {
						ngDialog
								.open({
									template : 'views/projresources/projplantreg/deploymentcommentspopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom6',
									controller : [ '$scope', function($scope) {
										$scope.remarks = remarks;
									} ]
								});
					}

					/*
					 * ======================pending
					 * Request============================
					 */
					$scope.pendingRequest = [ {
						"selected" : false,
						"dateOfReq" : 'dg',
						"originatorIdName" : 'fgdh',
						"approverPersonIdName" : 'rtyr',
						"RequisitionNotification" : 'rfyr',
						"companyAssetId" : 'dghyd',
						"RegNum" : 'fgd',
						"plantDes" : 'ryhr',
						"Make" : 'dfgyrd',
						"Model" : 'dry',
						"CurrentProjId" : 'drfd',
						"CurrentProjName" : 'dghyd',
						"ProjectId" : 'fgd',
						"ProjectName" : 'ryhr',
						"AnticipatedDemoDate" : '',
						"TransferReqDate" : '',
						"ApprvalStatus" : 'drfd',
						"DateSet" : ''
					} ];
					$scope.pendingRequestRowSelect = function(approval) {
						if (approval.selected) {
							editRequestApproval.push(approval);
						} else {
							editRequestApproval.pop(approval);
						}
					}

					$scope.addApprovalRequest = function(actionType) {
						if (actionType == 'Edit' && editRequestApproval <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}
						var plantpendingrequestPopup = PlantPendingRequestFactory
								.plantPendingRequestPopUp(actionType,
										editRequestApproval);
						plantpendingrequestPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching Plant pending request  details",
															'Error');
										});
					}

					/* ======================approvedRequest============================ */
					$scope.approvedRequest = [ {
						"selected" : false,
						"dateOfReq" : 'dg',
						"originatorIdName" : 'fgdh',
						"approverPersonIdName" : 'rtyr',
						"RequisitionNotification" : 'rfyr',
						"companyAssetId" : 'dghyd',
						"RegNum" : 'fgd',
						"plantDes" : 'ryhr',
						"Make" : 'dfgyrd',
						"Model" : 'dry',
						"CurrentProjId" : 'drfd',
						"CurrentProjName" : 'dghyd',
						"ProjectId" : 'fgd',
						"ProjectName" : 'ryhr',
						"AnticipatedDemoDate" : '',
						"TransferReqDate" : '',
						"ApprvalStatus" : 'drfd',
						"DateSet" : ''
					} ];

					/* ======================approvedTransfer============================ */

					$scope.approvedTransfer = [ {
						"selected" : false,
						"dateofRequest" : "121",
						"originatorIdName" : "jb",
						"reqNotification" : "sdvv",
						"approvaldate" : "xdv",
						"approverpersonIdName" : "vvd",
						"approverDecision" : "v xv",
						"companyassetId" : "vcvx",
						"regNum" : "vcv",
						"plntDes" : "cv",
						"make" : "cvc",
						"model" : "vbv",
						"currentprojectId" : "cvb",
						"currentprojectName" : "vb",
						"forprojId" : "rgrd",
						"forprojName" : "rdg",
						"anticipateDemodate" : "rdfg",
						"transferReqDate" : "rgr",
						"multipleplnt" : "rsfv",
						"approverDecision" : "cfvr",
						"agreedDate" : "rfgfz"
					} ];

					/*
					 * ======================plant
					 * currentStatus============================
					 */

					$scope.currentStatusData = [ {
						"EPSName" : 'dvfd',
						"projectName" : 'dxfds',
						"plntcurrent" : 'dfd',
						"purchase" : 'dfd',
						"mobilisation" : 'dgfv',
						"Anticipdemobilisation" : 'dfgvd',
						"demobilisation" : 'fdgf',
						"odometer" : 'vfxd'
					} ];
				});
