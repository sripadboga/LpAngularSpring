'use strict';
app.factory('MaterialDailyIssueFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialDailyIssuePopUp;
		var service = {};
		service.materialDailyIssueDetails = function(actionType,editDailyIssueRecords) {
		var deferred = $q.defer();
		materialDailyIssuePopUp = 	ngDialog.open({
			template : 'views/projresources/projmaterialreg/dailyissue/dailyissuepopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addDailyIssueRecords =[];
			var 	selectedDailyIssue=[];

			if (actionType === 'Add'){		
				$scope.addDailyIssueRecords.push({
					"selected" : false,
					"dateOfIssue" :'',
					"preApprovalNotfId" :'',
					"projectDocket" :'',
					"resourceId" :'',
					"resourceName" :'',
					"resourceSubGroupId" :'',
					"resourceSubGroupName" :'',
					"originProject" :'',
					"originStoreStockYard" :'',
					"destinationProject" :'',
					"destinationStoreStockYard" :'',
					"supplierId" :'',
					"supplierName" :'',
					"issueEmployeeId" :'',
					"issueEmployeeName" :'',
					"receiverEmployeeId" :'',
					"receiverEmployeeName" :'',
					"unitOfMeasure" :'',
					"quantity" :'',
					"rate" :'',
					"comments" :''
				});
			}	
			else {
				$scope.addDailyIssueRecords = angular.copy(editDailyIssueRecords);
				editDailyIssueRecords=[];
			}
			$scope.addRows = function() {
				$scope.addDailyIssueRecords.push({
					"selected" : false,
					"dateOfIssue" :'',
					"preApprovalNotfId" :'',
					"projectDocket" :'',
					"resourceId" :'',
					"resourceName" :'',
					"resourceSubGroupId" :'',
					"resourceSubGroupName" :'',
					"originProject" :'',
					"originStoreStockYard" :'',
					"destinationProject" :'',
					"destinationStoreStockYard" :'',
					"supplierId" :'',
					"supplierName" :'',
					"issueEmployeeId" :'',
					"issueEmployeeName" :'',
					"receiverEmployeeId" :'',
					"receiverEmployeeName" :'',
					"unitOfMeasure" :'',
					"quantity" :'',
					"rate" :'',
					"comments" :''
				});
			},
			$scope.dailyIssuePopUpRowSelect = function(dailyissue) {
				if (dailyissue.selected) {
					selectedDailyIssue.push(dailyissue);
				} else {
					selectedDailyIssue.pop(dailyissue);
				}
			},
			$scope.deleteRows = function() {
				if(selectedDailyIssue.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedDailyIssue.length<$scope.addDailyIssueRecords.length)
				{
					angular.forEach(selectedDailyIssue, function(value,key) {
						$scope.addDailyIssueRecords.splice($scope.addDailyIssueRecords.indexOf(value), 1);
					});
					selectedDailyIssue=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveDailyIssue(req).then(function(data) {
					GenericAlertService.alertMessage('Material Daily Issue Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Daily  Issue Details Failed to Save ',"Error");
				});
				ngDialog.close();
			}
			}]
			});
						return deferred.promise;
					}
					return service;
				});
