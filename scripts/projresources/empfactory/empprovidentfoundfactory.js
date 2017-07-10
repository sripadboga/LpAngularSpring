'use strict';
app.factory('ProvidentFoundFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var providentFoundFactoryPopUp;
		var service = {};
		service.providentFoundFactoryPopUp = function(actionType,editEmpProvidentFund) {
		var deferred = $q.defer();
		providentFoundFactoryPopUp = ngDialog.open({
			template : 'views/projresources/projempreg/empprovident/empprovidentpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpProvidentFund =[];
				var selectedEmpProvidentFund=[];

				$scope.statuss = [ {
					id : 1,
					name : "Current"
				}, {
					id : 2,
					name : "Superseded"
				} ];
				$scope.contributionTypes = [ {
					id : 1,
					name : "Fixed Amount"
				}, {
					id : 2,
					name : "Variable Amount"
				} ];
				
				if (actionType === 'Add'){		
					$scope.addEmpProvidentFund.push({
						"selected" : false,
						"from" :'',
						"to" :'',
						"projectPosting" :'',
						"epsId" :'',
						"epsName" :'',
						"pId" :'',
						"pName" :'',
						"pComId" :'',
						"pComName" :'',
						"taxNum" :'',
						"creditCycle" :'',
						"currency" :'',
						"contributionType" :'',
						"bp1" :'',
						
						"fixedAmount1" :'',
						"bp2" :'',
						"fixedAmount2" :'',
						"totAmount" :'',
						"percentOnSuperFund" :'',
						"taxAmount" :'',
						"fundName" :'',
						"fundCode" :'',
						"regAddress" :'',
						"accNum" :'',
						"bankName" :'',
						"bankCode" :'',
						"status" :'',
						"doc" :'',
						"codes" :''
						
					});
				}	
				else {
					$scope.addEmpProvidentFund = angular.copy(editEmpProvidentFund);
					editEmpProvidentFund=[];
				}
				
				$scope.addRows = function() {
					$scope.addEmpProvidentFund.push({
						"selected" : false,
						"from" :'',
						"to" :'',
						"projectPosting" :'',
						"epsId" :'',
						"epsName" :'',
						"pId" :'',
						"pName" :'',
						"pComId" :'',
						"pComName" :'',
						"taxNum" :'',
						"creditCycle" :'',
						"currency" :'',
						"contributionType" :'',
						"bp1" :'',
						
						"fixedAmount1" :'',
						"bp2" :'',
						"fixedAmount2" :'',
						"totAmount" :'',
						"percentOnSuperFund" :'',
						"taxAmount" :'',
						"fundName" :'',
						"fundCode" :'',
						"regAddress" :'',
						"accNum" :'',
						"bankName" :'',
						"bankCode" :'',
						"status" :'',
						"doc" :'',
						"codes" :''
					});
				},
				$scope.providentPopUpRowSelect = function(providentfund) {
					if (providentfund.selected) {
						selectedEmpProvidentFund.push(providentfund);
					} else {
						selectedEmpProvidentFund.pop(providentfund);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpProvidentFund.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpProvidentFund.length<$scope.addEmpProvidentFund.length)
					{
						angular.forEach(selectedEmpProvidentFund, function(value,key) {
							$scope.addEmpProvidentFund.splice($scope.addEmpProvidentFund.indexOf(value), 1);
						});
						selectedEmpProvidentFund=[];
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
						GenericAlertService.alertMessage('Employee Provident Fund Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Provident Fund Details  Failed to Save ',"Info");
					});
					ngDialog.close();
				}
			
			
			
			}]
			
			});
						return deferred.promise;
					}
					return service;
				});
