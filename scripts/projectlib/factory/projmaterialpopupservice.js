'use strict';
app.factory('ProjMaterialClassPopupService',function(ngDialog, $q, $filter, $timeout, $rootScope,ProjMaterialClassService, GenericAlertService) {
					var projMaterialClassifiPopUp;
					var service = {};
					service.projMaterialClassifiPopUp = function(actionType,selectedProject, editTableData) {
					var deferred = $q.defer();
						projMaterialClassifiPopUp = ngDialog .open({
									template : 'views/projectlib/materialclass/projmaterialpopup.html',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : ['$scope',function($scope) {
												$scope.resourceData = [];
												$scope.catgData = [];
												$scope.addTableData = [];
												var selectedMaterial=[];
												var emptyProjMaterialClassifyObj =[];
												$scope.action = actionType;
												if (actionType === 'Edit') {
													$scope.addTableData = angular.copy(editTableData);
												}
															var onLoadReq = {
																"status" : 1,
																"projId" : selectedProject.projId
															};
															ProjMaterialClassService.projMaterialClassifyOnLoad(onLoadReq).then(function(data) {
																				$scope.resourceData = data.materialSubResp.materialSubGroupTOs;
																				$scope.updateResCode = function(data,tab) {
																					tab.groupId= data.id;
																				}
																				$scope.catgData = data.measureUnitResp.measureUnitTOs;
																				$scope.updateCatgCode = function(data,tab) {
																					tab.measureId = data.id;
																				}
																				if (actionType === 'Add') {
																					emptyProjMaterialClassifyObj = data.projMaterialClassTO;
																					var localprojMaterialClassTO = angular.copy(emptyProjMaterialClassifyObj);
																					$scope.addTableData.push(localprojMaterialClassTO);
																				}
																			});
															$scope.addMaterialClass = function() {
																var localprojMaterialClassTO = angular.copy(emptyProjMaterialClassifyObj);
																$scope.addTableData.push(localprojMaterialClassTO);
															},
														$scope.saveProjMaterialClasses = function() {
																var materialClassMap=[];
																angular.forEach($scope.addTableData,function(value,key) {
																					if(materialClassMap[value.code]!=null){
																						GenericAlertService.alertMessage('Duplicate Resource IDs  are not allowed',"Error");
																						forEach.break();
																						}else
																							{
																							materialClassMap[value.code]=true;
																							}
																				});
															var req = {
																"projMaterialClassTOs" : $scope.addTableData,
																"projId" : selectedProject.projId
															};
															ProjMaterialClassService.saveProjMaterialClasses(req).then(function(data) {
																alert(JSON.stringify(data));
																				if (data.status != null&& data.status !== undefined&& data.status === 'Info') {
																					var projectClassTOs = data.projMaterialClassTOs;
																					var succMsg = GenericAlertService.alertMessageModal('Material Classification Details '+ data.message,data.status);
																					       succMsg.then(function(popData) {
																										ngDialog.close(projMaterialClassifiPopUp);
																										var returnPopObj = {
																											"projMaterialClassTOs" : projectClassTOs
																										};
																										deferred.resolve(returnPopObj);
																									},
																									function(error) {
																										GenericAlertService.alertMessage("Error occurred while closing popup",'Info');
																									});
																					       ngDialog.close();
																				}
																			},
																			function(error) {
																				GenericAlertService.alertMessage('Material Classification Details  are failed to Save','Error');
																			});
														},$scope.popUpRowSelect = function(tab) {
															if (tab.select) {
																selectedMaterial.push(tab);
															} else {
																selectedMaterial.pop(tab);
															}
														},
														$scope.deleteRows = function() {
															if(selectedMaterial.length==0){
																GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
															}
															if(selectedMaterial.length<$scope.addTableData.length)
															{
															angular.forEach(selectedMaterial, function(value,key) {
																$scope.addTableData.splice($scope.addTableData.indexOf(value), 1);
																
															});
															selectedMaterial=[];
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
