'use strict';
app.factory('EmpTransferFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpTransferService,GenericAlertService ) {
		var empTransferPopUp;
		var service = {};
		 service.getEmpTransferDetailsPopup = function (projId) {
	         var deferred = $q.defer();
	         empTransferPopUp = ngDialog.open({
	             template: 'views/projresources/projempreg/emptransfer/emptrnasferselect.html',
	             className: 'ngdialog-theme-plain ng-dialogueCustom1',
	             controller: ['$scope', function ($scope) {
	                 $scope.empTransferDetails = []; 
	                 $scope.getEmpTransferDetails = function(){
	                	 var getEmpPopUpDtlReq = {						
	 							"status" : 1,
	 							"projId":projId
	 						};
	                	 EmpTransferService.getEmpTransferDetails(getEmpPopUpDtlReq).then(function(data) {
								$scope.empTransferDetails = data.empTransferTOs;
							},function(error){
								GenericAlertService.alertMessage('An error occurred while fetching Employee details',"Error");
							});
	                 },
	                 $scope.getEmpTransferDetails();
	                 $scope.selectedEmployee = function (employee) {                    
	                             ngDialog.close(empTransferPopUp);
	                             var returnPopObj = {
	                                 "selectedEmployee": employee                                 
	                             };
	                             deferred.resolve(returnPopObj);                        
	                 }        
	              }]
	         });
	         return deferred.promise;
	     };
		return service;
	});
