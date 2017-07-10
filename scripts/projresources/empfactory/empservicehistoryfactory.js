'use strict';
app.factory('EmpServiceHistoryFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var empServiceHistoryPopUp;
		var service = {};
		service.empServiceHistoryPopUp = function(actionType,editEmpServiceHistory) {
		var deferred = $q.defer();
		empServiceHistoryPopUp = ngDialog.open({
			template : 'views/projresources/projempreg/empservicehistory/empservicehistorypopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				
				$scope.addEmpServiceHistory =[];
				var selectedEmpServiceHistory = [];
				
				if (actionType === 'Add'){		
					$scope.addEmpServiceHistory.push({
						"select":null,	
						"postingProject ":null,
						"epsId":null,
						"empDesgPayRoll":null,
						"empDesgProject":null,
						"empDesgTrade":null,
						"category":null,
						"actMobilDate":null,
						"expDeMobilDate":null,
						"actDeMobilDate":null,
						"responsibilities" :null,
						"posDeMobilStatus" :null,
						"notes":null
					});
				}	
				else {
					$scope.addEmpServiceHistory = angular.copy(editEmpServiceHistory);
					editEmpServiceHistory=[];
				}
				$scope.addRows = function() {
					$scope.addEmpServiceHistory.push({
						"select":null,	
						"postingProject ":null,
						"epsId":null,
						"empDesgPayRoll":null,
						"empDesgProject":null,
						"empDesgTrade":null,
						"category":null,
						"actMobilDate":null,
						"expDeMobilDate":null,
						"actDeMobilDate":null,
						"responsibilities" :null,
						"posDeMobilStatus" :null,
						"notes":null
					});
				},
					$scope.promotionPopUpRowSelect = function(empHistory) {
						if (empHistory.selected) {
							selectedEmpServiceHistory.push(empHistory);
						} else {
							selectedEmpServiceHistory.pop(empHistory);
						}
					},
					$scope.deleteRows = function() {
						if(selectedEmpServiceHistory.length==0){
							GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
						}if(selectedEmpServiceHistory.length<$scope.addEmpServiceHistory.length)
						{
							angular.forEach(selectedEnrollment, function(value,key) {
								$scope.addEmpServiceHistory.splice($scope.addEmpServiceHistory.indexOf(value), 1);
							});
							selectedEnrollment=[];
							GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
							}else
							{
								GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
								}
					},
			
					$scope.saveEmpServiceHistory = function(){
						var req={
								
					};
						EmpRegisterService.saveEmpregisters(req).then(function(data) {
							GenericAlertService.alertMessage('Employee Service History Details '+data.message,data.status);
						},function(error){
							GenericAlertService.alertMessage('Employee Service History Details are Failed to Save ',"Error");
						});
						ngDialog.close();
					}
			}]
		});
		return deferred.promise;
	}
	return service;
});
