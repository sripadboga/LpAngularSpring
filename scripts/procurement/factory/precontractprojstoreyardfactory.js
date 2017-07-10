'use strict';

app
		.factory(
				'PreContractProjStoreYardFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjStoreStockService, GenericAlertService) {
					var projStoreYardPopup = [];
					var projStoreStockService = {};
					projStoreStockService.getProjStoreStocks = function(projId) {
						var deferred = $q.defer();
						projStoreYardPopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractdeliverypopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.projStoreYardData = [];
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
														$scope.projStoreYardPopup = function(
																projStoreData) {

															var returnPopObj = {
																"projStoreStockTO" : projStoreData
															};
															deferred
																	.resolve(returnPopObj);
															$scope
																	.closeThisDialog();
														}
											} ]
								});
						return deferred.promise;
					};
					return projStoreStockService;

				});
