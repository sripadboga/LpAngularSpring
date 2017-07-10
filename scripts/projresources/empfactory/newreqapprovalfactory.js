'use strict';
app.factory('EmpRequestApprovalFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var requestApprovalFactoryPopUp;
		var service = {};
		service.requestApprovalFactoryPopUp = function(actionType,editEmpRequestApproval) {
		var deferred = $q.defer();
		requestApprovalFactoryPopUp = ngDialog.open({
			template : 'views/projresources/projempreg/newreqapproval/newreqapprovalpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpRequestApproval =[];
				$scope.addEmpRequestApproval = angular.copy(editEmpRequestApproval);
				editEmpRequestApproval=[];
				$scope.decisions = [ {
					id : 1,
					name : "Approved"
				}, {
					id : 2,
					name : "Not Approved"
				} ];
				$scope.save = function(){
					var req={
						
					
				}
					EmpRegisterService.saveEmpregisters(req).then(function(data) {
						GenericAlertService.alertMessage('Employee  Request Approval  Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee  Request Approval  Details Failed to Save ',"Error");
					});
					ngDialog.close();
				}
			}]
		});
						return deferred.promise;
					}
					return service;
				});
