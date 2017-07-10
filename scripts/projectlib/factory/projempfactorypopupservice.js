'use strict';
app.factory('ProjectEmpClassificationService',	function(ngDialog, $q, $filter, $timeout, $rootScope,ProjEmpClassService,GenericAlertService ) {
		var projEmpClassifyPopUp;
		var service = {};
		service.projEmpClassifyPopup = function(actionType,editEmpClass,projId) {
		var deferred = $q.defer();
		projEmpClassifyPopUp = ngDialog.open({
				template : 'views/projectlib/empclass/projemppopup.html',
				closeByDocument : false,
				showClose : true,
				controller : ['$scope',	function($scope) {
					var emptyProjEmpClassifyObj = {};
							var selectedEmp=[];
							$scope.resourceData = [];
							$scope.catgData = [];
							$scope.addprojetemp = [];
							$scope.action = actionType;
							if (actionType == 'Edit') {
								$scope.addprojetemp = angular.copy(editEmpClass);
							}
							var onLoadReq = {
								"status" : 1,
								"projId" : projId
							};
							ProjEmpClassService.addProjEmpClassifyOnLoad(onLoadReq).then(function(data) {
									$scope.catgData = data.projEmpCatgTOs;
									$scope.resourceData = data.empClassTOs;
									$scope.unitOfMeasures=data.measureUnitTOs;
									if (actionType == 'Add') {
										emptyProjEmpClassifyObj = data.projEmpClassTO;
										var localprojEmpClassTO = angular.copy(emptyProjEmpClassifyObj);
										$scope.addprojetemp.push(localprojEmpClassTO);
									}
							});
							$scope.addEmpClass = function() {
								var localprojEmpClassTO = angular.copy(emptyProjEmpClassifyObj);
								$scope.addprojetemp.push(localprojEmpClassTO);
							},
							$scope.popUpRowSelect = function(tab) {
								if (tab.select) {
									selectedEmp.push(tab);
								} else {
									selectedEmp.pop(tab);
								}
							}
							
							$scope.uiDelete = function() {
								if(selectedEmp.length==0){
									GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
								}
								if(selectedEmp.length<$scope.addprojetemp.length)
								{
									angular.forEach(selectedEmp, function(value,key) {
										$scope.addprojetemp.splice($scope.addprojetemp.indexOf(value), 1);
									});
									selectedEmp=[];
									GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
									}else
									{
										GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
										}
							}
							$scope.saveEmpClass = function() {
								/*var empClassMap=[];
								angular.forEach($scope.addprojetemp,function(value,key) {
													if(empClassMap[value.code]!=null){
														GenericAlertService.alertMessage('Duplicate Employee Codes  are not allowed',"Error");
														forEach.break();
														}else
															{
															empClassMap[value.code]=true;
															}
												});*/
								var empProjSaveReq = {
									"projEmpClassTOs" : $scope.addprojetemp,
									"projId" : projId
								};
						
								ProjEmpClassService.saveProjEmpClasses(empProjSaveReq).then(function(data) {
										if (data.status != null	&& data.status !== undefined && data.status === 'Info') {
												var projectClassTOs = data.projEmpClassTOs;
												var succMsg = GenericAlertService.alertMessageModal('Employee Classification Details '+ data.message,data.status);
														succMsg.then(function(data) {			
																	ngDialog.close(projEmpClassifyPopUp);
																	 var returnPopObj = {
											                                 "projEmpClassTOs": projectClassTOs                                 
											                             };
											                             deferred.resolve(returnPopObj); 
														  	},function(error) {
																GenericAlertService.alertMessage("Error occurred while closing popup",'Info');
															});
													}
									},function(error) {
										GenericAlertService.alertMessage('Employee Classification Details  are failed to Save','Error');
									});
							}
															
						} ]
			});
						return deferred.promise;
					}
					return service;
				});
