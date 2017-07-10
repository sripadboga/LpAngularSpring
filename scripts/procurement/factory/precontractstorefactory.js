'use strict';

app
		.factory(
				'PreContractStoreFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						StoreService, ProjStoreStockService,GenericAlertService) {
					var storeYardPopup = [];
					var storeService = {};
					storeService.getStocks = function(clientId, projId) {
						var deferred = $q.defer();
						storeYardPopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractdeliverypopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.storeStockCurrentTab =null;
												$scope.storeStockTabs = [
														{
															title : 'Store Stock ',
															url : 'views/procurement/pre-contracts/internalApproval/precontractstorestock.html'
														},
														{
															title : 'Project Store And Stock',
															url : 'views/procurement/pre-contracts/internalApproval/precontractprojstorestock.html'
														} ];
												$scope.storeStockCurrentTab = 'views/procurement/pre-contracts/internalApproval/precontractstorestock.html';
												$scope.storeStockOnClickTab = function(
														tab) {
													$scope.storeStockCurrentTab = tab.url;
												}
														$scope.isStoreStockActiveTab = function(
																tabUrl) {
															return tabUrl == $scope.storeStockCurrentTab;
														},
														$scope.storeYardData = [];
														$scope.projStoreYardData=[];
														$scope.getStocks = function() {
															var storeYardReq = {
																"status" : 1,
																"clientId" : clientId
															};
															
															StoreService
																	.getStocks(
																			storeYardReq)
																	.then(
																			function(
																					data) {
																				$scope.storeYardData = data.stockAndStoreTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Store Stock Details",
																								'Error');
																			});
														},
														$scope.getProjStoreStocks = function() {
															var storeYardReq = {
																"status" : 1,
																"projId" : projId
															};
															ProjStoreStockService
																	.getProjStoreStocks(
																			storeYardReq)
																	.then(
																			function(
																					data) {
																				$scope.projStoreYardData = data.projStoreStockTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Store Stock Details",
																								'Error');
																			});
														},
														$scope.deliveryPlacePopup = function(
																storeData,type) {

															var projStoreReturnObj = {
																"storeStockTO" : storeData,
																"type" : type
															};
															deferred
																	.resolve(projStoreReturnObj);
															$scope
																	.closeThisDialog();
														}
											} ]
								});
						return deferred.promise;
					};
					return storeService;

				});
