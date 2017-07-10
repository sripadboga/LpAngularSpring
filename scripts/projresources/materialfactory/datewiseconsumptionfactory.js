'use strict';
app.factory('DateWiseConsumptionFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var dateWiseConsumtionPopUp;
		var service = {};
		service.dateWiseConsumptionDetails = function(actionType,editDateWiseConsumption) {
		var deferred = $q.defer();
		dateWiseConsumtionPopUp = 	ngDialog.open({
			template : 'views/projresources/projmaterialreg/datewiseconsumption/datewisepopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addDateWiseConsumption =[];
			 var selectedConsumption=[];
			if (actionType === 'Add'){		
				$scope.addDateWiseConsumption.push({
					"selected" : false,
					"date" :'',
					"projectName" : '',
					"epsName" :'',
					"resourceId" :'',
					"resourceName" :'',
					"resourceSubGroupName" :'',
					"unitOfMeasure" :'',
					"materialSupplierName" :'',
					"purchaseOrderNumber" :'',
					"poScheduleItemId" :'',
					"docketDate" :'',
					"docketNumber" :'',
					"workDiaryId" :'',
					"supervisorName" :'',
					"dateWiseConsumptionQuantity" :'',
					"docketWiseCumulativeConsumption" :''
				});
			}	
			else {
				$scope.addDateWiseConsumption = angular.copy(editDateWiseConsumption);
				editDateWiseConsumption=[];
			}
			$scope.addRows = function() {
				$scope.addDateWiseConsumption.push({
					"selected" : false,
					"date" :'',
					"projectName" : '',
					"epsName" :'',
					"resourceId" :'',
					"resourceName" :'',
					"resourceSubGroupName" :'',
					"unitOfMeasure" :'',
					"materialSupplierName" :'',
					"purchaseOrderNumber" :'',
					"poScheduleItemId" :'',
					"docketDate" :'',
					"docketNumber" :'',
					"workDiaryId" :'',
					"supervisorName" :'',
					"dateWiseConsumptionQuantity" :'',
					"docketWiseCumulativeConsumption" :''
				});
			},
			$scope.consumptionPopUpRowSelect = function(consumption) {
				if (consumption.selected) {
					selectedConsumption.push(consumption);
				} else {
					selectedConsumption.pop(consumption);
				}
			},
			$scope.deleteRows = function() {
				if(selectedConsumption.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedConsumption.length<$scope.addDateWiseConsumption.length)
				{
					angular.forEach(selectedConsumption, function(value,key) {
						$scope.addDateWiseConsumption.splice($scope.addDateWiseConsumption.indexOf(value), 1);
					});
					selectedConsumption=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveDateWiseConsumption(req).then(function(data) {
					GenericAlertService.alertMessage('Material Date Wise Consumption  Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Date Wise Consumption Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}
			}]
			});
						return deferred.promise;
					}
					return service;
				});
