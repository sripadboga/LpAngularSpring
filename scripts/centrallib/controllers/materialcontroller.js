
'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
			$stateProvider.state("material", {
				url : '/material',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/centrallib/materialgroup/materialGroup.html',
						controller : 'MaterialGroupController'
					}
				}
			})
		})
		.controller("MaterialGroupController",function($rootScope, $q,$scope, $state, ngDialog, MaterialService,GenericAlertService) {
					$scope.classification = {};
					var deferred = $q.defer();
					$scope.materialclassifications = [];
					$scope.deletecodes = [];
					$scope.materialReq = {
							"mateiralCode" : null,
							"materialName" : null,
							"status" :"1"
						}
					var editClassifications = [];
					$scope.activeFlag = 0;
					$scope.materialSearch = function() {
						MaterialService
								.getMaterialSubGroups($scope.materialReq)
								.then(
										function(data) {
											$scope.activeFlag = 0;
											$scope.materialclassifications = data.materialSubGroupTOs;
											if ($scope.materialclassifications != null
													&& $scope.materialclassifications.length > 0) {
												if ($scope.materialclassifications[0].status == 1) {
													$scope.activeFlag = 1;
												} else if ($scope.materialclassifications[0].status == 2) {
													$scope.activeFlag = 2;
												}
											}
											else{
												GenericAlertService
												.alertMessage(
														'Materials are not available for given search criteria',
														"Warning");
											}
										});
					},
								$scope.reset=function(){
									$scope.materialReq = {
											"materialCode" : null,
											"materialName" : null,
											"status" : "1"
										}
									$scope.activeFlag = 0;
									$scope.materialSearch();
							},
							$scope.rowSelect = function(classification) {
								if (classification.selected) {
									editClassifications.push(classification);
								} else {
									editClassifications.pop(classification);
								}
							}
							var service = {};
							var materialPopUp;
							$scope.MaterialClassification = function(actionType) {
								materialPopUp = service.addMaterials (actionType);
								materialPopUp
								.then(
										function(
												data) {
											$scope.materialclassifications = data.materialSubGroupTOs;
										},
										function(
												error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting Material details",
															'Error');
										});
							}
							service.addMaterials = function(actionType) {
								if (actionType == 'Edit'
										&& editClassifications <= 0) {
									GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
									return;
								}
								materialPopUp=ngDialog.open({
											template : 'views/centrallib/materialgroup/materialPopup.html',
											className: 'ngdialog-theme-plain ng-dialogueCustom5',
											scope : $scope,
											showClose : true,
											closeByDocument : false,
											controller : ['$scope',function($scope) {
														$scope.action = actionType;
														$scope.MaterialClassification = [];
														var selectedMaterial=[];
														if (actionType === 'Add') {
															$scope.MaterialClassification
																	.push({
																		"code" : '',
																		"name" : '',
																		"status" : 1,
																		"selected" : false
																	});
														} else {
															$scope.MaterialClassification=angular.copy(editClassifications)
															editClassifications=[];
										
														}
																$scope.addRows = function() {
																	$scope.MaterialClassification
																			.push({
																				"code" : '',
																				"name" : '',
																				"status" : 1,
																				"selected" : false
																			});
																},
																$scope.saveMaterialSubGroups = function() {		
																	var materialMap=[];
																	angular.forEach($scope.MaterialClassification,function(value,key) {
																						if(materialMap[value.code]!=null){
																							GenericAlertService.alertMessage('Duplicate Material Codes  are not allowed',"Error");
																							forEach.break();
																							}else
																								{
																								materialMap[value.code]=true;
																								}
																					});
																	var req = {
																		"materialSubGroupTOs" : $scope.MaterialClassification
																	}
																	var results =[];
																	MaterialService.saveMaterialSubGroups(req).then(function(data) {
									                                	   results =data.materialSubGroupTOs  ;
																		   var succMsg = GenericAlertService.alertMessageModal('Material Details '+ data.message,data.status);
																		   succMsg.then(function(data1) {			
																				 var returnPopObj = {
														                                 "materialSubGroupTOs":  results                         
														                             }
																				  deferred.resolve(returnPopObj); 
																		   })
																		},function (error){
																				GenericAlertService.alertMessage('Material Details  are failed to save',"Error");
																			});
																	 ngDialog.close();
															},
															$scope.popUpRowSelect = function(classification) {
																if (classification.selected) {
																	selectedMaterial.push(classification);
																} else {
																	selectedMaterial.pop(classification);
																}
															},$scope.deleteRows = function() {
																if(selectedMaterial.length==0){
																	GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
																}
																if(selectedMaterial.length<$scope.MaterialClassification.length)
																	{
																	angular.forEach(selectedMaterial, function(value,key) {
																		$scope.MaterialClassification.splice($scope.MaterialClassification.indexOf(value), 1);
																
																	});
																	selectedMaterial=[];
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
							
					$scope.deleteMaterialSubGroups = function() {
						if (editClassifications.length <= 0) {
							GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.materialclassifications = [];
						} else {
							angular.forEach(editClassifications, function(value,key) {			
									deleteIds.push(value.id);				
							});
							var req = {
								"materialIds" : deleteIds,
								"status":2
							};
							MaterialService.deleteMaterialSubGroups(req).then(function(data) {
										
									});
							GenericAlertService.alertMessage('Material Details  are Deactivated successfully','Info');
							angular.forEach(editClassifications, function(value,key) {
								$scope.materialclassifications.splice($scope.materialclassifications.indexOf(value), 1);
							},
							function(error) {
								GenericAlertService.alertMessage('Material Details  are failed to Deactivate',"Error");
							});
							editClassifications = [];
							$scope.deleteIds = [];
							
						}
					};
							$scope.activeMaterialSubGroups = function() {
								if (editClassifications.length <= 0) {
									GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.materialclassifications = [];
								} else {
									angular.forEach(editClassifications, function(value,key) {			
											deleteIds.push(value.id);				
									});
									var req = {
										"materialIds" : deleteIds,
										"status":1
									};
									MaterialService.deleteMaterialSubGroups(req).then(function(data) {
												
											});
									GenericAlertService.alertMessage('Material Details  are Activated successfully','Info');
									angular.forEach(editClassifications, function(value,key) {
										$scope.materialclassifications.splice($scope.materialclassifications.indexOf(value), 1);
									},
									function(error) {
										GenericAlertService.alertMessage('Material Details  are failed to Activate',"Error");
									});
									editClassifications = [];
									$scope.deleteIds = [];
									
								}
							};
							return service;
							
				});
