'use strict';
/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state("store", {
		url : '/store',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/centrallib/storeandstock/storestock.html',
				controller : 'StoreStockController'
			}
		}
	})
}).controller('StoreStockController', function($scope,$q, $state, ngDialog,StoreService,GenericAlertService) {
	var editStocks = [];
	$scope.stock = [];
	var deferred = $q.defer();
	$scope.stocks = [];
	$scope.deleteIds = [];
		$scope.storeReq = {
				"stockCode" : null,
				"stackName" : null,
				"status" : "1"
		}
		
		$scope.storeSearch = function() {
			StoreService
					.getStocks($scope.storeReq)
					.then(
							function(data) {
								$scope.activeFlag = 0;
								$scope.stocks = data.stockAndStoreTOs;
								if ($scope.stocks != null
										&& $scope.stocks.length > 0) {
									if ($scope.stocks[0].status == 1) {
										$scope.activeFlag = 1;
									} else if ($scope.stocks[0].status == 2) {
										$scope.activeFlag = 2;
									}
								}
								else{
									GenericAlertService
									.alertMessage(
											'Store And Stocks  are not available for given search criteria',
											"Warning");
								}
							});
		},
		
	$scope.reset = function() {
		$scope.storeReq = {
				"stockCode " : null,
				"stackName " : null,
				"status" : "1"
			}
		$scope.activeFlag = 0;
		$scope.storeSearch();
	},
		$scope.rowSelect = function(stock) {
		if (stock.selected) {
			editStocks.push(stock);
		} else {
			editStocks.pop(stock);
		}
	}
	var service = {};
	var storePopUp;
	$scope.addStocks = function(actionType) {
		storePopUp = service.addStores (actionType);
		storePopUp
		.then(
				function(
						data) {
					$scope.stocks = data.stockAndStoreTOs;
				},
				function(
						error) {
					GenericAlertService
							.alertMessage(
									"Error occured while selecting store details",
									'Error');
				});
	}
	service.addStores = function(actionType) {
		if(actionType === 'Edit' && editStocks.length <= 0) 
		{
			GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
			return;
		}
		storePopUp=ngDialog.open({
									template : 'views/centrallib/storeandstock/addstorestockpopup.html',
									className: 'ngdialog-theme-plain ng-dialogueCustom5',
											scope : $scope,
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														var selectedStocks=[];
														$scope.action = actionType;
														$scope.addStocks = [];
														if (actionType === 'Add') {
															$scope.addStocks
																	.push({
																		"code" : '',
																		"desc" : '',
																		"status" : 1,
																		"selected" : false
																	});
														} else {
															$scope.addStocks = angular
																	.copy(editStocks)
															editStocks = [];
														}
														$scope.addRows=function(){
															$scope.addStocks
														.push({
															"code" : '',
															"desc" : '',
															"status" : 1,
															"selected" : false
														});
											} 
																$scope.saveStocks = function() {			
																	var storeStockMap=[];
																	angular.forEach($scope.addStocks,function(value,key) {
																						if(storeStockMap[value.code]!=null){
																							GenericAlertService.alertMessage('Duplicate Store and Stock Codes  are not allowed',"Error");
																							forEach.break();
																							}else
																								{
																								storeStockMap[value.code]=true;
																								}
																					});
																	var req = {
																			"stockAndStoreTOs" : $scope.addStocks
																	}
																	var results =[];
																	StoreService.saveStocks(req).then(function(data) {
									                                	   results =data.stockAndStoreTOs  ;
																		   var succMsg = GenericAlertService.alertMessageModal('Store Details '+ data.message,data.status);
																		   succMsg.then(function(data1) {			
																				 var returnPopObj = {
														                                 "stockAndStoreTOs":  results                         
														                             }
																				  deferred.resolve(returnPopObj); 
																		   })
																		},function (error){
																				GenericAlertService.alertMessage('Store Details  are failed to save',"Error");
																			});
																	 ngDialog.close();
															}
																$scope.popUpRowSelect = function(stock) {
																	if (stock.selected) {
																		selectedStocks.push(stock);
																	} else {
																		selectedStocks.pop(stock);
																	}
																},$scope.deleteRows = function() {
																	if(selectedStocks.length==0){
																		GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
																	}
																	if(selectedStocks.length<$scope.addStocks.length)
																		{
																		angular.forEach(selectedStocks, function(value,key) {
																			$scope.addStocks.splice($scope.addStocks.indexOf(value), 1);
																		
																		});
																		selectedStocks=[];
																		GenericAlertService.alertMessage('Rows are Deleted successfully',"Info");
																		}else
																			{
																			GenericAlertService.alertMessage('Please leave atlist one row',"Warning");
																			}
																}
																
													} ]
										});
						return deferred.promise;
							}, 
							$scope.activeStocks = function() {
								if (editStocks.length <= 0) {
									GenericAlertService.alertMessage("please select records to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.stocks = [];
								} else {
									angular.forEach(editStocks, function(value,key) {
										deleteIds.push(value.id);
									});
									var req = {
										"stockProjsIds" : deleteIds,
										"status":1
									};
									StoreService.deleteStocks(req).then(function(data) {

											});
									GenericAlertService.alertMessage('Store Details are  Activated successfully','Info');
									angular.forEach(editStocks, function(value,key) {
										$scope.stocks.splice($scope.stocks.indexOf(value), 1);
									},
									function(error) {
										GenericAlertService.alertMessage('Store Details are failed to Activate',"Error");
									});
									editStocks = [];
									$scope.deleteIds = [];
								
								}
								}
							
							$scope.deleteStocks = function() {
								if (editStocks.length <= 0) {
									GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.stocks = [];
								} else {
									angular.forEach(editStocks, function(value,key) {
										deleteIds.push(value.id);
									});
									var req = {
										"stockProjsIds" : deleteIds,
										"status":2
									};
									StoreService.deleteStocks(req).then(function(data) {

											});
									GenericAlertService.alertMessage('Store Details are  Deactivated successfully','Info');
									angular.forEach(editStocks, function(value,key) {
										$scope.stocks.splice($scope.stocks.indexOf(value), 1);
									},
									function(error) {
										GenericAlertService.alertMessage('Store Details are failed to Deactivate',"Error");
									});
									editStocks = [];
									$scope.deleteIds = [];
								
								}
								}
								return service;
				});
