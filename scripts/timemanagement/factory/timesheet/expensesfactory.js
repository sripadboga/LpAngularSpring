'use strict';
app.factory('ExpensesFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CreateTimeSheetService,GenericAlertService ) {
		var expensesFactPopUp;
		var service = {};
		service.expensesFactPopUp = function(actionType,editExpenses) {
		var deferred = $q.defer();
		expensesFactPopUp = ngDialog
		.open({
			template : 'views/timemanagement/timesheet/createtimesheet/expensespopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedExp=[];
				  $scope.expList =[];
				
				if (actionType === 'Add'){		
					$scope.expList.push({
						"selected" : false,
						"date" :'',
						"amount" :'',
						"description" :'',
						
						
					});
				}	
				else {
					$scope.expList = angular.copy(editExpenses);
					editExpenses=[];
				}
				
				$scope.addRows = function() {
					$scope.expList.push({
						"selected" : false,
						"date" :'',
						"amount" :'',
						"description" :'',
						
					});
				},
				$scope.expensesPopUpRowSelect = function(expenses) {
					if (expenses.selected) {
						selectedExp.push(expenses );
					} else {
						selectedExp.pop(expenses );
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedExp.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedExp.length < $scope.expList.length) {
						angular
								.forEach(
										selectedExp,
										function(
												value,
												key) {
											$scope.expList
													.splice(
															$scope.expList
																	.indexOf(value),
															1);
										
										});
						selectedExp = [];
						GenericAlertService
						.alertMessage(
								'Rows are deleted Successfully',
								"Info");
					} else {
						GenericAlertService
								.alertMessage(
										'Please leave atleast one row',
										"Warning");
					}
				}
				$scope.saveExp = function(){
					var req={
				}
					CreateTimeSheetService.saveExpenses(req).then(function(data) {
						GenericAlertService.alertMessage('Plant New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Plant New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

