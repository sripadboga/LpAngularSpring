'use strict';
app.factory('PlantChargeFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService ) {
		var plantChargePopUp;
		var service = {};
		service.plantChargePopUp = function(actionType,editCharge) {
		var deferred = $q.defer();
		plantChargePopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantcharge/chargepopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
						$scope.action = actionType;
						
						if (actionType === 'Edit') {
							$scope.addChargeData =[];
							$scope.addChargeData = angular.copy(editCharge);
							editCharge=[];
						}
									
						$scope.save = function(){
							var req={
						}
							PlantRegisterService.savePlantRegisters(req).then(function(data) {
								GenericAlertService.alertMessage('Plant ChargeOut Details are  '+data.message,data.status);
							},function(error){
								GenericAlertService.alertMessage('Plant ChargeOut Details are  Failed to Save ',"Error");
							});
							ngDialog.close();
						}
						
						} ]
		});
						return deferred.promise;
					}
					return service;
				});
