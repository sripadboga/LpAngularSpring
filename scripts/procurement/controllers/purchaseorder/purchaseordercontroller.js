'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"purchaseorder",
									{
										url : '/purchaseorder',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/procurement/purchaseorders/purchaseorder.html',
												controller : 'PurchaseOrderController'
											}
										}
									})
				})
		.controller(
				"PurchaseOrderController",
				function($rootScope, $scope, $state, ngDialog, $q,
						PurchaseOrderService, GenericAlertService,
						UserEPSProjectService, PurchaseOrderFactory,
						PreContractInternalService, PurchaseInternalFactory,
						InvoiceDeatilsFactory, PreContractExternalService,
						AssetResourceDeatilsFactory,
						PurchaseExternalDetailsFactory,
						PurchaseOrderDetailsFactory) {
					var editPurchaseReq = [];
					$scope.companyMap = [];
					$scope.usersMap = [];
					$scope.purchaseOrdersList = [];
					$scope.selectedProject = {};
					$scope.contractStatus = {};
					$scope.searchProject = {};
					$scope.purchaseFlag = 0;
					var selectedPurchaseOrders = [];
							$scope.clickForwardPurchaseData = function(
									purchaseFlag1) {
								if ($scope.purchaseFlag < 3) {
									$scope.purchaseFlag = purchaseFlag1 + 1;
								}
							},
							$scope.clickBackwardPurchaseData = function(
									purchaseFlag1) {
								if ($scope.purchaseFlag > 0) {
									$scope.purchaseFlag = purchaseFlag1 - 1;
								}
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
							$scope.getPurchaseOrderSearch = function(projId) {
								var purchaseReq = {
									"projId" : projId,
									"status" : 1
								};
								if (projId == undefined || projId <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select project ",
													'Warning');
									return;
								}
								PurchaseOrderService
										.getPurchaseOrders(purchaseReq)
										.then(
												function(data) {

													$scope.companyMap = data.companyMap;
													$scope.usersMap = data.usersMap;
													$scope.purchaseOrdersList = data.purchaseOrderTOs;
													if ($scope.purchaseOrdersList.length <= 0) {
														GenericAlertService
																.alertMessage(
																		"Precontracts are not aviable for given search criteria",
																		'Warning');
													}

												},

												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Purchase Orders",
																	'Error');

												});

							},
							$scope.rowSelect = function(req) {
								if (req.select) {
									editPurchaseReq.push(req);
								} else {
									editPurchaseReq.pop(req);
								}

							},
							$scope.resetPurchaseOrderData = function() {

								$scope.searchProject = {};
								$scope.purchaseOrdersList = [];
							},
							$scope.viewPurchaseOrderDetails = function(
									searchProject, purchaseOrder) {

								var purchaseOrderDetails = $scope
										.getPurchaseOrderDetailsByCmpId(
												searchProject, purchaseOrder);
								purchaseOrderDetails
										.then(
												function(data) {
													var popupDetails = PurchaseOrderDetailsFactory
															.getPurchaseOrderDetails(
																	data.preContractObj,
																	purchaseOrder);
													popupDetails
															.then(
																	function(
																			data) {
																		$scope.companyMap = data.companyMap;
																		$scope.usersMap = data.usersMap;
																		$scope.purchaseOrdersList = data.purchaseOrderTOs;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occurred while adding purchase order",
																						'Info');
																	});
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while adding purchase order",
																	'Info');
												});

							},
							$scope.getPurchaseOrderDetailsByCmpId = function(
									searchProject, purchaseOrder) {
								var purchaseOrderDefer = $q.defer();

								var onLoadReq = {
									"preContractId" : purchaseOrder.preContractCmpTO.preContractId,
									"contractCmpId" : purchaseOrder.preContractCmpTO.id,
									"projId" : purchaseOrder.projId,
									"clientId" : searchProject.clientId,
									"status" : 1
								};

								PurchaseOrderService
										.getPurchaseOrderDetails(onLoadReq)
										.then(
												function(data) {
													var returnPreContractObj = {
														"preContractObj" : angular
																.copy(data)
													};
													purchaseOrderDefer
															.resolve(returnPreContractObj);
												});
								return purchaseOrderDefer.promise;

							},

							$scope.getInternalPrecontractDetails = function(
									purchaseOrder) {
								var internalDetails = $scope
										.getInternalPrecontractDetailsById(purchaseOrder);
								internalDetails
										.then(
												function(data) {
													var popupDetails = PurchaseInternalFactory
															.procPurchasePopUp(data.preContractObj);
													popupDetails
															.then(
																	function(
																			data) {
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occurred while getting request approvals",
																						'Info');
																	})
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting request approvals",
																	'Info');
												})

							},

							$scope.getInternalPrecontractDetailsById = function(
									purchaseOrder) {
								var internalDefer = $q.defer();
								var onLoadReq = {
									"projId" : purchaseOrder.projId,
									"status" : 1,
									"contractId" : purchaseOrder.preContractCmpTO.preContractId
								};

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

							}

							$scope.getExternalRequest = function(purchaseOrder) {
								var externalDetails = $scope
										.getExternalPrecontractDetailsById(purchaseOrder);
								externalDetails
										.then(
												function(data) {
													var externalDetailsPopup = PurchaseExternalDetailsFactory
															.purchaseExternalPopUp(data.preContractObj);
													externalDetailsPopup
															.then(
																	function(
																			data) {
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occurred while getting external details",
																						'Info');
																	})
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting external details",
																	'Info');
												})

							},

							$scope.getExternalPrecontractDetailsById = function(
									purchaseOrder) {
								var externalDefer = $q.defer();
								var onLoadReq = {
									"status" : 1,
									"projId" : purchaseOrder.projId,
									"contractId" : purchaseOrder.preContractCmpTO.preContractId
								};

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

							}

							$scope.getInvoiceDetails = function(purchaseOrder) {
								var popupInvoice = InvoiceDeatilsFactory
										.invoiceDetails(purchaseOrder);
								popupInvoice
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting invoice details",
																	'Info');
												})
							},
							$scope.getAssetsResourceDetails = function(
									purchaseOrder) {
								var popupInvoice = AssetResourceDeatilsFactory
										.resourceDetails(purchaseOrder);
								popupInvoice
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting resource details",
																	'Info');
												})
							},

							$scope.getPurchaseOrderDetails = function(
									searchProject, purchaseOrder) {
								var popupDetails = PurchaseOrderDetailsFactory
										.getPurchaseOrderDetails(searchProject,
												purchaseOrder);
								popupDetails
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while getting PurchaseBidAnalysis",
																	'Info');
												})
							}
							$scope.selectPurchaseOrders = function(
									selectedPurchaseOrder) {
								selectedPurchaseOrders
										.push(selectedPurchaseOrder);
								selectedPurchaseOrder.editMode = true;
							},
							$scope.savePurchaseOrders = function() {
								var savereq = {
									"purchaseOrderTOs" : selectedPurchaseOrders,
									"projId" : $scope.searchProject.projId
								};
								if ($scope.searchProject.projId == undefined
										|| $scope.searchProject.projId <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select project ",
													'Warning');
									return;
								}
								PurchaseOrderService
										.savePurchaseOrders(savereq)
										.then(
												function(data) {
													$scope.purchaseOrdersList = data.purchaseOrderTOs;
													selectedPurchaseOrders = [];
													GenericAlertService
															.alertMessage(
																	"Purchase Orders are "
																			+ data.message,
																	data.status);
												},

												function(error) {

													GenericAlertService
															.alertMessage(
																	"Purchase Order Details Failed To save",
																	"error");

												});

							}
				});