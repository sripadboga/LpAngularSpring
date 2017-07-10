'use strict';
app.factory('NonRegularPayFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var nonRegFactoryPopUp;
		var service = {};
		service.nonRegFactoryPopUp = function(actionType,editEmpNonRegularPay) {
		var deferred = $q.defer();
		nonRegFactoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/empnonregularpay/nonregularpaypopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpNonRegularPay =[];
				var selectedEmpNonRegularPay=[];

				$scope.payRates = [ {
					id : 1,
					name : "Hourly"
				}, {
					id : 2,
					name : "Daily"
				},{
					id : 3,
					name : "Monthly"
				} ];
				$scope.payCycles = [ {
					id : 1,
					name : "Weekly"
				}, {
					id : 2,
					name : "Fortnightly"
				},{
					id : 3,
					name : "Monthly"
				} ];
				if (actionType === 'Add'){		
					$scope.addEmpNonRegularPay.push({
						"selected" : false,
				"projectPosting" :'',
				"effectiveFrom" :'',
				"epsId" :'',
				"epsName" :'',
				"pId" :'',
				"pName":'',
				"pComId" : '',
				"pComName" :'',
				"taxNum" :'',
				"currency" :'',
				"payRate" :'',
				"payCycle" :'',
				"basicPay" :'',
				"bp1" :'',
				"bp2" :'',
				"tp" :'',
				"mlp" : '',
				"ualp" : '',
				"uslp" :'',
				"runDate" :'',
				"doc" :''
						
					});
				}	
				else {
					$scope.addEmpNonRegularPay = angular.copy(editEmpNonRegularPay);
					editEmpNonRegularPay=[];
				}
				
				$scope.addRows = function() {
					$scope.addEmpNonRegularPay.push({
						"selected" : false,
				"projectPosting" :'',
				"effectiveFrom" :'',
				"epsId" :'',
				"epsName" :'',
				"pId" :'',
				"pName":'',
				"pComId" : '',
				"pComName" :'',
				"taxNum" :'',
				"currency" :'',
				"payRate" :'',
				"payCycle" :'',
				"basicPay" :'',
				"bp1" :'',
				"bp2" :'',
				"tp" :'',
				"mlp" : '',
				"ualp" : '',
				"uslp" :'',
				"runDate" :'',
				"doc" :''
					});
				},
				$scope.NonRegPayPopUpRowSelect = function(nonregpay) {
					if (nonregpay.selected) {
						selectedEmpNonRegularPay.push(nonregpay);
					} else {
						selectedEmpNonRegularPay.pop(nonregpay);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpNonRegularPay.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpNonRegularPay.length<$scope.addEmpNonRegularPay.length)
					{
						angular.forEach(selectedEmpNonRegularPay, function(value,key) {
							$scope.addEmpNonRegularPay.splice($scope.addEmpNonRegularPay.indexOf(value), 1);
						});
						selectedEmpNonRegularPay=[];
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
						GenericAlertService.alertMessage('Employee NonRegularPay and Allowances  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee NonRegularPay and Allowances  Failed to Save ',"Info");
					});
					ngDialog.close();
				}
			
		}]
		
		});
						return deferred.promise;
					}
					return service;
				});
