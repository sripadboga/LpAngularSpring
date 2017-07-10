'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
					$stateProvider.state("costcode",{
										url : '/costcode',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/centrallib/costcode/centlibcostcode.html',
												controller : 'CostCodeController'
											}
										}
									})
				})
		.controller("CostCodeController",function($scope, $state, $q,ngDialog, CostCodeService,GenericAlertService) {
			var service = {}
			$scope.costCodes = {};
					$scope.costCodesClass = [];
					$scope.deletecodes = [];			
					var deferred = $q.defer();
					var editcostCodesClass = [];	
					$scope.costCodeReq={
							"costCodeCode":null,
							"costCodeName":null,
							"status":"1"
					},
				$scope.activeFlag = 0;
					$scope.costcodeSearch = function() {
						CostCodeService
								.getCostCodes($scope.costCodeReq)
								.then(
										function(data) {
											$scope.activeFlag = 0;
											$scope.costCodesClass = data.costCodeTOs;
											if ($scope.costCodesClass != null
													&& $scope.costCodesClass.length > 0) {
												if ($scope.costCodesClass[0].status == 1) {
													$scope.activeFlag = 1;
												} else if ($scope.costCodesClass[0].status == 2) {
													$scope.activeFlag = 2;
												}
											}
											else{
												GenericAlertService
												.alertMessage(
														'Costcodes are not available for given search criteria',
														"Warning");
											}
										});
					},
							
							$scope.reset=function(){
								$scope.costCodeReq={
											"costCodeCode":null,
											"costCodeName":null,
											"status":"1"
									}
								$scope.activeFlag = 0;
								  $scope.costcodeSearch();
							},
							$scope.rowSelect = function(costCodes) {
								if (costCodes.selected) {
									editcostCodesClass.push(costCodes);
								} else {
									editcostCodesClass.pop(costCodes);
								}
							}
							var service = {};
							var costCodePopUp;
							
							$scope.costUnits = function(actionType) {
								costCodePopUp = service.addCostUnits (actionType);
								costCodePopUp
								.then(
										function(
												data) {
											$scope.costCodesClass = data.costCodeTOs;
										},
										function(
												error) {
											GenericAlertService.alertMessage("Error occured while selecting Cost Code details",'Error');
										});
							}
							service.addCostUnits = function(actionType) {
								if (actionType === 'Edit'
										&& editcostCodesClass <= 0) {
									GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
									return;
								}
								costCodePopUp=ngDialog.open({
											template : 'views/centrallib/costcode/costcodepopup.html',
											className: 'ngdialog-theme-plain ng-dialogueCustom5',
											scope : $scope,
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														$scope.costUnits = [];
														 var selectedCostCodes=[];
														$scope.action = actionType;
														$scope.costUnits = [];
														if (actionType === 'Add') {
															$scope.costUnits
																	.push({
																		"code" : '',
																		"name" : '',
																		"status" : 1,
																		"selected" : false
																	});
														} else {
															$scope.costUnits=angular.copy(editcostCodesClass)
															           editcostCodesClass=[];														
														}
																$scope.addRows = function() {
																	$scope.costUnits
																			.push({
																				"code" : '',
																				"name" : '',
																				"status" : 1,
																				"selected" : false
																			});
																},
                                                   $scope.saveCostCodes = function() {	
																	var costCodeMap=[];
																	angular.forEach($scope.costUnits,function(value,key) {
																						if(costCodeMap[value.code]!=null){
																							GenericAlertService.alertMessage('Duplicate Cost Codes  are not allowed',"Error");
																							forEach.break();
																							}else
																								{
																								costCodeMap[value.code]=true;
																								}
																					});
               										var req = {
               											"costCodeTOs" : $scope.costUnits
               										}
               										var results =[];
               										CostCodeService.saveCostCodes(req).then(function(data) {
                                                       	   results =data.costCodeTOs  ;
               											   var succMsg = GenericAlertService.alertMessageModal('Costcode Details  '+ data.message,data.status);
               											   succMsg.then(function(data1) {			
               													 var returnPopObj = {
               							                                 "costCodeTOs":  results                         
               							                             }
               													  deferred.resolve(returnPopObj); 
               											   })
               											},function (error){
               													GenericAlertService.alertMessage('Costcode Details  are failed to save',"Error");
               												});
               										ngDialog.close();
               								}, 
               								$scope.popUpRowSelect = function(costCodes) {
            									if (costCodes.selected) {
            										selectedCostCodes.push(costCodes);
            									} else {
            										selectedCostCodes.pop(costCodes);
            									}
            								},$scope.deleteRows = function() {
            									if(selectedCostCodes.length==0){
            										GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
            									}
            									if(selectedCostCodes.length<$scope.costUnits.length)
            										{
            										angular.forEach(selectedCostCodes, function(value,key) {
            											$scope.costUnits.splice($scope.costUnits.indexOf(value), 1);
            									
            										});
            										selectedCostCodes=[];
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
							$scope.activeCostCodes = function() {
								if (editcostCodesClass.length <= 0) {
									GenericAlertService.alertMessage("please select records to Activate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.costCodesClass = [];
								} else {
									angular.forEach(editcostCodesClass, function(value,key) {			
											deleteIds.push(value.id);				
									});
									var req = {
										"costCodeIds" : deleteIds,
										"status":1
									};
									CostCodeService.deleteCostCodes(req).then(function(data) {
											});
									angular.forEach(editcostCodesClass, function(value,key) {
										GenericAlertService.alertMessage('Costcode Details are  Activated successfully','Info');
										$scope.costCodesClass.splice($scope.costCodesClass.indexOf(value), 1);									
									},
									function(error) {
										GenericAlertService.alertMessage('Costcode Details are failed to Activate',"Error");
									});
									editcostCodesClass = [];
									$scope.deleteIds = [];
								}
							}
							$scope.deleteCostCodes = function() {
								if (editcostCodesClass.length <= 0) {
									GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.costCodesClass = [];
								} else {
									angular.forEach(editcostCodesClass, function(value,key) {			
											deleteIds.push(value.id);				
									});
									var req = {
										"costCodeIds" : deleteIds,
										"status":2
									};
									CostCodeService.deleteCostCodes(req).then(function(data) {
											});
									angular.forEach(editcostCodesClass, function(value,key) {
										GenericAlertService.alertMessage('Costcode Details are  Deactivated successfully','Info');
										$scope.costCodesClass.splice($scope.costCodesClass.indexOf(value), 1);									
									},
									function(error) {
										GenericAlertService.alertMessage('Costcode Details are failed to Deactivate',"Error");
									});
									editcostCodesClass = [];
									$scope.deleteIds = [];
								}
							}
							return service;
				});
