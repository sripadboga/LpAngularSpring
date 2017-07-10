'use strict';
app.factory('DateWiseFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CreateTimeSheetService,GenericAlertService ) {
		var dateWisePopUp;
		var service = {};
		service.dateWisePopUp = function(actionType,editDate) {
		var deferred = $q.defer();
		dateWisePopUp = ngDialog
		.open({
			template : 'views/timemanagement/timesheet/createtimesheet/datewisepopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedDate=[];
				 $scope.dateList =[];
				
				if (actionType === 'Add'){		
					$scope.dateList.push({
						"selected" : false,
						"mon" :'abc',
						"tue" :'s',
						"wed" :'',
						"thu" :'',
						"fri" :'',
						"sat" :'',
						"sun" :'',
						"total" :'',
						
					});
				}	
				else {
					$scope.dateList = angular.copy(editDate);
					editDate=[];
				}
				
				$scope.addDateRows = function() {
					$scope.dateList.push({
						"selected" : false,
						"mon" :'abc',
						"tue" :'s',
						"wed" :'',
						"thu" :'',
						"fri" :'',
						"sat" :'',
						"sun" :'',
						"total" :'',
						
					});
				},
				$scope.datePopUpRowSelect = function(date ) {
					if (date .selected) {
						selectedDate.push(date );
					} else {
						selectedDate.pop(date );
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedDate.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedDate.length < $scope.dateList.length) {
						angular
								.forEach(
										selectedDate,
										function(
												value,
												key) {
											$scope.dateList
													.splice(
															$scope.dateList
																	.indexOf(value),
															1);
										
										});
						selectedDate = [];
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
				$scope.saveDate = function(){
					var req={
				}
					CreateTimeSheetService.saveDateWise(req).then(function(data) {
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

