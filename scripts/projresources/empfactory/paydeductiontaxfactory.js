'use strict';
app.factory('PayDeductionTaxFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var paydeductiontaxPopUp;
		var service = {};
		service.paydeductiontaxPopUp = function(actionType,editEmpPayDeductionTax) {
		var deferred = $q.defer();
		paydeductiontaxPopUp =ngDialog.open({
			template : 'views/projresources/projempreg/paydeduction/applicablepaydeduction_taxpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpPayDeductionTax =[];
				 var selectedEmpPayDeduction=[];

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
				$scope.residentOrNonResidents = [ {
					id : 1,
					name : "Resident"
				}, {
					id : 2,
					name : "Non Resident"
				} ];
				
				$scope.marriedStatuss = [ {
					id : 1,
					name : "Married"
				}, {
					id : 2,
					name : "Single"
				}];
				$scope.allowancesTaxables = [ {
					id : 1,
					name : "Yes"
				}, {
					id : 2,
					name : "No"
				} ];
				
				$scope.yesOrNo1s = [ {
					id : 1,
					name : "Yes"
				}, {
					id : 2,
					name : "No"
				}];
				$scope.yesOrNo2s = [ {
					id : 1,
					name : "Yes"
				}, {
					id : 2,
					name : "No"
				}];
				
				$scope.yesOrNo3s = [ {
					id : 1,
					name : "Yes"
				}, {
					id : 2,
					name : "No"
				}];
				$scope.yesOrNo4s = [ {
					id : 1,
					name : "Yes"
				}, {
					id : 2,
					name : "No"
				}];
				if (actionType === 'Add'){		
					$scope.addEmpPayDeductionTax.push({
						"selected" : false,
				"projectPosting" :'',
				"effectiveFrom" :'',
				"epsId" :'',
				"epsName" :'',
				"pId" :'',
				"pName" :'',
				"pComId" :'',
				"pComName" :'',
				"taxNum" :'',
				"currency" :'',
				"payRate" :'',
				"payCycle" :'',
				
				"residentOrNonResident" :'',
				"marriedStatus" :'',
				"children" :'',
				"allowancesTaxable" :'',
				"yesOrNo1" :'',
				"eligibleAmount" :'',
				"yesOrNo2" :'',
				"medicalTax" :'',
				"yesOrNo3" :'',
				"yesOrNo4" :'',
				"bp1" :'',
				"fixedAmount1" :'',
				"ratePerDay" :'',
				"bp2" :'',
				"fixedAmount2" :'',
				"doc" :'',
						
					});
				}	
				else {
					$scope.addEmpPayDeductionTax = angular.copy(editEmpPayDeductionTax);
					editEmpPayDeductionTax=[];
				}
				
				$scope.addRows = function() {
					$scope.addEmpPayDeductionTax.push({
						"selected" : false,
				"projectPosting" :'',
				"effectiveFrom" :'',
				"epsId" :'',
				"epsName" :'',
				"pId" :'',
				"pName" :'',
				"pComId" :'',
				"pComName" :'',
				"taxNum" :'',
				"currency" :'',
				"payRate" :'',
				"payCycle" :'',
				
				"residentOrNonResident" :'',
				"marriedStatus" :'',
				"children" :'',
				"allowancesTaxable" :'',
				"yesOrNo1" :'',
				"eligibleAmount" :'',
				"yesOrNo2" :'',
				"medicalTax" :'',
				"yesOrNo3" :'',
				"yesOrNo4" :'',
				"bp1" :'',
				"fixedAmount1" :'',
				"ratePerDay" :'',
				"bp2" :'',
				"fixedAmount2" :'',
				"doc" :'',
					});
				},
				$scope.deductionPopUpRowSelect = function(deduction) {
					if (deduction.selected) {
						selectedEmpPayDeduction.push(deduction);
					} else {
						selectedEmpPayDeduction.pop(deduction);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpPayDeduction.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpPayDeduction.length<$scope.addEmpPayDeductionTax.length)
					{
						angular.forEach(selectedEmpPayDeduction, function(value,key) {
							$scope.addEmpPayDeductionTax.splice($scope.addEmpPayDeductionTax.indexOf(value), 1);
						});
						selectedEmpPayDeduction=[];
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
						GenericAlertService.alertMessage('Employee Pay Deduction Tax Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Pay Deduction Tax Details  Failed to Save ',"Info");
					});
					ngDialog.close();
				}
			}]
			
			});
						return deferred.promise;
					}
					return service;
				});
