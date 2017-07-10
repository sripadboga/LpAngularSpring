'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:RoleController
 * @description # Role Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state('invoicepayment', {
				url : '/invoicepayment',
				parent : 'site',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/invoice/invoicepayment.html',
						controller : 'InvoicePaymentController'
					}
				}
			})
		})
		.controller(
				'InvoicePaymentController',
				function($rootScope, $scope, $state, InvoiceService,
						UserEPSProjectService, PurchaseOrderService,
						PreContractExternalService, InvoiceWisePaymentFactory,
						PurchaseOrderWisePaymentFactory, GenericAlertService) {

					$scope.searchProject = {};
					$scope.purchaseOrdersList = [];
					var editManpowerInvoice = [];
					var editManpowerPOPayment = [];
					var editMaterialInvoice = [];
					var editMaterialPOPayment = [];
					var editPlantInvoice = [];
					var editPlantPOPayment = [];
					var editServicesInvoice = [];
					var editServicesPOPayment = [];
					$scope.currentInvoiceTab = null;
					$rootScope.itemId = null;

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
							$scope.resetInvoiceData = function() {
								$scope.searchProject = {};
								$scope.purchaseOrdersList = [];
							},

							$scope.invoiceDetailTabs = [
									{
										title : 'Man Power',
										url : 'views/invoice/manpower/invoicemanpower.html',
										childTabs : [
												{
													title : 'Invoice Wise Payment Status',
													url : 'views/invoice/manpower/manpowerinvoicewisepaymentstatus.html'

												},
												{
													title : 'Purchase Order Wise Payment Status',
													url : 'views/invoice/manpower/manpowerpurchaseorderwisepaymentstatus.html'
												} ]
									},
									{
										title : 'Materials',
										url : 'views/invoice/material/invoicematerial.html',
										childTabs : [
												{
													title : 'Invoice Wise Payment Status',
													url : 'views/invoice/material/materialinvoicewisepaymentstatus.html'

												},
												{
													title : 'Purchase Order Wise Payment Status',
													url : 'views/invoice/material/materialpurchaseorderwisepaymentstatus.html'
												} ]
									},
									{
										title : 'Plants',
										url : 'views/invoice/plants/invoiceplants.html',
										childTabs : [
												{
													title : 'Invoice Wise Payment Status',
													url : 'views/invoice/plants/plantinvoicewisepaymentstatus.html'

												},
												{
													title : 'Purchase Order Wise Payment Status',
													url : 'views/invoice/plants/plantpurchaseorderwisepaymentstatus.html'
												} ]
									},
									{
										title : 'Services',
										url : 'views/invoice/services/invoiceservices.html',
										childTabs : [
												{
													title : 'Invoice Wise Payment Status',
													url : 'views/invoice/services/servicesinvoicewisepaymentstatus.html'

												},
												{
													title : 'Purchase Order Wise Payment Status',
													url : 'views/invoice/services/servicespurchaseorderwisepaymentstatus.html'
												} ]
									} ];

							$scope.onClickInvoiceTab = function(invoiceTab) {
								if ($scope.invoiceDetailTabs[0].url === invoiceTab.url) {
									$scope
											.onClickManpowerTab($scope.invoiceDetailTabs[0].childTabs[0]);
								}
								if ($scope.invoiceDetailTabs[1].url === invoiceTab.url) {
									$scope
											.onClickMaterialTab($scope.invoiceDetailTabs[1].childTabs[0]);
								}
								if ($scope.invoiceDetailTabs[2].url === invoiceTab.url) {
									$scope
											.onClickPlantTab($scope.invoiceDetailTabs[2].childTabs[0]);
								}
								if ($scope.invoiceDetailTabs[3].url === invoiceTab.url) {
									$scope
											.onClickServiceTab($scope.invoiceDetailTabs[3].childTabs[0]);
								}
								$scope.currentInvoiceTab = invoiceTab.url;
							},
							$scope.isActiveInvoiceTab = function(invoiceTabUrl) {
								return invoiceTabUrl == $scope.currentInvoiceTab;
							},

							// Manpower Child Tabs
							$scope.onClickManpowerTab = function(manpowerTab) {
								$scope.currentManpowerTab = manpowerTab.url;
								$scope
										.isActiveManpowerTab($scope.currentManpowerTab);
							},
							$scope.isActiveManpowerTab = function(
									manpowerTabUrl) {
								return manpowerTabUrl == $scope.currentManpowerTab;
							},

							// Material Child Tabs
							$scope.onClickMaterialTab = function(materialTab) {
								$scope.currentMaterialTab = materialTab.url;
								$scope
										.isActiveMaterialTab($scope.currentMaterialTab);
							},
							$scope.isActiveMaterialTab = function(
									materialTabUrl) {
								return materialTabUrl == $scope.currentMaterialTab;
							},

							// Plant Child Tabs
							$scope.onClickPlantTab = function(plantTab) {
								$scope.currentPlantTab = plantTab.url;
								$scope.isActivePlantTab($scope.currentPlantTab);
							},
							$scope.isActivePlantTab = function(plantTabUrl) {
								return plantTabUrl == $scope.currentPlantTab;
							},

							// Services Child Tabs
							$scope.onClickServiceTab = function(serviceTab) {
								$scope.currentServiceTab = serviceTab.url;
								$scope
										.isActiveServiceTab($scope.currentServiceTab);
							},
							$scope.isActiveServiceTab = function(serviceTabUrl) {
								return serviceTabUrl == $scope.currentServiceTab;
							},

							$scope.getInvoiceDetails = function(projId) {
								$scope
										.onClickInvoiceTab($scope.invoiceDetailTabs[0]);
								if (projId == undefined || projId == null) {
									GenericAlertService
											.alertMessage(
													"Please select project to get invoice details",
													'Warning');
								}
								var getInvoiceDtlReq = {
									"status" : 1,
									"projId" : projId
								};
								console.log(JSON.stringify(getInvoiceDtlReq));
								PurchaseOrderService
										.getPurchaseOrders(getInvoiceDtlReq)
										.then(
												function(data) {
													console.log(JSON
															.stringify(data));
													$scope.purchaseOrdersList = data.purchaseOrderTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Purchase Orders",
																	'Error');
												});
							},
							$scope.getExternalRequest = function(purchaseOrder) {
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
													$scope.companyList = data.preContractTO.preContractCmpTOs;
												});
							},
							
							$scope.itemRowSelect = function(item) {
								$rootScope.itemId = item.id;
							},
							
							$scope.manpowerInvoiceRowSelect = function(
									manpowerInvoice) {
								if (manpowerInvoice.selected) {
									editManpowerInvoice.push(manpowerInvoice);
								} else {
									editManpowerInvoice.pop(manpowerInvoice);
								}
							}
							$scope.addInvoicePayment = function(actionType) {
								var itemId = $rootScope.itemId;
								if (actionType == 'Edit'
										&& editManpowerInvoice <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (itemId != undefined
										&& itemId != null) {
									var invoicePaymentPopup = InvoiceWisePaymentFactory
											.invoicePaymentDetails(actionType,
													editManpowerInvoice, itemId);
									invoicePaymentPopup
											.then(
													function(data) {
														$scope.InvoicePaymentData = data.invoicePaymentTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching Invoice Payment details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select One Item ID",
											'Warning');
								}
							}, 
							
							$scope.manpowerPORowSelect = function(item) {
								if (item.selected) {
									editManpowerPOPayment.push(item);
								} else {
									editManpowerPOPayment.pop(item);
								}
							}
							$scope.addManpowerPOPayment = function(actionType) {
								var itemId = $rootScope.itemId;
								if (actionType == 'Edit' && editManpowerPOPayment <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (itemId != undefined
										&& itemId != null) {
									var invoicePOPopup = PurchaseOrderWisePaymentFactory
											.purchaseOrderPaymentDetails(
													actionType,
													editManpowerPOPayment, itemId);
									invoicePOPopup
											.then(
													function(data) {
														$scope.InvoicePaymentData = data.invoicePaymentTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching Invoice Payment details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select One Item ID",
											'Warning');
								}
							},
							$scope.deactivateManpowerInvoice = function() {
								if (editInvoicePayment == undefined
										|| editInvoicePayment.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one Manpower Invoice to Deactivate",
													"Warning");
									return;
								}
								var deactivateManpowerInvoiceReq = {
									"projCostItemIds" : editInvoicePayment,
									"status" : 2
								};
								console
										.log(JSON
												.stringify(deactivateManpowerInvoiceReq));
								InvoiceService
										.deactivateManpowerInvoice(
												deactivateManpowerInvoiceReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"Details Deactivated successfully",
																	"Info");
													deactivateData = [];
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Deactivating Manpower Invoice Details",
																	"Error");
												});
							},
							$scope.deactivateManpowerPO = function() {
								if (editManpowerPOPayment == undefined
										|| editManpowerPOPayment.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one Manpower Purchase Order to Deactivate",
													"Warning");
									return;
								}
								var deactivateManpowerPOReq = {
									"projCostItemIds" : editManpowerPOPayment,
									"status" : 2
								};
								console
										.log(JSON
												.stringify(deactivateManpowerPOReq));
								InvoiceService
										.deactivateManpowerPO(
												deactivateManpowerPOReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"Details Deactivated successfully",
																	"Info");
													deactivateData = [];
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Deactivating Manpower Purchase Oreder Details",
																	"Error");
												});
							},
							
							
							$scope.materialInvoiceRowSelect = function(
									materialInvoice) {
								if (materialInvoice.selected) {
									editMaterialInvoice.push(materialInvoice);
								} else {
									editMaterialInvoice.pop(materialInvoice);
								}
							}
							$scope.addInvoicePayment = function(actionType) {
								var itemId = $rootScope.itemId;
								if (actionType == 'Edit'
										&& editManpowerInvoice <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (itemId != undefined
										&& itemId != null) {
									var invoicePaymentPopup = InvoiceWisePaymentFactory
											.invoicePaymentDetails(actionType,
													editManpowerInvoice, itemId);
									invoicePaymentPopup
											.then(
													function(data) {
														$scope.InvoicePaymentData = data.invoicePaymentTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching Invoice Payment details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select One Item ID",
											'Warning');
								}
							}, 
							
							$scope.manpowerPORowSelect = function(item) {
								if (item.selected) {
									editManpowerPOPayment.push(item);
								} else {
									editManpowerPOPayment.pop(item);
								}
							}
							$scope.addManpowerPOPayment = function(actionType) {
								var itemId = $rootScope.itemId;
								if (actionType == 'Edit' && editManpowerPOPayment <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (itemId != undefined
										&& itemId != null) {
									var invoicePOPopup = PurchaseOrderWisePaymentFactory
											.purchaseOrderPaymentDetails(
													actionType,
													editManpowerPOPayment, itemId);
									invoicePOPopup
											.then(
													function(data) {
														$scope.InvoicePaymentData = data.invoicePaymentTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching Invoice Payment details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select One Item ID",
											'Warning');
								}
							},
							$scope.deactivateManpowerInvoice = function() {
								if (editInvoicePayment == undefined
										|| editInvoicePayment.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one Manpower Invoice to Deactivate",
													"Warning");
									return;
								}
								var deactivateManpowerInvoiceReq = {
									"projCostItemIds" : editInvoicePayment,
									"status" : 2
								};
								console
										.log(JSON
												.stringify(deactivateManpowerInvoiceReq));
								InvoiceService
										.deactivateManpowerInvoice(
												deactivateManpowerInvoiceReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"Details Deactivated successfully",
																	"Info");
													deactivateData = [];
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Deactivating Manpower Invoice Details",
																	"Error");
												});
							},
							$scope.deactivateManpowerPO = function() {
								if (editManpowerPOPayment == undefined
										|| editManpowerPOPayment.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one Manpower Purchase Order to Deactivate",
													"Warning");
									return;
								}
								var deactivateManpowerPOReq = {
									"projCostItemIds" : editManpowerPOPayment,
									"status" : 2
								};
								console
										.log(JSON
												.stringify(deactivateManpowerPOReq));
								InvoiceService
										.deactivateManpowerPO(
												deactivateManpowerPOReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"Details Deactivated successfully",
																	"Info");
													deactivateData = [];
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Deactivating Manpower Purchase Oreder Details",
																	"Error");
												});
							}
							
							
							
				});
