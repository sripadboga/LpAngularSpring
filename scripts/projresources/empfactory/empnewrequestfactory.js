'use strict';
app.factory('EmpNewRequestFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var empNewRequestFactoryPopUp;
		var service = {};
		service.empNewRequestFactoryPopUp = function(actionType,editEmpRequestTransfer) {
		var deferred = $q.defer();
		empNewRequestFactoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/newrequest/empnewrequestpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpRequestTransfer =[];
				var selectedEmpRequest=[];
				if (actionType === 'Add'){		
					$scope.addEmpRequestTransfer.push({
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
					$scope.addEmpRequestTransfer = angular.copy(editEmpRequestTransfer);
					editEmpRequestTransfer=[];
				}
				
				$scope.addRows = function() {
					$scope.addEmpRequestTransfer.push({
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
				$scope.newReqPopUpRowSelect = function(request) {
					if (request.selected) {
						selectedEmpRequest.push(request);
					} else {
						selectedEmpRequest.pop(request);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpRequest.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpRequest.length<$scope.addEmpRequestTransfer.length)
					{
						angular.forEach(selectedEmpRequest, function(value,key) {
							$scope.addEmpRequestTransfer.splice($scope.addEmpRequestTransfer.indexOf(value), 1);
						});
						selectedEmpRequest=[];
						GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				}
				 
				$scope.save = function(){
					var req={
				}
					EmpRegisterService.saveEmpregisters(req).then(function(data) {
						GenericAlertService.alertMessage('Employee New Request Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee New Request Details Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});
