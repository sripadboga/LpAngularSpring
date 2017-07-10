'use strict';
app.factory('PlantLogBookFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantLogBookPopUp;
		var service = {};
		service.plantLogBookPopUp = function(actionType,editLogBook) {
		var deferred = $q.defer();
		plantLogBookPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantlogbook/plantlogbookpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
					$scope.action = actionType;
					$scope.addLogBookData =[];
					var selectedlogbook=[];
					if (actionType === 'Add'){		
						$scope.addLogBookData.push({
							"selected" : false,
							"date" : '',
							"AssName" : '',
							"Eps" : '',
							"Project" : '',
							"DriverId" : '',
							"DriverName" : '',
							"StrtMtrRdng" : '',
							"EndMeterRdng" : '',
							"NetUnit":'',
							"Purpose" : ''
						});
					}	
					else {
						$scope.addLogBookData = angular.copy(editLogBook);
						editLogBook=[];
					}
					$scope.addRows = function() {
						$scope.addLogBookData.push({
							"selected" : false,
							"date" : '',
							"AssName" : '',
							"Eps" : '',
							"Project" : '',
							"DriverId" : '',
							"DriverName" : '',
							"StrtMtrRdng" : '',
							"EndMeterRdng" : '',
							"NetUnit":'',
							"Purpose" : ''
							
						});
					},
					$scope.logBookPopUpRowSelect = function(logbook) {
						if (logbook.selected) {
							selectedlogbook.push(logbook);
						} else {
							selectedlogbook.pop(logbook);
						}
					},
					$scope.deleteRows = function() {
						if(selectedlogbook.length==0){
							GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
						}if(selectedlogbook.length<$scope.addLogBookData.length)
						{
							angular.forEach(selectedlogbook, function(value,key) {
								$scope.addLogBookData.splice($scope.addLogBookData.indexOf(value), 1);
							});
							selectedlogbook=[];
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
							GenericAlertService.alertMessage('Plant LogBook Details are  '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Plant LogBook Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
				
		
		
						} ]
		});
						return deferred.promise;
					}
					return service;
				});
