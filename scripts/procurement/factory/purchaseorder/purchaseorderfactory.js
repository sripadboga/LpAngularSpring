'use strict';

app
		.factory(
				'PurchaseOrderFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PurchaseOrderService, GenericAlertService,
						ProjCostCodeService, StoreService,
						PrecontractDocUploadFactory,
						PreContractCostPopupFactory,
						PreContractProjEmpClassFactory,
						PreContractProjPlantClassFactory,
						PreContractProjServiceClassFactory,
						PreContractMaterialClassFactory,
						PreContractStoreFactory, PreContractInternalService) {
					var procPurchasePopUp;
					var service = {};
					service.procPurchasePopUp = function(purchaseOrder) {
						var deferred = $q.defer();
						procPurchasePopUp = ngDialog
								.open({
									template : 'views/procurement/purchaseorders/purchaseorderpopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.preContractObj = [];
												$scope.contractTypes = [];
												$scope.currencyList = [];
												$scope.costcode = [];
												$scope.selectedProject = {};
												$scope.defaultcostcode = {};
												$scope.projEmpClassmap = null;
												$scope.projPlantClassmap = null;
												$scope.projMaterialClassmap = null;
												$scope.projServiceClassmap = null;
												$scope.storeClassmap = [];
												$scope.projStoreClassmap = [];
												$scope.projcostCodeMap = [];
												$scope.currentTab1 = null;
												$scope.purchaseOrders=[];
												$scope.preContrctDetailTabs = [
														{
															title : 'Man Power',
															url : 'views/procurement/pre-contracts/internalApproval/precontractinternalmanpower.html'
														},
														{
															title : 'Materials',
															url : 'views/procurement/pre-contracts/internalApproval/material.html'
														},
														{
															title : 'Plants',
															url : 'views/procurement/pre-contracts/internalApproval/plants.html'
														},
														{
															title : 'Services',
															url : 'views/procurement/pre-contracts/internalApproval/services.html'
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
												}/*,$scope.rePurchaseOrder = function(purchaseOrder) {
													var req = {
															"purchaseOrderTOs" : selectedPurchaseOrders
														};
													PurchaseOrderService.regeneratePurchaseOrder(req).then(
															function(data) {
																alert();
																$scope.purchaseOrdersList = data.purchaseOrderTOs
																GenericAlertService
																		.alertMessage(
																				"Purchase Orders are regenerated successfully");
																						
															},
															function(error) {
																GenericAlertService
																		.alertMessage(
																				"Purchase Order Details Failed To regenerate ",
																				"error");
															});
												}*/

											} ]
								});
						return deferred.promise;
					};
					return service;

				});
