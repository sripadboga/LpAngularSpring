'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
					$stateProvider.state(
									"serviceclass",
									{
										url : '/serviceclass',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/centrallib/serviceclass/serviceclass.html',
												controller : 'ServiceClassController'
											}
										}
									})
				})
		.controller("ServiceClassController",function($scope,$q, $state, ngDialog, ClassificationService,GenericAlertService) {
					$scope.classification = {};
					$scope.serviceclassifications = [];
					var deferred = $q.defer();
					var selectedServiceClass=[];
					$scope.deletecodes = [];
					$scope.serviceReq = {
						"serviceCode" : null,
						"serviceName" : null,
						"status" : "1"
					}
					var editClassifications = [];
					$scope.activeFlag = 0;
					$scope.serviceClsSearch = function() {
						ClassificationService
								.getServiceClasses($scope.serviceReq)
								.then(
										function(data) {
											$scope.activeFlag = 0;
											$scope.serviceclassifications = data.serviceClassTOs;
											if ($scope.serviceclassifications != null
													&& $scope.serviceclassifications.length > 0) {
												if ($scope.serviceclassifications[0].status == 1) {
													$scope.activeFlag = 1;
												} else if ($scope.serviceclassifications[0].status == 2) {
													$scope.activeFlag = 2;
												}
											}
											else{
												GenericAlertService
												.alertMessage(
														'Service Classificstions  are not available for given search criteria',
														"Warning");
											}
										});
					},
					
							$scope.reset = function() {
								$scope.serviceReq = {
									"serviceCode" : null,
									"serviceName" : null,
									"status" : "1"
								}
								$scope.activeFlag = 0;
								$scope.serviceClsSearch();
							},
							$scope.rowSelect = function(classification) {
								if (classification.selected) {
									editClassifications.push(classification);
								} else {
									editClassifications.pop(classification);
								}
							}
							var service = {};
							var servicePopUp;
							$scope.addClassService = function(actionType) {
								servicePopUp = service.serviceClass(actionType);
								servicePopUp
								.then(
										function(
												data) {
											$scope.serviceclassifications = data.serviceClassTOs;
										},
										function(
												error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting service details",
															'Error');
										});
							}
							service.serviceClass = function(actionType) {
								if (actionType == 'Edit'	&& editClassifications <= 0) {
									GenericAlertService.alertMessage(	'Please select atleast one row to edit',"Warning");
									return;
								}
								servicePopUp=ngDialog.open({
											template : 'views/centrallib/serviceclass/servicePopup.html',
											className: 'ngdialog-theme-plain ng-dialogueCustom5',
											scope : $scope,
											showClose : true,
											closeByDocument : false,
											controller : ['$scope',function($scope) {
														$scope.action = actionType;
														$scope.classService = [];
														if (actionType === 'Add') {
															$scope.classService.push({
																		"code" : '',
																		"name" : '',
																		"status" : 1,
																		"selected" : false
																	});
														} else {
															$scope.classService = angular	.copy(editClassifications);
															editClassifications = [];
														}
																$scope.addRows = function() {
																	$scope.classService.push({
																				"code" : '',
																				"name" : '',
																				"status" : 1,
																				"selected" : false
																			});
																},
																$scope.saveServiceClasses = function() {		
																	var serviceClassMap=[];
																	angular.forEach($scope.classService,function(value,key) {
																						if(serviceClassMap[value.code]!=null){
																							GenericAlertService.alertMessage('Duplicate Service Classification Codes  are not allowed',"Error");
																							forEach.break();
																							}else
																								{
																								serviceClassMap[value.code]=true;
																								}
																					});
																	var req = {
																		"serviceClassTOs" : $scope.classService
																	}
																	var results =[];
																	ClassificationService.saveServiceClasses(req).then(function(data) {
									                                	   results =data.serviceClassTOs  ;
																		   var succMsg = GenericAlertService.alertMessageModal('Service Classification Details '+ data.message,data.status);
																		   succMsg.then(function(data1) {			
																				 var returnPopObj = {
														                                 "serviceClassTOs":  results                         
														                             }
																				  deferred.resolve(returnPopObj); 
																		   })
																		},function (error){
																				GenericAlertService.alertMessage('Service Classification Details  are failed to save',"Error");
																			});
																	 ngDialog.close();
															},
															$scope.popUpRowSelect = function(classification) {
																if (classification.selected) {
																	selectedServiceClass.push(classification);
																} else {
																	selectedServiceClass.pop(classification);
																}
															},$scope.deleteRows = function() {
																if(selectedServiceClass.length==0){
																	GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
																}
																if(selectedServiceClass.length<$scope.classService.length)
																	{
																	angular.forEach(selectedServiceClass, function(value,key) {
																		$scope.classService.splice($scope.classService.indexOf(value), 1);
																	
																	});
																	selectedServiceClass=[];
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
							$scope.activeServiceClasses = function() {
								if (editClassifications.length <= 0) {
									GenericAlertService.alertMessage("Please select records to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.serviceclassifications = [];
								} else {
									angular.forEach(editClassifications, function(value, key) {
												if (value.id) {
													deleteIds.push(value.id);
												}
											});
									var req = {
										"serviceClassIds" : deleteIds,
										"status":1
									};
									ClassificationService.deleteServiceClasses(req).then(function(data) {
														
													});
									angular.forEach(editClassifications,function(value, key) {
														$scope.serviceclassifications.splice($scope.serviceclassifications.indexOf(value),1);
														GenericAlertService.alertMessage('Service Classification Details are  Activated successfully','Info');
													},
													function(error) {GenericAlertService.alertMessage('Service Classification Details  are failed to Activate',"Error");
                                             });
									editClassifications = [];
									$scope.deleteIds = [];

								}
							}				
							$scope.deleteServiceClasses = function() {
								if (editClassifications.length <= 0) {
									GenericAlertService.alertMessage("Please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.serviceclassifications = [];
								} else {
									angular.forEach(editClassifications, function(value, key) {
												if (value.id) {
													deleteIds.push(value.id);
												}
											});
									var req = {
										"serviceClassIds" : deleteIds,
										"status":2
									};
									ClassificationService.deleteServiceClasses(req).then(function(data) {
														
													});
									angular.forEach(editClassifications,function(value, key) {
														$scope.serviceclassifications.splice($scope.serviceclassifications.indexOf(value),1);
														GenericAlertService.alertMessage('Service Classification Details are  Deactivated successfully','Info');
													},
													function(error) {GenericAlertService.alertMessage('Service Classification Details  are failed to Deactivate',"Error");
                                             });
									editClassifications = [];
									$scope.deleteIds = [];

								}
							}				
							return service;
				});