'use strict';
app.factory('ProjStocksPopupService', function(ngDialog, $q, $filter, $timeout, $rootScope,ProjStoreStockService,GenericAlertService) {
					var projStoreClassifyPopUp;
					var service = {};
					service.projStoreClassifyPopUp = function(actionType,selectedProject,editStoreData) {
						var deferred = $q.defer();
						projStoreClassifyPopUp = ngDialog .open({
									template :'views/projectlib/storeandstock/storeyardpopup.html',
									className:'ngdialog-theme-plain ng-dialogueCustom5',
									closeByDocument : false,
									showClose : true,
									controller : ['$scope',function($scope) {
										$scope.addstoreyard =[];
										 var emptyProjStoreClassifyObj ={};
										 var selectedStore=[];
												$scope.action = actionType;
												if (actionType === 'Edit'){
													$scope.addstoreyard = angular.copy(editStoreData);			
												}
												var req = {
													"status" : 1,
													"projId" : selectedProject.projId
												};
												ProjStoreStockService.projStoreStockifOnLoad(req).then(function(data) {
																	if (actionType === 'Add'){
																		emptyProjStoreClassifyObj = data.projStoreStockTO;
																		var localprojStoreStockTO = angular.copy(emptyProjStoreClassifyObj);
																		$scope.addstoreyard.push(localprojStoreStockTO);
																	}
																});
												$scope.addstoreyardClass = function() {
													var localprojStoreStockTO = angular.copy(emptyProjStoreClassifyObj);
													$scope.addstoreyard.push(localprojStoreStockTO);
												}	
												$scope.saveProjStoreStocks = function() {
													var storeProjSaveReq = {
														"projStoreStockTOs" : $scope.addstoreyard,
														"projId" : selectedProject.projId
													};
												
													ProjStoreStockService.saveProjStoreStocks(storeProjSaveReq).then(function(data) {
															if (data.status != null	&& data.status !== undefined && data.status === 'Info') {
																	var projectClassTOs = data.projStoreStockTOs;
																	var succMsg = GenericAlertService.alertMessageModal('Store Stocks Details '+ data.message,data.status);
																			succMsg.then(function(data) {																	
																						ngDialog.close(projStoreClassifyPopUp);
																						 var returnPopObj = {
																                                 "projStoreStockTOs": projectClassTOs                                 
																                             };
																                             deferred.resolve(returnPopObj); 
																			  	},function(error) {
																					GenericAlertService.alertMessage("Error occurred while closing popup",'Info');
																				});
																			ngDialog.close();
																		}
														},function(error) {
															GenericAlertService.alertMessage('Store and Stocks  Details  are failed to Save','Error');
														});
												},$scope.popUpRowSelect = function(tab) {
													if (tab.select) {
														selectedStore.push(tab);
													} else {
														selectedStore.pop(tab);
													}
												},
														$scope.deleteRows = function() {
													if(selectedStore.length==0){
														GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
													}
													if(selectedStore.length<$scope.addstoreyard.length)
													{
													angular.forEach(selectedStore, function(value,key) {
														$scope.addstoreyard.splice($scope.addstoreyard.indexOf(value), 1);
														
													});
													selectedStore=[];
													GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
													}else
													{
														GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
														}
															
														}
																			
											} ]
								});
						return deferred.promise;
					};
					return service;
				});
