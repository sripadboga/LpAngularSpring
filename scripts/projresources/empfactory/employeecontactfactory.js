'use strict';
app.factory('EmployeeContactFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var empContactFactoryPopUp;
		var service = {};
		service.empContactFactoryPopUp = function(actionType,editEmpContactDetails,empId) {
		var deferred = $q.defer();
		empContactFactoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/contactdetails/empcontactdetailspopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpContactDetails =[];
				var selectedEmpContactDetails=[];
				if (actionType === 'Add'){		
					$scope.addEmpContactDetails.push({
						"selected" : false,
						"status":1,
						"empRegDtlId": empId,
						"date" : null,
						"residentialAddr" : null,
						"postalAddr" : null,
						"phoneNumber" : null,
						"phoneAlternateNumber" : null,
						"email" : null
					});
				}	
				else {
					$scope.addEmpContactDetails = angular.copy(editEmpContactDetails);
					editEmpContactDetails=[];
				}
				$scope.addRows = function() {
					$scope.addEmpContactDetails.push({
						"selected" : false,
						"status":1,
						"empRegDtlId": empId,
						"date" : null,
						"residentialAddr" : null,
						"postalAddr" : null,
						"phoneNumber" : null,
						"phoneAlternateNumber" : null,
						"email" : null
					});
				},
				$scope.contactPopUpRowSelect = function(contact) {
					if (contact.selected) {
						selectedEmpContactDetails.push(contact);
					} else {
						selectedEmpContactDetails.pop(contact);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpContactDetails.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpContactDetails.length < $scope.addEmpContactDetails.length)
					{
						angular.forEach(selectedEmpContactDetails, function(value,key) {
							$scope.addEmpContactDetails.splice($scope.addEmpContactDetails.indexOf(value), 1);
						});
						selectedEmpContactDetails=[];
						GenericAlertService.alertMessage('Selected Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				},
				
				$scope.saveEmpContacts = function(){
					var saveEmpContactReq={
						"empContactDtlTOs" : 	$scope.addEmpContactDetails
				};
					console.log(JSON.stringify(saveEmpContactReq));
					EmpRegisterService.saveEmpContacts(saveEmpContactReq).then(function(data) {
						GenericAlertService.alertMessage('Employee Contact  Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Contact  Details are Failed to Save ',"Info");
					});
					ngDialog.close();
				}
			}]
		});
		return deferred.promise;
		}
	return service;
});
