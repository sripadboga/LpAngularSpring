'use strict';
app
		.factory(
				'MaterialFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService) {
					var materialFactoryPopup;
					var service = {};
					service.materialFactoryPopup = function(actionType,
							editMatestores) {
						var deferred = $q.defer();
						materialFactoryPopup = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/materialstorepopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addMatestores = [];
												var selectedMaterial = [];

												$scope.action = actionType;

												if (actionType === 'Add') {
													$scope.addMatestores
															.push({
																"select" : false,
																"sourceOfMaterials" : '',
																"material" : '',
																"poScheduleItem" : '',
																"purchaseOrder" : '',
																"docketNumber" : '',
																"docketDate" : '',
																"supplier" : '',
																"unitOfMeasure" : '',
																"locationOfDelivery" : '',
																"quantityReceived" : '',
																"rateForUnits" : '',
																"uploadDeliveryDoc" : '',
																"defectsIfAny" : '',
																"code1" : '',
																"code2" : '',
																"totalConsumQty" : '',
																"approvalStatus" : ''
															});
												} else {
													$scope.addMatestores = angular
															.copy(editMatestores);
													editMatestores = [];
												}

												/*
												 * var materialService = {};
												 * $scope.matDetails = function( ) {
												 * var projmaterialListPopup =
												 * materialService
												 * .getMaterialListDetails();
												 * projmaterialListPopup .then(
												 * function( data) {
												 * //tab.projEmpClassTO =
												 * data.projEmpClassTO; },
												 * function( error) {
												 * GenericAlertService
												 * .alertMessage( "Error occured
												 * while selecting project
												 * employee class Details",
												 * 'Error'); }); }
												 * 
												 * materialService.getMaterialListDetails =
												 * function() { var deferred =
												 * $q.defer(); ngDialog .open({
												 * template :
												 * 'timemanagement/workdairy/createworkdairy/materiallist.html',
												 * closeByDocument : false,
												 * showClose : true, controller : [
												 * '$scope', function( $scope) {
												 * 
												 * $scope.materialRegDetails =
												 * [];
												 * 
												 * $scope.getMaterialRegDetails =
												 * function() { var req = {
												 * "status" : 1, "projId" :
												 * $rootScope.projId }
												 * ProjEmpClassService
												 * .getProjEmpClasses( req)
												 * .then( function( data) {
												 * $scope.projEmpClassDetails =
												 * data.projEmpClassTOs; }); }
												 * $scope.projMaterialRegPopUp =
												 * function( ) { var
												 * returnProjEmpClassTO = {
												 * "projEmpClassTO" :
												 * projEmpClassTO }; deferred
												 * .resolve(); $scope
												 * .closeThisDialog();
												 *  } } ] }); return
												 * deferred.promise; }
												 */

												$scope.matDetails = function() {

													ngDialog
															.open({
																template : 'views/timemanagement/workdairy/createworkdairy/materiallist.html',

																closeByDocument : false,
																showClose : true,

																controller : [
																		'$scope',
																		function(
																				$scope) {
																			$scope.matDetails = '';
																			$scope.indexVal = null;
																			$scope.materialDetails = [ {
																				"matClassId" : '1',
																				"matId" : '',
																				"matName" : '',
																			} ];
																		} ]

															}).closePromise
															.then(function(
																	value) {
																$scope.matDetails[value.$dialog
																		.scope().indexVal].defaultmaterial = value.$dialog
																		.scope().mat;
															});
												}

												$scope.purchaseOrderDetails = function() {
													ngDialog
															.open({
																template : 'views/timemanagement/workdairy/createworkdairy/purchaseorderlist.html',

																closeByDocument : false,
																showClose : true,

																controller : [
																		'$scope',
																		function(
																				$scope) {
																			$scope.purchaseOrderDetails = '';
																			$scope.indexVal = null;
																			$scope.purchaseOrderList = [ {
																				"pNum" : ' ',
																				"itemId" : ' ',
																				"rate" : ' ',
																				"qtyreceived" : ' ',
																				"supplierId" : ' '
																			} ];
																		} ]

															}).closePromise
															.then(function(
																	value) {
																$scope.purchaseOrderList[value.$dialog
																		.scope().indexVal].defaultpurchaseOrder = value.$dialog
																		.scope().purchaseOrder;
															});
												}

														$scope.addRows = function() {
															$scope.addMatestores
																	.push({
																		"select" : false,
																		"sourceOfMaterials" : '',
																		"material" : '',
																		"poScheduleItem" : '',
																		"purchaseOrder" : '',
																		"docketNumber" : '',
																		"docketDate" : '',
																		"supplier" : '',
																		"unitOfMeasure" : '',
																		"locationOfDelivery" : '',
																		"quantityReceived" : '',
																		"rateForUnits" : '',
																		"uploadDeliveryDoc" : '',
																		"defectsIfAny" : '',
																		"code1" : '',
																		"code2" : '',
																		"totalConsumQty" : '',
																		"approvalStatus" : ''
																	});
														},
														$scope.materialPopupRowSelect = function(
																matestore) {
															if (matestore.select) {
																selectedMaterial
																		.push(matestore);
															} else {
																selectedMaterial
																		.pop(matestore);
															}
														},
														$scope.deleteRows = function() {
															if (selectedMaterial.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedMaterial.length < $scope.addMatestores.length) {
																angular
																		.forEach(
																				selectedMaterial,
																				function(
																						value,
																						key) {
																					$scope.addMatestores
																							.splice(
																									$scope.addMatestores
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedMaterial = [];
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
												$scope.saveMaterial = function() {
													var req = {}
													MaterialService
															.saveMaterial(req)
															.then(
																	function(
																			data) {
																		GenericAlertService
																				.alertMessage(
																						'Manpower Details '
																								+ data.message,
																						data.status);
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Manpower Details are Failed to Save ',
																						"Info");
																	});
													ngDialog.close();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
