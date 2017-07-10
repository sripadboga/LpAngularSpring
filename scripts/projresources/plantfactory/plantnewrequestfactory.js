'use strict';
app.factory('PlantNewRequestFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,GenericAlertService,PlantRegisterService  ) {
		var plantNewRequestPopUp;
		var service = {};
		service.plantNewRequestPopUp = function(actionType,editNewRequest) {
		var deferred = $q.defer();
		plantNewRequestPopUp = 	ngDialog.open({
			template : 'views/projresources/projplantreg/plantnewrequest/newrequestpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedPlantNewRequest=[];
				$scope.addNewRequestData =[];
				if (actionType === 'Add'){		
					$scope.addNewRequestData.push({
						"selected" : false,
						"eId" :'',
						"fName" :'',
						"lName" :'',
						"gender" :'',
						"pName" :'',
						"designation" :'',
						"pCompId" :'',
						"pCompName" :'',
						"cpId" :'',
						"cpName" :'',
						"fpId" :'',
						"fpName" :'',
						"originaleIdName" :'',
						"approverPIDName" :'',
						"dor" :'',
						"notfId" :'',
						"expectedDate" :'',
						"requiredDate" :'',
						"approverDecision" :'',
						"proposedDate" :''
					});
				}	
				else {
					$scope.addNewRequestData = angular.copy(editNewRequest);
					editNewRequest=[];
				}
				
				$scope.addRows = function() {
					$scope.addNewRequestData.push({
						"selected" : false,
						"eId" :'',
						"fName" :'',
						"lName" :'',
						"gender" :'',
						"pName" :'',
						"designation" :'',
						"pCompId" :'',
						"pCompName" :'',
						"cpId" :'',
						"cpName" :'',
						"fpId" :'',
						"fpName" :'',
						"originaleIdName" :'',
						"approverPIDName" :'',
						"dor" :'',
						"notfId" :'',
						"expectedDate" :'',
						"requiredDate" :'',
						"approverDecision" :'',
						"proposedDate" :''
						
					});
				},
				$scope.reqPopUpRowSelect = function(request) {
					if (request.selected) {
						selectedPlantNewRequest.push(request);
					} else {
						selectedPlantNewRequest.pop(request);
					}
				},
				$scope.deleteRows = function() {
					if(selectedPlantNewRequest.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedPlantNewRequest.length<$scope.addNewRequestData.length)
					{
						angular.forEach(selectedPlantNewRequest, function(value,key) {
							$scope.addNewRequestData.splice($scope.addNewRequestData.indexOf(value), 1);
						});
						selectedPlantNewRequest=[];
						GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				}
				$scope.save = function(){
					var req={
				}
					PlantRegisterService.savePlantRegisters(req).then(function(data) {
						GenericAlertService.alertMessage('Plant New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Plant New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});
