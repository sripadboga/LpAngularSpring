'use strict';
app.factory('ApprovedPlantFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var approvedPlantFactoryPopUp;
		var service = {};
		service.approvedPlantFactoryPopUp = function(actionType,editPlant) {
		var deferred = $q.defer();
		approvedPlantFactoryPopUp = ngDialog.open({
			template : 'views/timemanagement/workdairy/approveworkdairy/approveplantpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				
				$scope.addPlants =[];
				
				$scope.addPlants = angular.copy(editPlant);
				editPlant=[];
					$scope.save = function(){
						var req={
					}
						ApprovePlantService.saveApprovedPlant(req).then(function(data) {
							GenericAlertService.alertMessage('Approved Plant Details '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Approved Plant Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
		
			}]
		});
						return deferred.promise;
					}
					return service;
				});
