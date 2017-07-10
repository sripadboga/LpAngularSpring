'use strict';
app.factory('PlantDeploymentFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantDeploymentPopUp;
		var service = {};
		service.plantDeploymentPopUp = function(actionType,editDeployment) {
		var deferred = $q.defer();
		plantDeploymentPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantdeployment/deploymentpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
						$scope.action = actionType;
						if (actionType === 'Edit') {
							$scope.addDeploymentData =[];
							$scope.addDeploymentData = angular.copy(editDeployment);
							editDeployment=[];
						}
						$scope.postDemobilisations=[{
							id:1,
							name:"On Transfer"
						},{
							id:2,
							name:"Returned  to  Supplier"
						},{
							id:3,
							name:"Salvaged"
						}]
						
						$scope.save = function(){
							var req={
						}
							PlantRegisterService.savePlantRegisters(req).then(function(data) {
								GenericAlertService.alertMessage('Plant Deployement Details  '+data.message,data.status);
							},function(error){
								GenericAlertService.alertMessage('Plant Deployement Details are Failed to Save ',"Error");
							});
							ngDialog.close();
						}
						} ]
		});
						return deferred.promise;
					}
					return service;
				});
