'use strict';
app.factory('PlantPendingRequestFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantPendingRequestPopUp;
		var service = {};
		service.plantPendingRequestPopUp = function(actionType,editRequestApproval) {
		var deferred = $q.defer();
		plantPendingRequestPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantrequestapproval/pendingrequestpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addPendingRequest =[];
				if (actionType === 'Edit') {
					$scope.addPendingRequest =[];
					$scope.addPendingRequest = angular.copy(editRequestApproval);
					editRequestApproval=[];
				}
			
				$scope.save = function(){
					var req={
				}
					PlantRegisterService.savePlantRegisters(req).then(function(data) {
						GenericAlertService.alertMessage('Plant Pending Approval Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Plant Pending Approval Details are  Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]

		});
						return deferred.promise;
					}
					return service;
				});
