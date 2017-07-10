'use strict';

app
		.factory(
				'PurchaseExternalDetailsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractExternalService,
						PreContractAddCompanyFactory, GenericAlertService) {
					var purchaseExternalPopUp;
					var service = {};
					service.purchaseExternalPopUp = function(data) {
						var deferred = $q.defer();
						purchaseExternalPopUp = ngDialog
								.open({
									template : 'views/procurement/purchaseorders/purchaseexternaldetails.html',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {

												$scope.currentTab1 = null;
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

												$scope.preContrctDetailTabs = [
														{
															title : 'Man Power',
															url : 'views/procurement/purchaseorders/purchaseexternalmanpower.html'
														},
														{
															title : 'Materials',
															url : 'views/procurement/purchaseorders/purchaseexternalmaterial.html'
														},
														{
															title : 'Plants',
															url : 'views/procurement/purchaseorders/purchaseexternalplants.html'
														},
														{
															title : 'Services',
															url : 'views/procurement/purchaseorders/purchaseexternalservices.html'
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
