'use strict';
app.factory('BankAccountFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var bankAccountFactoryPopUp;
		var service = {};
		service.bankAccountFactoryPopUp = function(actionType,editEmpBankAccountDetails,empId) {
		var deferred = $q.defer();
		bankAccountFactoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/bankaccountdetails/bankaccountdetailspopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpBankAccountDetails =[];
				var selectedEmpBankDetails=[];
				
				$scope.empBankAccountDetailsOnLoad = function(){
					var onLoadBankAccountReq = {
							"status" : 1,
							"empId" : empId
					};
				EmpRegisterService
				.empBankAccountDetailsOnLoad(
						onLoadBankAccountReq)
				.then(
						function(data) {
							console.log(JSON.stringify(data));
							$scope.accountStatusTypes = data.accountStatusTypes;
						},
						function(error) {
							GenericAlertService
									.alertMessage(
											"Error Occured While Getting Employee Bank Account Details",
											'Error');
						});
				}
				$scope.empBankAccountDetailsOnLoad();
				if (actionType === 'Add'){		
					$scope.addEmpBankAccountDetails.push({
				"selected" : false,
				"status": 1,
				"empRegDtlId": empId,
				"date" : null,
				"bankName" : null,
				"address" : null,
				"ifscCode" : null,
				"accName" : null,
				"accNumber" : null,
				"accType" : null,
				"accStatus" : null,
				"accComments" : null
					});
				}	
				else {
					$scope.addEmpBankAccountDetails = angular.copy(editEmpBankAccountDetails);
					editEmpBankAccountDetails=[];
				}
				$scope.addRows = function() {
					$scope.addEmpBankAccountDetails.push({
						"selected" : false,
						"status": 1,
						"empRegDtlId": empId,
						"date" : null,
						"bankName" : null,
						"address" : null,
						"ifscCode" : null,
						"accName" : null,
						"accNumber" : null,
						"accType" : null,
						"accStatus" : null,
						"accComments" : null
					});
				},
				$scope.BankAccPopUpRowSelect = function(account) {
					if (account.selected) {
						selectedEmpBankDetails.push(account);
					} else {
						selectedEmpBankDetails.pop(account);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpBankDetails.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpBankDetails.length<$scope.addEmpBankAccountDetails.length)
					{
						angular.forEach(selectedEmpBankDetails, function(value,key) {
							$scope.addEmpBankAccountDetails.splice($scope.addEmpBankAccountDetails.indexOf(value), 1);
						});
						selectedEmpBankDetails=[];
						GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
							
				}
				 
				$scope.saveEmpBankAccountDetails = function(){
					var saveBankAccountReq={
						"empBankAccountDtlTOs":	$scope.addEmpBankAccountDetails
				};
					console.log(JSON.stringify(saveBankAccountReq));
					EmpRegisterService.saveEmpBankAccountDetails(saveBankAccountReq).then(function(data) {
						GenericAlertService.alertMessage('Employee Bank Account Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Bank Account Details Failed to Save ',"Info");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});
