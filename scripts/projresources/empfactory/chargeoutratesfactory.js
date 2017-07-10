'use strict';
app.factory('ChargeOutRatesFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var chargeOutRatesPopUp;
		var service = {};
		service.chargeOutRatesPopUp = function(actionType,editEmpChargeRates) {
		var deferred = $q.defer();
		chargeOutRatesPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/chargerate/chargeoutratespopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpChargeRates =[];
				var selectedChargeRates=[];
				if (actionType === 'Add'){		
					$scope.addEmpChargeRates.push({
						"selected" : false,
						"projectPosting" : '',
						"effectiveFrom" : '',
						"epsId" : '',
						"epsName" :'',
						"pId" :'',
						"pName" :'',
						"pComId" :'',
						"pComName" :'',
						"chargeOutUnit" :'',
						"currency" :'',
						"ratePerNormalTime" :'',
						"ratePerIdleTime" :'',
						"plRateperDay" : '',
						"plCostCodeId" : '',
						"mobCostCode" : '',
						"mobRate" :'',
						"demobCostCode" : '',
						"demobCostRate" :'',
						"demobStatus" : '',
						"notes" :''
					});
				}	
				else {
					$scope.addEmpChargeRates = angular.copy(editEmpChargeRates);
					editEmpChargeRates=[];
				}
				
				$scope.addRows = function() {
					$scope.addEmpChargeRates.push({
						"selected" : false,
						"projectPosting" : '',
						"effectiveFrom" : '',
						"epsId" : '',
						"epsName" :'',
						"pId" :'',
						"pName" :'',
						"pComId" :'',
						"pComName" :'',
						"chargeOutUnit" :'',
						"currency" :'',
						"ratePerNormalTime" :'',
						"ratePerIdleTime" :'',
						"plRateperDay" : '',
						"plCostCodeId" : '',
						"mobCostCode" : '',
						"mobRate" :'',
						"demobCostCode" : '',
						"demobCostRate" :'',
						"demobStatus" : '',
						"notes" :''
						
					});
				},
		$scope.chareRatePopUpRowSelect = function(charge) {
			if (charge.selected) {
				selectedChargeRates.push(charge);
			} else {
				selectedChargeRates.pop(charge);
			}
		},
		$scope.deleteRows = function() {
			if(selectedChargeRates.length==0){
				GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
			}if(selectedChargeRates.length<$scope.addEmpChargeRates.length)
			{
				angular.forEach(selectedChargeRates, function(value,key) {
					$scope.addEmpChargeRates.splice($scope.addEmpChargeRates.indexOf(value), 1);
					
				});
				selectedChargeRates=[];
				GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
				}else
				{
					GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
					}
		}
		 
		$scope.saveEmpChargeOutRates = function(){
			var saveEmpChargeReq={
		};
			EmpRegisterService.saveEmpregisters(saveEmpChargeReq).then(function(data) {
				GenericAlertService.alertMessage('Employee ChareOutRates '+data.message,data.status);
			},function(error){
				GenericAlertService.alertMessage('Employee ChareOutRates are Failed to Save ',"Info");
			});
			ngDialog.close();
		}
		}]
		});
						return deferred.promise;
					}
					return service;
				});
