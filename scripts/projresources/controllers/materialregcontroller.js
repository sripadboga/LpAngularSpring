'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state("materialregistor", {
		url : '/materialregistor',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/projresources/projmaterialreg/material.html',
				controller : 'MaterialController'
			}
		}
	})
}).controller('MaterialController', function($scope, $state, ngDialog,GenericAlertService,MaterialIssueDocketFactory,MaterialApprovalTransferFactory,MaterialRegisterService,MaterialDailyIssueFactory,DateWiseConsumptionFactory,StoreItemStockBalanceFactory,MaterialDailySupplyFactory,MaterialStockPilesFactory,MaterialLedgerDetailsFactory,MaterialReqTransferFactory) {
	
	$scope.storeIssueDocket = [];
	var editStoreIssueDocket = [];
	
	$scope.dailyIssueRecords = [];
	var editDailyIssueRecords = [];
	
	$scope.dateWiseConsumption = [];
	var editDateWiseConsumption = [];
	
	$scope.storeStockBalance = [];
	var editStoreStockBalance = [];
	
	$scope.supply=[];
	$scope.dailyMaterialSupply = [];
	var editDailyMaterialSupply = [];
	
	$scope.stockPiles = [];
	var editStockPiles = [];
	
	$scope.ledger=[];
	$scope.ledgerDetails = [];
	var editLedgerDetails = [];
	
	$scope.request=[];
	$scope.reqMaterialTransfer = [];
	var editReqMaterialTransfer = [];
	
	$scope.approval=[];
	$scope.approvalMaterialTransfer = [];
	var editApprovalMaterialTransfer = [];
	

	 $scope.addMaterial = function(actionType) {
			
			 ngDialog
				.open({
					template :   'views/projresources/projmaterialreg/approvalmaterialtransfer/approvalformaterialtransfer.html',
					closeByDocument : false,
					showClose : true,
					controller : [
							'$scope',
							function(
									$scope) {
								$scope.addcompanyData = [];
								var selectedCompanies = [];

										$scope.getCompanies = function() {

											var cmpReq = {
												"status" : 1,
											};
											CompanyService
													.getCompanies(
															cmpReq)
													.then(
															function(
																	data) {
																$scope.addcompanyData = angular
																		.copy(data.companyTOs);
															},
															function(
																	error) {
																GenericAlertService
																		.alertMessage(
																				"Error occured while getting companies ",
																				'Error');
															});
										},
										$scope.addCompanyRowSelect = function(
												company) {
											if (!company.select) {
												selectedCompanies
														.push(company);
											} else {
												selectedCompanies
														.pop(company);
											}
										},
										$scope.addCompaniesToPrecontract = function() {
											var returnCompanies = {
												"companyTOs" : angular
														.copy(selectedCompanies)
											};
											selectedCompanies = [];
											deferred
													.resolve(returnCompanies);
											$scope
													.closeThisDialog();
										}
							} ]
				});
		
	 }
	
	$scope.checkErr = function(startDate,endDate) {
	        $scope.errMessage = '';
	        var curDate = new Date();
	        if(!(startDate && endDate)) {
	        	$scope.errMessage = 'Please Select Date';
	        	return false;
	        }
	        if(new Date(startDate) > new Date(endDate)){
	          $scope.errMessage = 'End Date should be greater than start date';
	        	//alert("End Date should be greater than start date");
	          return false;
	        }
	 },

								$scope.MaterialTabs = [
									{
										title : 'Store Issue Docket',
										url : 'views/projresources/projmaterialreg/issuedocket/storeissuedocket.html'
									},
									{
										title : 'Daily Issue Records',
										url : 'views/projresources/projmaterialreg/dailyissue/dailyissuerecords.html'
									},
									{
										title : 'Date Wise Consumption Quantity',
										url : 'views/projresources/projmaterialreg/datewiseconsumption/datewiseconsumptionquantity.html'
									},
									{
										title : 'Store Items Stock Balance',
										url : 'views/projresources/projmaterialreg/storeitemstockbal/storesitemstockbalance.html'
									},
									{
										title : 'Delivery/Supply Details',
										url : 'views/projresources/projmaterialreg/deliverysuply/deliverysupplydetails.html'
									},
									{
										title : 'Stock Piles Items-Stock Balance',
										url : 'views/projresources/projmaterialreg/stockpiles/stockpilesitems.html'
									},
									{
										title : 'Ledger',
										url : 'views/projresources/projmaterialreg/ledger/ledger.html'
									},
									{
										title : 'Request For Material Transfer',
										url : 'views/projresources/projmaterialreg/reqmaterialtransfer/requestformaterialtransfer.html'
									},
									{
										title : 'Approval For Material Transfer',
										url : 'views/projresources/projmaterialreg/approvalmaterialtransfer/approvalformaterialtransfer.html'
									} ];
	 
	 $scope.currentMaterialTabs ='views/projresources/projmaterialreg/issuedocket/storeissuedocket.html';
		$scope.onClickMaterialTabs  = function(masterTabs) {
			$scope.currentMaterialTabs = masterTabs.url;
			}, $scope.isActiveMaterialTabs  = function(masterTabsUrl) {
			return masterTabsUrl == $scope.currentMaterialTabs ;
			}
			$scope.moreFlag=0;
			$scope.clickMore = function(moreFlag1) {
				if ($scope.moreFlag > 0) {
					$scope.moreFlag = moreFlag1 - 1;
				}
				$scope.onClickMaterialTabs ($scope.MaterialTabs[0]);
			},
			$scope.clickMore1 = function(moreFlag1) {
				if ($scope.moreFlag < 1) {
					$scope.moreFlag = moreFlag1 + 1;
				}
				$scope.onClickMaterialTabs($scope.MaterialTabs[6]);
			},
/*===========Store issue=============*/
$scope.storeIssueDocket = [ {
	"selected" : false,
	"rId" : 'thr',
	"rName" : '',
	"rSubgId" : '',
	"rSubgName" : '',
	"poNum" : '',
	"sceduleItemId" : "dgvdx",
	"suppId" : '',
	"suppName" : '',
	"measure" : '',
	"quantity" : '',
	"rate" : '',
	"comments" : ''

} ];

$scope.storeDocketRowSelect= function(storedocket){
if (storedocket.selected){
editStoreIssueDocket.push(storedocket);
}else {
editStoreIssueDocket.pop(storedocket);
}
}

$scope.deleteStoreDocket= function() {
	if (editStoreIssueDocket.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.storeIssueDocket = [];
	} else {
		angular.forEach(editStoreIssueDocket, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteStoreDocket(req).then(function(data) {
				});
		angular.forEach(editStoreIssueDocket, function(value,key) {
			GenericAlertService.alertMessage('Material Issue Docket Details Deactivated successfully','Info');
			$scope.storeIssueDocket.splice($scope.storeIssueDocket.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material Issue Docket Details are failed to Deactivate',"Error");
		});
		editStoreIssueDocket = [];
		$scope.deleteIds = [];
	}
}
$scope.addStoreDocket=function(actionType) {
if(actionType=='Edit' && editStoreIssueDocket<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit  ",'Warning');
return ;
}
var materialissuedocketpopup = MaterialIssueDocketFactory.materialIssueDocketDetails(actionType,editStoreIssueDocket);
materialissuedocketpopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material issue docket details",'Error');
	});
}


/*==========Daily Issue=======*/

$scope.dailyIssueRecords = [ {
	"selected" : false,
	"dateOfIssue" :'',
	"preApprovalNotfId" :'',
	"projectDocket" :'',
	"resourceId" :"1",
	"resourceName" :'',
	"resourceSubGroupId" :'',
	"resourceSubGroupName" :'',
	"originProject" :'',
	"originStoreStockYard" :'',
	"destinationProject" :'',
	"destinationStoreStockYard" :"sdff",
	"supplierId" :'',
	"supplierName" :'',
	"issueEmployeeId" :'',
	"issueEmployeeName" :'',
	"receiverEmployeeId" :'',
	"receiverEmployeeName" :'',
	"unitOfMeasure" :'',
	"quantity" :'',
	"rate" :'',
	"comments" :''
} ];

$scope.dailyIssueRowSelect = function(dailyissue){
if (dailyissue.selected){
editDailyIssueRecords.push(dailyissue);
}else {
editDailyIssueRecords.pop(dailyissue);
}
}

$scope.deleteDailyIssueRecords= function() {
	if (editDailyIssueRecords.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.dailyIssueRecords = [];
	} else {
		angular.forEach(editDailyIssueRecords, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteDailyIssueRecords(req).then(function(data) {
				});
		angular.forEach(editDailyIssueRecords, function(value,key) {
			GenericAlertService.alertMessage('Material  Daily Issue Records are  Deactivated successfully','Info');
			$scope.dailyIssueRecords.splice($scope.dailyIssueRecords.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  Daily Issue Records are failed to Deactivate',"Error");
		});
		editDailyIssueRecords = [];
		$scope.deleteIds = [];
	}
}

$scope.addDailyIssueRecords=function(actionType) {
if(actionType=='Edit' && editDailyIssueRecords<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit  ",'Warning');

return ;
}
var materialdailyissuepopup = MaterialDailyIssueFactory.materialDailyIssueDetails(actionType,editDailyIssueRecords);
materialdailyissuepopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material daily issue records  details",'Error');
	});
}

/*=================Date Wise Consumption==============*/

$scope.dateWiseConsumption = [ {
	"selected" : false,
	"date" :'',
	"projectName" :"abc",
	"epsName" :'',
	"resourceId" :'',
	"resourceName" :'',
	"resourceSubGroupName" :'',
	"unitOfMeasure" :'',
	"materialSupplierName" :'',
	"purchaseOrderNumber" :'',
	"poScheduleItemId" :'',
	"docketDate" :'',
	"docketNumber" :'',
	"workDiaryId" :'',
	"supervisorName" :'',
	"dateWiseConsumptionQuantity" :'',
	"docketWiseCumulativeConsumption" :''
} ];

$scope.consumptionRowSelect = function(consumption){
if (consumption.selected){
editDateWiseConsumption.push(consumption);
}else {
editDateWiseConsumption.pop(consumption);
}
}

$scope.deleteDateWiseConsumption= function() {
	if (editDateWiseConsumption.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.dateWiseConsumption = [];
	} else {
		angular.forEach(editDateWiseConsumption, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteDateWiseConsumption(req).then(function(data) {
				});
		angular.forEach(editDateWiseConsumption, function(value,key) {
			GenericAlertService.alertMessage('Material  DateWise Consumption Details  are  Deactivated successfully','Info');
			$scope.dateWiseConsumption.splice($scope.dateWiseConsumption.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  DateWise Consumption Details are  failed to Deactivate',"Error");
		});
		editDateWiseConsumption = [];
		$scope.deleteIds = [];
	}
}


$scope.addDateWiseConsumption=function(actionType) {
if(actionType=='Edit' && editDateWiseConsumption<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit",'Warning');
return ;
}
var datewiseconsumptionpopup = DateWiseConsumptionFactory.dateWiseConsumptionDetails(actionType,editDateWiseConsumption);
datewiseconsumptionpopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material date wise consumption details",'Error');
	});
}
/*=================Store Item Stock balance=============*/
$scope.storeStockBalance = [ {
	"selected" : false,
	"date" : '',
	"projectDocket" : '',
	"resourceId" : "r1",
	"resourceName" : "A",
	"resourceSubGroupId" : '',
	"resourceSubGroupName" : '',
	"originProject" : '',
	"originStoreStockYard" : '',
	"destinationProject" : '',
	"destinationStoreStockYard" : "sdgvs",
	"supplierId" : '',
	"supplierName" : '',
	"issueEmployeeId" : '',
	"issueEmployeeName" : '',
	"receiverEmployeeId" : '',
	"receiverEmployeeName" : '',
	"unitOfMeasure" : '',
	"rate" : '',
	"openingBalanceQuantity" : '',
	"issuedQuantity" : '',
	"dateWiseConsumptionQuantity" : '',
	"cumulativeQuantityConsumed" : '',
	"closingStockBalanceQuantityOnSite" : ''
} ];

$scope.storeRowSelect = function(storestock){
if (storestock.selected){
editStoreStockBalance.push(storestock);
}else {
editStoreStockBalance.pop(storestock);
}
}

$scope.deleteStoresItemStock= function() {
	if (editStoreStockBalance.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.storeStockBalance = [];
	} else {
		angular.forEach(editStoreStockBalance, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteStoresItemStock(req).then(function(data) {
				});
		angular.forEach(editStoreStockBalance, function(value,key) {
			GenericAlertService.alertMessage('Material  Store Item Stock Balance  Details  are  Deactivated successfully','Info');
			$scope.storeStockBalance.splice($scope.storeStockBalance.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  Store Item Stock Balance  Details are  failed to Deactivate',"Error");
		});
		editStoreStockBalance = [];
		$scope.deleteIds = [];
	}
}

$scope.addStoresItemStock=function(actionType) {
if(actionType=='Edit' && editStoreStockBalance<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit ",'Warning');
return ;
}
var storeitemstockbalpopup = StoreItemStockBalanceFactory.storeItemStockBalanceDetails(actionType,editStoreStockBalance);
storeitemstockbalpopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material store item stock balance details",'Error');
	});
}

/*=================Delivery Supply==============*/

$scope.dailyMaterialSupply = [ {
	"selected" : false,
	"supplyDeliveryDate" : '',
	"projectId" : '',
	"projectName" : '',
	"epsId" : '',
	"epsName" : '',
	"resourceId" : '',
	"resourceName" : "fggg",
	"materialSubGroupId" : '',
	"materialSubGroupName" : '',
	"supplierName" : '',
	"unitOfMeasure" : '',
	"purchaseOrder(PO)" : '',
	"poScheduleItemId" : '',
	"poScheduleItemDescription" : '',
	"deliveryDocketNo" : '',
	"docketDate" : '',
	"locationOfDelivery" : '',
	"quantityReceived" : '',
	"ratePerUnit" : '',
	"receivedBy" : '',
	"defectsIfAny" : '',
	"otherCommentsFromReceiver" : '',
	"recordOfDeliveryDockets" : ''
} ];

$scope.dailySupplyRowSelect = function(supply){
if (supply.selected){
editDailyMaterialSupply.push(supply);
}else {
editDailyMaterialSupply.pop(supply);
}
}

$scope.deleteDeliverySupply= function() {
	if (editDailyMaterialSupply.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.dailyMaterialSupply = [];
	} else {
		angular.forEach(editDailyMaterialSupply, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteDeliverySupply(req).then(function(data) {
				});
		angular.forEach(editDailyMaterialSupply, function(value,key) {
			GenericAlertService.alertMessage('Material  Daily Supply   Details  are  Deactivated successfully','Info');
			$scope.dailyMaterialSupply.splice($scope.dailyMaterialSupply.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  Daily Supply  Details are  failed to Deactivate',"Error");
		});
		editDailyMaterialSupply = [];
		$scope.deleteIds = [];
	}
}

$scope.addDeliverySupply=function(actionType) {
if(actionType=='Edit' && editDailyMaterialSupply<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit ",'Warning');
return ;
}
var materialdailysupplypopup = MaterialDailySupplyFactory.materialDailySupplyDetails(actionType,editDailyMaterialSupply);
materialdailysupplypopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material daily supply details",'Error');
	});
}

/*=================Stock Piles==============*/
$scope.stockPiles = [ {
	"selected" : false,
	"date" : '',
	"epsName" : 'cfvy',
	"projectId" : '',
	"projectName" : '',
	"stockPiledLocation" : '',
	"preApprovalNotificationId" : '',
	"projectDocket" : '',
	"supplierId" : '',
	"supplierName" : '',
	"supplierDocketDate" : '',
	"supplierDocket" : '',
	"resourceId" : '',
	"resourceName" : '',
	"resourceSubGroupId" : '',
	"resourceSubGroupName" : '',
	"stockLocation" : '',
	"unitOfMeasure" : '',
	"rate" : '',
	"openingBalance" : '',
	"dateWiseQuantityDelivered" : '',
	"cumulativeQuantityDelivered" : '',
	"dateWiseConsumptionQuantity" : '',
	"cumulativeConsumptionQuantity" : '',
	"quantityTransferToOtherProjects" : '',
	"closingStockBalance" : ''
} ];

$scope.stockPileRowSelect = function(stock){
if (stock.selected){
	editStockPiles.push(stock);
}else {
	editStockPiles.pop(stock);
}
}
$scope.deleteStockPiles= function() {
	if (editStockPiles.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.stockPiles = [];
	} else {
		angular.forEach(editStockPiles, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteStockPiles(req).then(function(data) {
				});
		angular.forEach(editStockPiles, function(value,key) {
			GenericAlertService.alertMessage('Material  Stock Piles   Details  are  Deactivated successfully','Info');
			$scope.stockPiles.splice($scope.stockPiles.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  Stock Piles  Details are  failed to Deactivate',"Error");
		});
		editStockPiles = [];
		$scope.deleteIds = [];
	}
}

$scope.addStockPiles=function(actionType) {
if(actionType=='Edit' && editStockPiles<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit",'Warning');
return ;
}
var materialstockpilespopup = MaterialStockPilesFactory.materialStockPilesDetails(actionType,editStockPiles);
materialdailysupplypopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material stock piles details",'Error');
	});
}
/*=========Ledger==================*/
$scope.ledgerDetails = [ {
	"selected" : false,
	"date" : '',
	"epsId" : '',
	"epsName" : '',
	"projectId" : 'dcfvg',
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
} ];

$scope.ledgerRowSelect = function(ledger){
if (ledger.selected){
editLedgerDetails.push(ledger);
}else {
editLedgerDetails.pop(ledger);
}
}

$scope.deleteLedger= function() {
	if (editLedgerDetails.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.ledgerDetails = [];
	} else {
		angular.forEach(editLedgerDetails, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteLedger(req).then(function(data) {
				});
		angular.forEach(editLedgerDetails, function(value,key) {
			GenericAlertService.alertMessage('Material  Ledger   Details  are  Deactivated successfully','Info');
			$scope.ledgerDetails.splice($scope.ledgerDetails.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  Ledger Details are  failed to Deactivate',"Error");
		});
		editLedgerDetails = [];
		$scope.deleteIds = [];
	}
}

$scope.addLedger=function(actionType) {
if(actionType=='Edit' && editLedgerDetails<=0){
	GenericAlertService.alertMessage("please select atlist one row to edit ",'Warning');
return ;
}
var materialledgerpopup = MaterialLedgerDetailsFactory.materialLedgerDetails(actionType,editLedgerDetails);
materialledgerpopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material ledger details",'Error');
	});
}

/*=========Request For Material Transfer===========*/
$scope.reqMaterialTransfer = [ {
	"selected" : false,
	"resourceId" : "1",
	"resourceName" : "a",
	"materialSubGroupName" : '',
	"fromProjectId" : '',
	"fromProjectName" : '',
	"originatorEmployeeIdAndName" : '',
	"requisitionNumber" : '',
	"approverPersonIdAndName" : '',
	"destinationProjectId" : '',
	"destinationProjectName" : '',
	"unitOfMeasure" : '',
	"internalProjectTransfer" : '',
	"externalProjectTransfer" : '',
	"dateOfRequest" : '',
	"requiredDateOfTransfer" : '',
	"expectedDateOfTransfer" : '',
	"approvalStatus" : ''
} ];

$scope.reqTransferlRowSelect = function(request){
if (request.selected){
editReqMaterialTransfer.push(request);
}else {
editReqMaterialTransfer.pop(request);
}
}
$scope.deleteReqForMaterial= function() {
	if (editReqMaterialTransfer.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.reqMaterialTransfer = [];
	} else {
		angular.forEach(editReqMaterialTransfer, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteReqForMaterial(req).then(function(data) {
				});
		angular.forEach(editReqMaterialTransfer, function(value,key) {
			GenericAlertService.alertMessage('Material  Request Transfer   Details  are  Deactivated successfully','Info');
			$scope.reqMaterialTransfer.splice($scope.reqMaterialTransfer.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material  Request Transfer Details are  failed to Deactivate',"Error");
		});
		editReqMaterialTransfer = [];
		$scope.deleteIds = [];
	}
}


$scope.addReqForMaterial=function(actionType) {
if(actionType=='Edit' && editReqMaterialTransfer<=0){
	GenericAlertService.alertMessage("Please select atlist one row to edit ",'Warning');
return ;
}
var materialrequestpopup = MaterialReqTransferFactory.materialRequestTransferDetails(actionType,editReqMaterialTransfer);
materialrequestpopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material request transfer details",'Error');
	});
}

/*================Approval For Material Transfer================*/
$scope.approvalMaterialTransfer = [ {
	"selected" : false,
	"resourceId" : '',
	"resourceName" : "abc",
	"materialSubGroupName" : '',
	"unitOfMeasure" : '',
	"poScheduleItemId" : '',
	"unitRate" : '',
	"expectedDateOfAvailabilityTransfer" : '',
	"fromProjectId" : '',
	"fromProjectName" : '',
	"destinationProjectId" : '',
	"destinationProjectName" : '',
	"requiredDateOfTransfer" : '',
	"actualDateOfTransfer" : '',
	"recordsOfRequiestsAndApprovalsNotifications" : '',
	"approvalDecision" : '',
	"notifyOriginator" : '',
	"multipleSelectionInternalProject" : '',
	"multipleSelectionExternalProject" : '',
	"approvalStatus" : ''
} ];

$scope.approvalMaterialRowSelect = function(approval){
if (approval.selected){
editApprovalMaterialTransfer.push(approval);
}else {
editApprovalMaterialTransfer.pop(approval);
}
}

$scope.deleteApprovalForMaterial= function() {
	if (editApprovalMaterialTransfer.length <= 0) {
		GenericAlertService.alertMessage("please select records to Deactivate",'Warning');
		return;
	}
	var deleteIds = [];
	$scope.nondeleteIds = [];
	if ($scope.selectedAll) {
		$scope.approvalMaterialTransfer = [];
	} else {
		angular.forEach(editApprovalMaterialTransfer, function(value,key) {			
				deleteIds.push(value.id);				
		});
		var req = {
			"storeIds" : deleteIds,
			"status":2
		};
		MaterialRegisterService.deleteApprovalForMaterial(req).then(function(data) {
				});
		angular.forEach(editApprovalMaterialTransfer, function(value,key) {
			GenericAlertService.alertMessage('Material  Approval Transfer   Details  are  Deactivated successfully','Info');
			$scope.approvalMaterialTransfer.splice($scope.approvalMaterialTransfer.indexOf(value), 1);									
		},
		function(error) {
			GenericAlertService.alertMessage('Material Approval Transfer Details are  failed to Deactivate',"Error");
		});
		editApprovalMaterialTransfer = [];
		$scope.deleteIds = [];
	}
}

$scope.addApprovalForMaterial=function(actionType) {
if(actionType=='Edit' && editApprovalMaterialTransfer<=0){
	GenericAlertService.alertMessage("please select atlist one row to eidt",'Warning');
return ;
}
var materialtransferpopup = MaterialApprovalTransferFactory.materialApprovalTransferDetails(actionType,editApprovalMaterialTransfer);
materialtransferpopup.then(function(data){
	},function(error){
		GenericAlertService.alertMessage("Error occurred while fetching material  transfer details",'Error');
	});
}
})
