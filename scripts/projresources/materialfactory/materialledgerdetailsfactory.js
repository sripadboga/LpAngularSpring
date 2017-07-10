'use strict';
app.factory('MaterialLedgerDetailsFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialLedgerPopUp;
		var service = {};
		service.materialLedgerDetails = function(actionType,editLedgerDetails) {
		var deferred = $q.defer();
		materialLedgerPopUp = ngDialog.open({
			template : 'views/projresources/projmaterialreg/ledger/ledgerpopup.html',

			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addLedgerDetails =[];

			var selectedLedger=[];
			if (actionType === 'Add'){		
				$scope.addLedgerDetails.push({
					"selected" : false,
					"date" : '',
					"epsId" : '',
					"epsName" : '',
					"projectId" : '',
					"projectName" : '',
					"storeStockYardLocation" : '',
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupName" : '',
					"unitOfMeasure" : '',
					"openingStockBalance" : '',
					"supplyReceipts" : '',
					"dailyIssue" : '',
					"consumptionThroughWorkDiaries" : '',
					"issuedBalance" : '',
					"externalProjectTransfer" : '',
					"closingStockBalance" : '',
					"comments" : ''
				});
			}	
			else {
				$scope.addLedgerDetails = angular.copy(editLedgerDetails);
				editLedgerDetails=[];
			}
			$scope.addRows = function() {
				$scope.addLedgerDetails.push({
					"selected" : false,
					"date" : '',
					"epsId" : '',
					"epsName" : '',
					"projectId" : '',
					"projectName" : '',
					"storeStockYardLocation" : '',
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupName" : '',
					"unitOfMeasure" : '',
					"openingStockBalance" : '',
					"supplyReceipts" : '',
					"dailyIssue" : '',
					"consumptionThroughWorkDiaries" : '',
					"issuedBalance" : '',
					"externalProjectTransfer" : '',
					"closingStockBalance" : '',
					"comments" : ''
				});
			},
			$scope.ledgerPopUpRowSelect = function(ledger) {
				if (ledger.selected) {
					selectedLedger.push(ledger);
				} else {
					selectedLedger.pop(ledger);
				}
			},
			$scope.deleteRows = function() {
				if(selectedLedger.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedLedger.length<$scope.addLedgerDetails.length)
				{
					angular.forEach(selectedLedger, function(value,key) {
						$scope.addLedgerDetails.splice($scope.addLedgerDetails.indexOf(value), 1);
					});
					selectedLedger=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveIssueDockets(req).then(function(data) {
					GenericAlertService.alertMessage('Material Ledger Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Ledger Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}

			}]
			});
						return deferred.promise;
					}
					return service;
				});
