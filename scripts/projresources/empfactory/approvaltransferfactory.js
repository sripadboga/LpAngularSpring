'use strict';
app.factory('EmpApprovalTransferFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var approvalTransferFactoryPopUp;
		var service = {};
		service.approvalTransferFactoryPopUp = function(actionType,editEmpApprovalTransfer) {
		var deferred = $q.defer();
		approvalTransferFactoryPopUp = ngDialog.open({
			template : 'views/projresources/projempreg/approvaltransfer/approvaltransferpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpApprovalTransfer =[];
				$scope.addEmpApprovalTransfer = angular.copy(editEmpApprovalTransfer);
				editEmpApprovalTransfer=[];
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
						GenericAlertService.alertMessage('Employee  Approval Transfer Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee  Approval Transfer Details Failed to Save ',"Error");
					});
					ngDialog.close();
				}
			}]
		});
						return deferred.promise;
					}
					return service;
				});
