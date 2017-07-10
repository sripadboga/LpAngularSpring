



'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state("employee", {
		url : '/employee',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/centrallib/empclass/empclass.html',
				controller : 'EmpClassController'
			}
		}
	})
}).controller(
		"EmpClassController",
		function($rootScope, $scope, $state,  $q,ngDialog,EmpService,GenericAlertService) {
			$scope.employees = {};
			var deferred = $q.defer();
			$scope.employeesClassification = [];
			$scope.deletecodes = [];
			var editemployeesClassification =[];
			$scope.empReq={
					"empCode":null,
					"empName":null,
					"status":"1"
			};
			$scope.activeFlag = 0;
			$scope.empSearch = function() {
				EmpService
						.getEmpClasses($scope.empReq)
						.then(
								function(data) {
									$scope.activeFlag = 0;
									$scope.employeesClassification = data.empClassTOs;
									if ($scope.employeesClassification != null
											&& $scope.employeesClassification.length > 0) {
										if ($scope.employeesClassification[0].status == 1) {
											$scope.activeFlag = 1;
										} else if ($scope.employeesClassification[0].status == 2) {
											$scope.activeFlag = 2;
										}
									}
									else{
										GenericAlertService
										.alertMessage(
												'Employees are not available for given search criteria',
												"Warning");
									}
									
								});
			},
				$scope.reset=function(){
					$scope.empReq={
								"empCode":null,
								"empName":null,
								"status":"1"
						}
					$scope.activeFlag = 0;
					$scope.empSearch();
					},
				$scope.rowSelect = function(employees){
					if (employees.selected){
						editemployeesClassification.push(employees);
					}else {
						editemployeesClassification.pop(employees);
					}
				}
				var service = {};
				var empPopUp;
				$scope.employeesCls = function(actionType) {
					empPopUp = service.addEmpClasses (actionType);
					empPopUp
					.then(
							function(
									data) {
								$scope.employeesClassification = data.empClassTOs;
							},
							function(
									error) {
								GenericAlertService
										.alertMessage(
												"Error occured while selecting Employee details",
												'Error');
							});
				}
				service.addEmpClasses= function(actionType) {
					if(actionType=='Edit' && editemployeesClassification<=0){
						GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
						return ;
					}
					empPopUp=ngDialog.open({
						template : 'views/centrallib/empclass/empclasspopup.html',
						className: 'ngdialog-theme-plain ng-dialogueCustom5',
						scope : $scope,
						showClose : true,
						closeByDocument : false,
						controller : ['$scope',function($scope){
							$scope.employeesCls =[];
							 var selectedEmployees=[];
							$scope.action = actionType;
							$scope.employeesCls =[];
							if (actionType === 'Add'){							
								$scope.employeesCls.push({
									"code" : '',
									"name" : '',									
									"status" : 1,
									"selected" : false
								});
							}
							else {
								$scope.employeesCls=angular.copy(editemployeesClassification)
								editemployeesClassification=[];
						
							}
							$scope.addRows = function() {
								$scope.employeesCls.push({
									"code" : '',
									"name" : '',
									"status" : 1,
									"selected" : false
								});
							},
							$scope.saveEmpClasses = function() {		
								var employeeMap=[];
								angular.forEach($scope.employeesCls,function(value,key) {
													if(employeeMap[value.code]!=null){
														GenericAlertService.alertMessage('Duplicate Employee Codes  are not allowed',"Error");
														forEach.break();
														}else
															{
															employeeMap[value.code]=true;
															}
												});
								var req = {
									"empClassTOs" : $scope.employeesCls
								}
								var results =[];
								EmpService.saveEmpClasses(req).then(function(data) {
                                	   results =data.empClassTOs  ;
									   var succMsg = GenericAlertService.alertMessageModal('Employee Details '+ data.message,data.status);
									   succMsg.then(function(data1) {			
											 var returnPopObj = {
					                                 "empClassTOs":  results                         
					                             }
											  deferred.resolve(returnPopObj); 
									   })
									},function (error){
											GenericAlertService.alertMessage('Employee Details  are failed to save',"Error");
										});
								 ngDialog.close();
						},
						$scope.popUpRowSelect = function(employees) {
							if (employees.selected) {
								selectedEmployees.push(employees);
							} else {
								selectedEmployees.pop(employees);
							}
						},$scope.deleteRows = function() {
							if(selectedEmployees.length==0){
								GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
							}
							if(selectedEmployees.length<$scope.employeesCls.length)
								{
								angular.forEach(selectedEmployees, function(value,key) {
									$scope.employeesCls.splice($scope.employeesCls.indexOf(value), 1);
							
								});
								selectedEmployees=[];
								GenericAlertService.alertMessage('Rows are Deleted successfully',"Info");
								}else
									{
									GenericAlertService.alertMessage('Please leave atlist one row',"Warning");
									}
						}
						}]
					});
					return deferred.promise;
					
				}
				$scope.activeEmpClasses = function() {
					   if (editemployeesClassification.length <= 0) {
						   GenericAlertService.alertMessage("Please select records to Activate",'Warning');
											return;
										}
										var deleteIds = [];
										$scope.nondeleteIds = [];
										if ($scope.selectedAll) {
											$scope.employeesClassification = [];
										} else {
											angular.forEach(editemployeesClassification, function(value,	key) {
													deleteIds.push(value.id);
											});
											var req = {
												"empClassIds" : deleteIds,
												"status":1
											};
											EmpService.deleteEmpClasses(req).then(
													function(data) {
													});
											GenericAlertService.alertMessage('Employee Details  are  Activated successfully','Info');
											angular.forEach(editemployeesClassification, function(value,key) {
												$scope.employeesClassification.splice($scope.employeesClassification.indexOf(value), 1);
											},
											function(
													error) {
												GenericAlertService.alertMessage('Employee Details are failed to Activate',"Error");
											});
											editemployeesClassification = [];
											$scope.deleteIds = [];
											
										}
									}
         $scope.deleteEmpClasses = function() {
	   if (editemployeesClassification.length <= 0) {
		   GenericAlertService.alertMessage("Please select records to Deactivate",'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.employeesClassification = [];
						} else {
							angular.forEach(editemployeesClassification, function(value,	key) {
									deleteIds.push(value.id);
							});
							var req = {
								"empClassIds" : deleteIds,
								"status":2
							};
							EmpService.deleteEmpClasses(req).then(
									function(data) {
									});
							GenericAlertService.alertMessage('Employee Details  are  Deactivated successfully','Info');
							angular.forEach(editemployeesClassification, function(value,key) {
								$scope.employeesClassification.splice($scope.employeesClassification.indexOf(value), 1);
							},
							function(
									error) {
								GenericAlertService.alertMessage('Employee Details are failed to Deactivate',"Error");
							});
							editemployeesClassification = [];
							$scope.deleteIds = [];
							
						}
					}
         return service;
		});
