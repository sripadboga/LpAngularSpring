'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state("empwage", {
		url : '/empwage',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/centrallib/employeewages/wages.html',
				controller : 'WageController'
			}
		}
	})
}).controller('WageController', function($scope,$q, $state, ngDialog,WageService,GenericAlertService) {
	var editWages = [];
	$scope.wage = [];
	var deferred = $q.defer();
	$scope.deleteIds = [];
		$scope.wagesReq= {
				"empWageCode": null,
				"empWageName": null,
				"status": "1"
			},
			$scope.wagesSearch = function() {
			WageService
						.getEmpWages($scope.wagesReq)
						.then(
								function(data) {
									$scope.activeFlag = 0;
									$scope.wages = data.employeeWageRateTOs;
									if ($scope.wages != null
											&& $scope.wages.length > 0) {
										if ($scope.wages[0].status == 1) {
											$scope.activeFlag = 1;
										} else if ($scope.wages[0].status == 2) {
											$scope.activeFlag = 2;
										}
									}
									else{
										GenericAlertService
										.alertMessage(
												'Wages  are not available for given search criteria',
												"Warning");
									}
								});
			},
		$scope.reset = function() {
			$scope.wagesReq= {
					"empWageCode": null,
					"empWageName": null,
					"status": "1"
				}
			$scope.activeFlag = 0;
			$scope.wagesSearch();
		},
		
		$scope.rowSelect = function(wage) {
		if (wage.selected) {
			editWages.push(wage);
		} else {
			editWages.pop(wage);
		}
	}
	var service = {};
	var wagesPopUp;
	$scope.addWages = function(actionType) {
		wagesPopUp = service.addEmpWages (actionType);
		wagesPopUp
		.then(
				function(
						data) {
					$scope.wages = data.employeeWageRateTOs;
				},
				function(
						error) {
					GenericAlertService.alertMessage("Error occured while selecting wages details",
									'Error');
				});
	}
	service.addEmpWages = function(actionType) {
		if(actionType === 'Edit' && editWages.length <= 0) 
		{
			GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
			return;
		}
		wagesPopUp=ngDialog.open({
			template : 'views/centrallib/employeewages/addwagespopup.html',
			className: 'ngdialog-theme-plain ng-dialogueCustom4',
			scope : $scope,
			showClose : true,
			closeByDocument : false,
			controller : [ '$scope', function($scope) {
				$scope.action = actionType;
				 var selectedWages=[];
				$scope.addWages = [];
				 var selectedWages=[];
				if (actionType === 'Add') {
					$scope.addWages.push({
						"code" : '',
						"name" : '',
						"wageFactor":'',
						"status" : 1,
						"selected" : false
						
					});
				} else {
					$scope.addWages = angular.copy(editWages);
					editWages=[];
				}
				$scope.addRows = function() {
					$scope.addWages.push({
						"code" : '',
						"name" : '',
						"wageFactor":'',
						"status" : 1,
						"selected" : false
					});
				}, 
				$scope.saveEmpWages = function() {				
					var empWageMap=[];
					angular.forEach($scope.addWages,function(value,key) {
										if(empWageMap[value.code]!=null){
											GenericAlertService.alertMessage('Duplicate Employee Wage Codes  are not allowed',"Error");
											forEach.break();
											}else
												{
												empWageMap[value.code]=true;
												}
									});
					var req = {
							"employeeWageRateTOs" : $scope.addWages
					}
					var results =[];
					WageService.saveEmpWages(req).then(function(data) {
                    	   results =data.employeeWageRateTOs  ;
						   var succMsg = GenericAlertService.alertMessageModal('EmployeeWages Details '+ data.message,data.status);
						   succMsg.then(function(data1) {			
								 var returnPopObj = {
		                                 "employeeWageRateTOs":  results                         
		                             }
								  deferred.resolve(returnPopObj); 
						   })
						},function (error){
								GenericAlertService.alertMessage('EmployeeWages Details  are failed to save',"Error");
							});
					 ngDialog.close();
			},
			$scope.popUpRowSelect = function(wage) {
				if (wage.selected) {
					selectedWages.push(wage);
				} else {
					selectedWages.pop(wage);
				}
			},$scope.deleteRows = function() {
				if(selectedWages.length==0){
					GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
				}
				if(selectedWages.length<$scope.addWages.length)
					{
					angular.forEach(selectedWages, function(value,key) {
						$scope.addWages.splice($scope.addWages.indexOf(value), 1);
					
					});
					selectedWages=[];
					GenericAlertService.alertMessage('Rows are Deleted successfully',"Info");
					}else
						{
						GenericAlertService.alertMessage('Please leave atlist one row',"Warning");
						}
			}
			
			} ]
		});
		return deferred.promise;
	}
	
	$scope.activeEmpWages = function() {
		if (editWages.length <= 0) {
			GenericAlertService.alertMessage('Please select atleast one row to Activate',"Warning");
			return;
		}
		var deleteIds = [];
		$scope.nondeleteIds = [];
		if ($scope.selectedAll) {
			$scope.wages = [];
		} else {
			angular.forEach(editWages, function(value,
					key) {
					deleteIds.push(value.wageRateId);
			});
			var req = {
				"empWageIds" : deleteIds,
				"status":1
			};
			WageService.deleteEmpWages(req).then(
					function(data) {
					});
			GenericAlertService.alertMessage('EmployeeWages are Activated successfully','Info');
			angular.forEach(editWages, function(value,key) {
				$scope.wages.splice($scope.wages.indexOf(value), 1);
			},
			function(error) {
				GenericAlertService.alertMessage('EmployeeWages are failed to Activate',"Error");
			});
			editWages = [];
			$scope.deleteIds = [];
			
		}
	} 
	$scope.deleteEmpWages = function() {
		if (editWages.length <= 0) {
			GenericAlertService.alertMessage('Please select atleast one row to Deactivate',"Warning");
			return;
		}
		var deleteIds = [];
		$scope.nondeleteIds = [];
		if ($scope.selectedAll) {
			$scope.wages = [];
		} else {
			angular.forEach(editWages, function(value,
					key) {
					deleteIds.push(value.wageRateId);
			});
			var req = {
				"empWageIds" : deleteIds,
				"status":2
			};
			WageService.deleteEmpWages(req).then(
					function(data) {
					});
			GenericAlertService.alertMessage('EmployeeWages are Deactivated successfully','Info');
			angular.forEach(editWages, function(value,key) {
				$scope.wages.splice($scope.wages.indexOf(value), 1);
			},
			function(error) {
				GenericAlertService.alertMessage('EmployeeWages are failed to Deactivate',"Error");
			});
			editWages = [];
			$scope.deleteIds = [];
			
		}
	}
	return service;
});
