'use strict';
app.factory('MaterialApprovalTransferFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialTransferPopUp;
		var service = {};
		service.materialApprovalTransferDetails = function(actionType,editApprovalMaterialTransfer) {
		var deferred = $q.defer();
		materialTransferPopUp =ngDialog.open({
			template : 'views/projresources/projmaterialreg/approvalmaterialtransfer/approvalpopup.html',

			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addApprovalMaterialTransfer =[];

			var selectedApprovalReq=[];
			if (actionType === 'Add'){		
				$scope.addApprovalMaterialTransfer.push({
					"selected" : false,
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupName" : '',
					"unitOfMeasure" : '',
					"poScheduleItemId" : '',
					"unitRate" : '',
					"expectedDateOfAvailabilityTransfer" : '',
					"fromProjectId" : '',
					"fromProjectName" : '',
					"destinationProjectId" : '',
					"destinationProjectName" : '',
					"requiredDateOfTransfer" : '',
					"actualDateOfTransfer" : '',
					"recordsOfRequiestsAndApprovalsNotifications" : '',
					"approvalDecision" : '',
					"notifyOriginator" : '',
					"multipleSelectionInternalProject" : '',
					"multipleSelectionExternalProject" : '',
					"approvalStatus" : ''
				});
			}	
			else {
				$scope.addApprovalMaterialTransfer =angular.copy(editApprovalMaterialTransfer);
				editApprovalMaterialTransfer=[];
			}
			$scope.addRows = function() {
				$scope.addApprovalMaterialTransfer.push({
					"selected" : false,
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupName" : '',
					"unitOfMeasure" : '',
					"poScheduleItemId" : '',
					"unitRate" : '',
					"expectedDateOfAvailabilityTransfer" : '',
					"fromProjectId" : '',
					"fromProjectName" : '',
					"destinationProjectId" : '',
					"destinationProjectName" : '',
					"requiredDateOfTransfer" : '',
					"actualDateOfTransfer" : '',
					"recordsOfRequiestsAndApprovalsNotifications" : '',
					"approvalDecision" : '',
					"notifyOriginator" : '',
					"multipleSelectionInternalProject" : '',
					"multipleSelectionExternalProject" : '',
					"approvalStatus" : ''
				});
			},
			$scope.approvalPopUpRowSelect = function(approval) {
				if (approval.selected) {
					selectedApprovalReq.push(approval);
				} else {
					selectedApprovalReq.pop(approval);
				}
			},
			$scope.deleteRows = function() {
				if(selectedApprovalReq.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedApprovalReq.length<$scope.addApprovalMaterialTransfer.length)
				{
					angular.forEach(selectedApprovalReq, function(value,key) {
						$scope.addApprovalMaterialTransfer.splice($scope.addApprovalMaterialTransfer.indexOf(value), 1);
					});
					selectedApprovalReq=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveIssueDockets(req).then(function(data) {
					GenericAlertService.alertMessage('Material Approval Transfer Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Approval Transfer Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}

			}]
			});
						return deferred.promise;
					}
					return service;
				});
