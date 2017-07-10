'use strict';

app
		.factory(
				'PurchaseInternalFactory',
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
					service.procPurchasePopUp = function(data) {
						var deferred = $q.defer();
						procPurchasePopUp = ngDialog
								.open({
									template : 'views/procurement/purchaseorders/purchaseinternal.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.costcode = [];
												$scope.selectedProject = {};
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
												$scope.preContractObj = data.preContractTO;

												$scope.preContrctDetailTabs = [
														{
															title : 'Man Power',
															url : 'views/procurement/purchaseorders/purchaseinternalmanpower.html'
														},
														{
															title : 'Materials',
															url : 'views/procurement/purchaseorders/purchaseinternalmaterial.html'
														},
														{
															title : 'Plants',
															url : 'views/procurement/purchaseorders/purchaseinternalplants.html'
														},
														{
															title : 'Services',
															url : 'views/procurement/purchaseorders/purchaseinternalservices.html'
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
												

											} ]
								});
						return deferred.promise;
					};
					return service;

				});
