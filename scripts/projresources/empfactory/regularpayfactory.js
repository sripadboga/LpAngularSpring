'use strict';
app.factory('regularPayFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var regularPayPopUp;
		var service = {};
		service.regularPayPopUp = function(actionType,editEmpRegularPay) {
		var deferred = $q.defer();
		regularPayPopUp = 		ngDialog.open({
			template : 'views/projresources/projempreg/empregularpay/regularpaypopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpRegularPay =[];
				var 	selectedEmpAllowance=[];
				if (actionType === 'Add'){		
					$scope.addEmpRegularPay.push({
						"selected" : false,
						"projectPosting" : '',
						"effectiveFrom" : '',
						"epsId" :'',
						"epsName" : '',
						"pId" :'',
						"pName" :'',
						"pComId" :'',
						"pComName" :'',
						"taxNum" :'',
						"currency" :'',
						"payRate" :'',
						"payCycle" :'',
						"bp" : '',
						"ot" :'',
						"mva1" :'',
						"mva2" : '',
						"ta1" :'',
						"ta2" :'',
						"lafa1" :'',
						"lafa2" :'',
						"da1" :'',
						"da2" :'',
						"pa1" :'',
						"pa2" :'',
						"ma1" :'',
						"ma2" :'',
						"lsa1" :'',
						"lsa2" :'',
						"sfcc1" :'',
						"sfcc2" :'',
						"sfec1" :'',
						"sfec2" : '',
						"status" :'',
						"doc" :''
					});
				}	
				else {
					$scope.addEmpRegularPay = angular.copy(editEmpRegularPay);
					editEmpRegularPay=[];
				}
				$scope.addRows = function() {
					$scope.addEmpRegularPay.push({
						"selected" : false,
						"projectPosting" : '',
						"effectiveFrom" : '',
						"epsId" :'',
						"epsName" : '',
						"pId" :'',
						"pName" :'',
						"pComId" :'',
						"pComName" :'',
						"taxNum" :'',
						"currency" :'',
						"payRate" :'',
						"payCycle" :'',
						"bp" : '',
						"ot" :'',
						"mva1" :'',
						"mva2" : '',
						"ta1" :'',
						"ta2" :'',
						"lafa1" :'',
						"lafa2" :'',
						"da1" :'',
						"da2" :'',
						"pa1" :'',
						"pa2" :'',
						"ma1" :'',
						"ma2" :'',
						"lsa1" :'',
						"lsa2" :'',
						"sfcc1" :'',
						"sfcc2" :'',
						"sfec1" :'',
						"sfec2" : '',
						"status" :'',
						"doc" :''
					});
				},
				$scope.regPayPopUpRowSelect = function(regPay) {
					if (regPay.selected) {
						selectedEmpAllowance.push(regPay);
					} else {
						selectedEmpAllowance.pop(regPay);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpAllowance.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpAllowance.length<$scope.addEmpRegularPay.length)
					{
						angular.forEach(selectedEmpAllowance, function(value,key) {
							$scope.addEmpRegularPay.splice($scope.addEmpRegularPay.indexOf(value), 1);
						});
						selectedEmpAllowance=[];
						GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				}
				$scope.saveEmpRegularPayment = function(){
					var req={
				}
					EmpRegisterService.saveEmpregisters(req).then(function(data) {
						GenericAlertService.alertMessage('Employee Regular Pay and Allowances '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Regular Pay and Allowances Failed to Save ',"Info");
					});
					ngDialog.close();
				}
		}]
		
		});
						return deferred.promise;
					}
					return service;
				});
