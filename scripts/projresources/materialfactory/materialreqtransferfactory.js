'use strict';
app.factory('MaterialReqTransferFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialRequestPopUp;
		var service = {};
		service.materialRequestTransferDetails = function(actionType,editReqMaterialTransfer) {
		var deferred = $q.defer();
		materialRequestPopUp =ngDialog.open({
			template : 'views/projresources/projmaterialreg/reqmaterialtransfer/requestpopup.html',

			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addReqMaterialTransfer =[];
			var selectedRequest=[];

			if (actionType === 'Add'){		
				$scope.addReqMaterialTransfer.push({
					"selected" : false,
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupName" : '',
					"fromProjectId" : '',
					"fromProjectName" : '',
					"originatorEmployeeIdAndName" : '',
					"requisitionNumber" : '',
					"approverPersonIdAndName" : '',
					"destinationProjectId" : '',
					"destinationProjectName" : '',
					"unitOfMeasure" : '',
					"internalProjectTransfer" : '',
					"externalProjectTransfer" : '',
					"dateOfRequest" : '',
					"requiredDateOfTransfer" : '',
					"expectedDateOfTransfer" : '',
					"approvalStatus" : ''
				});
			}	
			else {
				$scope.addReqMaterialTransfer = angular.copy(editReqMaterialTransfer);
				editReqMaterialTransfer=[];
			}
			$scope.addRows = function() {
				$scope.addReqMaterialTransfer.push({
					"selected" : false,
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupName" : '',
					"fromProjectId" : '',
					"fromProjectName" : '',
					"originatorEmployeeIdAndName" : '',
					"requisitionNumber" : '',
					"approverPersonIdAndName" : '',
					"destinationProjectId" : '',
					"destinationProjectName" : '',
					"unitOfMeasure" : '',
					"internalProjectTransfer" : '',
					"externalProjectTransfer" : '',
					"dateOfRequest" : '',
					"requiredDateOfTransfer" : '',
					"expectedDateOfTransfer" : '',
					"approvalStatus" : ''
				});
			},
			$scope.reqPopUpRowSelect = function(request) {
				if (request.selected) {
					selectedRequest.push(request);
				} else {
					selectedRequest.pop(request);
				}
			},
			$scope.deleteRows = function() {
				if(selectedRequest.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedRequest.length<$scope.addReqMaterialTransfer.length)
				{
					angular.forEach(selectedRequest, function(value,key) {
						$scope.addReqMaterialTransfer.splice($scope.addReqMaterialTransfer.indexOf(value), 1);
					});
					selectedRequest=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveDateWiseConsumption(req).then(function(data) {
					GenericAlertService.alertMessage('Material Request Transfer Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Request Transfer Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}
			}]
			});
						return deferred.promise;
					}
					return service;
				});
