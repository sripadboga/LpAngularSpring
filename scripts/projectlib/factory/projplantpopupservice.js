'use strict';
app.factory('ProjPlantClassificationPopupService',function(ngDialog, $q, $filter, $timeout, $rootScope,ProjPlantClassService,GenericAlertService) {
					var projPlantClassifiPopUp;
					var service = {};
					service.projPlantClassifiPopUp = function(actionType,selectedProject,editPlantClass) {
						var deferred = $q.defer();
						projPlantClassifiPopUp = ngDialog .open({
									template : 'views/projectlib/plantclass/projplantpopup.html',
									className: 'ngdialog-theme-plain ng-dialogueCustom4',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.resourceData = [];
												var selectedPlant=[];
												$scope.measureUnits = [];
												$scope.addprojetplant = [];
												var emptyProPlantClassifyObj =[];
												$scope.action = actionType;
												if (actionType === 'Edit') {
													$scope.addprojetplant = angular.copy(editPlantClass);
												}
															var onLoadReq = {
																"status" : 1,
																"projId" : selectedProject.projId
															};
															ProjPlantClassService.projPlantClassifOnLoad(onLoadReq).then(
																			function(data) {
																				$scope.resourceData = data.plantClassResp.plantClassTOs;
																				$scope.updateResCode = function(data,tab) {
																					tab.plantClassId = data.id;
																				}
																				$scope.measureUnits = data.measureUnitResp.measureUnitTOs;
																				$scope.updateMeasure = function(data,tab) {
																					tab.measureId = data.id;
																				}
																									if (actionType === 'Add'){
																										emptyProPlantClassifyObj = data.projPlantClassTO;
																					var localprojPlantClassTO = angular.copy(emptyProPlantClassifyObj);
																					$scope.addprojetplant.push(localprojPlantClassTO);
																				}
																			});
															$scope.addprojetplantClass = function() {
																var localprojPlantClassTO = angular.copy(emptyProPlantClassifyObj);
																$scope.addprojetplant.push(localprojPlantClassTO);
														},
														$scope.saveProjPlantClasses = function() {
															var req = {
																"projPlantClassTOs" : $scope.addprojetplant,
																"projId" : selectedProject.projId
															};
															ProjPlantClassService.saveProjPlantClasses(req).then(function(data) {
																				if (data.status != null&& data.status !== undefined&& data.status === 'Info') {
																					var projectClassTOs = data.projPlantClassTOs;
																					var succMsg = GenericAlertService.alertMessageModal(	'Plant Classification Details '+ data.message,data.status);
																					succMsg.then(function(popData) {
																										ngDialog.close(projPlantClassifiPopUp);
																										var returnPopObj = {
																											"projPlantClassTOs" : projectClassTOs
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
																				GenericAlertService.alertMessage('Plant Classification Details  are failed to Save','Error');
																			});
														},
														$scope.popUpRowSelect = function(tab) {
															if (tab.select) {
																selectedPlant.push(tab);
															} else {
																selectedPlant.pop(tab);
															}
														},
														$scope.deleteRows = function() {
															if(selectedPlant.length==0){
																GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
															}
															if(selectedPlant.length<$scope.addprojetplant.length)
															{
															angular.forEach(selectedPlant, function(value,key) {
																$scope.addprojetplant.splice($scope.addprojetplant.indexOf(value), 1);
																
															});
															selectedPlant=[];
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
