'use strict';
app.factory('PlantPendingApprovalFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantPendingApprovalPopUp;
		var service = {};
		service.plantPendingApprovalPopUp = function(actionType,editPendingApproval) {
		var deferred = $q.defer();
		plantPendingApprovalPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantapprovaltransfer/pendingapprovalpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addPendingApproval =[];
				if (actionType === 'Edit') {
					$scope.addPendingApproval =[];
					$scope.addPendingApproval = angular.copy(editPendingApproval);
					editPendingApproval=[];
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
