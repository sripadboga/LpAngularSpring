'use strict';
app.factory('ApprovedProgressFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var approvedProgressFactoryPopUp;
		var service = {};
		service.approvedProgressFactoryPopUp = function(actionType,editProgress) {
		var deferred = $q.defer();
		approvedProgressFactoryPopUp = ngDialog.open({
			template : 'views/timemanagement/workdairy/approveworkdairy/approveprogresspopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				
				$scope.addProgresses =[];
				
				$scope.addProgresses = angular.copy(editProgress);
				editProgress=[];
					$scope.save = function(){
						var req={
					}
						ApproveProgressService.saveApprovedProgress(req).then(function(data) {
							GenericAlertService.alertMessage('Approved Progress Details '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Approved Progress Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
		
			}]
		});
						return deferred.promise;
					}
					return service;
				});
