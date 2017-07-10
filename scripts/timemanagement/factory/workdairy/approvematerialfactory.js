'use strict';
app.factory('ApprovedMaterialFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var approvedMaterialFactoryPopUp;
		var service = {};
		service.approvedMaterialFactoryPopUp = function(actionType,editMaterial) {
		var deferred = $q.defer();
		approvedMaterialFactoryPopUp = ngDialog.open({
			template : 'views/timemanagement/workdairy/approveworkdairy/approvematerialpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				
				$scope.addMatestore =[];
				
				$scope.addMatestore = angular.copy(editMaterial);
				editMaterial=[];
					$scope.save = function(){
						alert("hi");
						var req={
					}
						ApproveMaterialService.saveApprovedMaterial(req).then(function(data) {
							GenericAlertService.alertMessage('Approved Material Details '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Approved Material Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
		
			}]
		});
						return deferred.promise;
					}
					return service;
				});
