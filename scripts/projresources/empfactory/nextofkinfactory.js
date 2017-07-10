'use strict';
app.factory('NextOfKinFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var nextOfKinFactoryPopUp;
		var service = {};
		service.nextOfKinFactoryPopUp = function(actionType,editEmpNOK) {
		var deferred = $q.defer();
		nextOfKinFactoryPopUp = ngDialog.open({
			template : 'views/projresources/projempreg/nok/nokpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpNOK =[];
				var selectedEmpNOKDetails=[];
				
				if (actionType === 'Add'){		
					$scope.addEmpNOK.push({
						"selected" : false,
						"contactType" : null,
						"firstName" : null,
						"lastName" : null,
						"relation" : null,
						"residentialAddr" : null,
						"postalAddr" : null,
						"phoneNumber" : null,
						"alternatePhoneNumber" : null,
						"email" : null
					});
				}	
				else {
					$scope.addEmpNOK = angular.copy(editEmpNOK);
					editEmpNOK=[];
				}
				$scope.addRows = function() {
					$scope.addEmpNOK.push({
						"selected" : false,
						"contactType" : null,
						"firstName" : null,
						"lastName" : null,
						"relation" : null,
						"residentialAddr" : null,
						"postalAddr" : null,
						"phoneNumber" : null,
						"alternatePhoneNumber" : null,
						"email" : null
					});
				},
				$scope.empNOkRowSelect = function(nok) {
					if (nok.selected) {
						selectedEmpNOKDetails.push(nok);
					} else {
						selectedEmpNOKDetails.pop(nok);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpNOKDetails.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}
					else if(selectedEmpNOKDetails.length < $scope.addEmpNOK.length)
					{
						angular.forEach(selectedEmpNOKDetails, function(value,key) {
							$scope.addEmpNOK.splice($scope.addEmpNOK.indexOf(value), 1);
						});
						selectedEmpNOKDetails=[];
						GenericAlertService.alertMessage('Selected Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				},
				
				$scope.saveEmpNOKDetails = function(){
					var saveEmpNOKReq={
					"empNokTOs" : $scope.addEmpNOK
				};
					console.log(JSON.stringify(saveEmpNOKReq));
					EmpRegisterService.saveEmpNOK(saveEmpNOKReq).then(function(data) {
						GenericAlertService.alertMessage('Employee Next Of kin Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Next Of kin  Details are Failed to Save ',"Info");
					});
					ngDialog.close();
				}
			}]
		});
	return deferred.promise;
	}
return service;
});
