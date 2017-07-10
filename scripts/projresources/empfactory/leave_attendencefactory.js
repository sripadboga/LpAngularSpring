'use strict';
app.factory('LeaveAndAttendenceFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var leaveAttendenceFactoryPopUp;
		var service = {};
		service.leaveAttendenceFactoryPopUp = function(actionType,editEmpLeaveAttendence) {
		var deferred = $q.defer();
		leaveAttendenceFactoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/leave&attendence/leave_attendancerecordspopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpLeaveAttendence =[];
				$scope.addEmpLeaveAttendence = angular.copy(editEmpLeaveAttendence);
				editEmpLeaveAttendence=[];
				
				$scope.save = function(){
					var req={
						
					
				}
					EmpRegisterService.saveEmpregisters(req).then(function(data) {
						GenericAlertService.alertMessage('Employee Leave and Attendence Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Leave and Attendence Details are Failed to Save ',"Info");
					});
					ngDialog.close();
				}
			}]
		});
						return deferred.promise;
					}
					return service;
				});
