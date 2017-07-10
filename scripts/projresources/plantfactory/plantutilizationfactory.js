'use strict';
app.factory('PlantUtilizationFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService ) {
		var plantUtilizationPopUp;
		var service = {};
		service.plantUtilizationPopUp = function(actionType,editUtilization) {
		var deferred = $q.defer();
		plantUtilizationPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantutilization/plantutilizationpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
						$scope.action = actionType;
						
						if (actionType === 'Edit') {
							$scope.addUtilizationData =[];
							$scope.addUtilizationData = angular.copy(editUtilization);
							editUtilization=[];
						}
						
						$scope.save = function(){
							var req={
						}
							PlantRegisterService.savePlantRegisters(req).then(function(data) {
								GenericAlertService.alertMessage('Plant Utilization Details are  '+data.message,data.status);
							},function(error){
								GenericAlertService.alertMessage('Plant Utilization Details  are Failed to Save ',"Error");
							});
							ngDialog.close();
						}
							
						
						
						} ]
		});
						return deferred.promise;
					}
					return service;
				});
