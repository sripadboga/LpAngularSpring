'use strict';
app.factory('ApprovedManpowerFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var approvedManpowerFactoryPopUp;
		var service = {};
		service.approvedManpowerFactoryPopUp = function(actionType,editManpower) {
		var deferred = $q.defer();
		approvedManpowerFactoryPopUp = ngDialog.open({
			template : 'views/timemanagement/workdairy/approveworkdairy/approvemanpowerpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				
				$scope.addMans =[];
				
				$scope.addMans = angular.copy(editManpower);
				editManpower=[];
					$scope.save = function(){
						var req={
					}
						ApproveManpowerService.saveApprovedManpower(req).then(function(data) {
							GenericAlertService.alertMessage('Approved Manpower Details '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Approved Manpower Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
		
			}]
		});
						return deferred.promise;
					}
					return service;
				});
