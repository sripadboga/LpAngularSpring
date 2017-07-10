'use strict';
app.factory('PlantDepreciationFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantDepreciationPopUp;
		var service = {};
		service.plantDepreciationPopUp = function(actionType,editDepreciation) {
		var deferred = $q.defer();
		plantDepreciationPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantdepreciation/depreciationpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
						$scope.action = actionType;
						if (actionType === 'Edit') {
							$scope.addDepreciationData =[];
							$scope.addDepreciationData = angular.copy(editDepreciation);
							editDepreciation=[];
						}
						$scope.save = function(){
							var req={
						}
							PlantRegisterService.savePlantRegisters(req).then(function(data) {
								GenericAlertService.alertMessage('Plant Depreciatioa and salvage Details are  '+data.message,data.status);
							},function(error){
								GenericAlertService.alertMessage('Plant Depreciatioa and salvage Details are Failed to Save ',"Error");
							});
							ngDialog.close();
						}
							
						
						} ]
		});
						return deferred.promise;
					}
					return service;
				});
