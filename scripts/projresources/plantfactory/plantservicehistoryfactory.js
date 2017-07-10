'use strict';
app.factory('PlantServiceHistoryFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantServiceHistoryPopUp;
		var service = {};
		service.plantServiceHistoryPopUp = function(actionType,editServiceHistory) {
		var deferred = $q.defer();
		plantServiceHistoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantservicehistory/servicehistorypopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){

					$scope.action = actionType;
					$scope.addServiceHistoryData =[];
					var 	selectedServiceHistory=[];

					if (actionType === 'Add'){		
						$scope.addServiceHistoryData.push({
							"selected" : false,
							"date" : '',
							"odoMeterRdng" : '',
							"ServiceCateg" : '',
							"ServiceSubCate" : '',
							"OdoMtrReaches" : '',
							"ServiceCate2" : '',
							"ServiceSubCate2" : '',
							"Date2" : '',
							"OdoMeterRdng2":'',
							"RepairCate" : '',
								"ItemOfRepair" : '',
								"MajorSpare" : '',
								"UnitOfMeasure" : '',
								"Qty" : '',
								"ProjectDocket":'',
								"Notes" : ''
						});
					}	
					else {
						$scope.addServiceHistoryData = angular.copy(editServiceHistory);
						editServiceHistory=[];
					}

					$scope.addRows = function() {
						$scope.addServiceHistoryData.push({
							"selected" : false,
							"date" : '',
							"odoMeterRdng" : '',
							"ServiceCateg" : '',
							"ServiceSubCate" : '',
							"OdoMtrReaches" : '',
							"ServiceCate2" : '',
							"ServiceSubCate2" : '',
							"Date2" : '',
							"OdoMeterRdng2":'',
							"RepairCate" : '',
								"ItemOfRepair" : '',
								"MajorSpare" : '',
								"UnitOfMeasure" : '',
								"Qty" : '',
								"ProjectDocket":'',
								"Notes" : ''
							
						});
					},
					$scope.serviceHistoryPopUpRowSelect = function(servicehistory) {
						if (servicehistory.selected) {
							selectedServiceHistory.push(servicehistory);
						} else {
							selectedServiceHistory.pop(servicehistory);
						}
					},
					$scope.deleteRows = function() {
						if(selectedServiceHistory.length==0){
							GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
						}if(selectedServiceHistory.length<$scope.addServiceHistoryData.length)
						{
							angular.forEach(selectedServiceHistory, function(value,key) {
								$scope.addServiceHistoryData.splice($scope.addServiceHistoryData.indexOf(value), 1);
							});
							selectedServiceHistory=[];
							GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
							}else
							{
								GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
								}
					}
					$scope.save = function(){
						var req={
					}
						PlantRegisterService.savePlantRegisters(req).then(function(data) {
							GenericAlertService.alertMessage('Plant ServiceHistory Details are  '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Plant ServiceHistory Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
			}]
			
			
						
		});
						return deferred.promise;
					}
					return service;
				});
