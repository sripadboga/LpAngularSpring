'use strict';
app.factory('ProjCrewListPopupService', function(ngDialog, $q, $filter, $timeout, $rootScope,ProjCrewListService, GenericAlertService) {
					var projCrewListPopUp;
					var service = {};
					service.projCrewListPopUp = function(actionType,selectedProject,editTableData) {
						var deferred = $q.defer();
						projCrewListPopUp = ngDialog .open({
									template : 'views/projectlib/crewlist/projcrewlistpopup.html',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : ['$scope',function($scope) {
												$scope.addTableData = [];
												var emptyProjCrewListObj =[];
												var selectedCrew=[];
												$scope.action = actionType;
												if (actionType === 'Edit') {
													$scope.addTableData = angular.copy(editTableData);
												}
															var onLoadReq = {
																"status" : 1,
																"projId" : selectedProject.projId
															};
															ProjCrewListService.projCrewListifOnLoad(onLoadReq).then(function(data) {
																$scope.shiftData = data.projWorkShiftResp.projWorkShiftTOs;
																$scope.updateResCode=function(data,tab){
																	tab.shiftId=data.shiftId;
															}
															if (actionType === 'Add') {
																					emptyProjCrewListObj = data.projCrewTO;
																					var localprojCrewListTO = angular.copy(emptyProjCrewListObj);
																					$scope.addTableData.push(localprojCrewListTO);
																				}
																			});
															$scope.addRows= function() {
																var localprojCrewListTO = angular.copy(emptyProjCrewListObj);
																$scope.addTableData.push(localprojCrewListTO);
														},
														
														
														$scope.saveCrewList = function() {
															var crewListMap=[];
															angular.forEach($scope.addTableData,function(value,key) {
																				if(crewListMap[value.code]!=null){
																					GenericAlertService.alertMessage('Duplicate CrewList Codes  are not allowed',"Error");
																					forEach.break();
																					}else
																						{
																						crewListMap[value.code]=true;
																						}
																			});
																var req = {
																	"projCrewTOs" : $scope.addTableData,
																	"projId" : selectedProject.projId
																};
																 ProjCrewListService.saveProjCrewLists(req).then(function(data){
																		if (data.status != null	&& data.status !== undefined && data.status === 'Info') {
																			var projectClassTOs = data.projCrewTOs;
																			var succMsg = GenericAlertService.alertMessageModal('CrewList Details '+ data.message,data.status);
																					succMsg.then(function(data1) {							
																								ngDialog.close(projCrewListPopUp);
																								 var returnPopObj = {
																		                                 "projCrewTOs": projectClassTOs                                 
																		                             };
																		                             deferred.resolve(returnPopObj); 
																					  	},function(error) {
																							GenericAlertService.alertMessage("Error occurred while closing popup",'Info');
																						});
																				}
																},function(error) {
																	GenericAlertService.alertMessage('CrewList Details are failed to Save','Error');
																});
																 ngDialog.close();
														},$scope.popUpRowSelect = function(tab) {
															if (tab.select) {
																selectedCrew.push(tab);
															} else {
																selectedCrew.pop(tab);
															}
														},
														$scope.deleteRows = function() {
															if(selectedCrew.length==0){
																GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
															}
															if(selectedCrew.length<$scope.addTableData.length)
															{
															angular.forEach(selectedCrew, function(value,key) {
																$scope.addTableData.splice($scope.addTableData.indexOf(value), 1);
															});
															selectedCrew=[];
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
