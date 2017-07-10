'use strict';

app
		.factory(
				'PreContractBidanalysisFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractExternalService, GenericAlertService) {
					var viewBidderFactoryPopUp;
					var service = {};
					service.getCompanyBidDetails = function(
							data) {
						var deferred = $q.defer();
						viewBidderFactoryPopUp = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/externalApproval/precontractbidanalysis.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												
												$scope.bidderDatamoreFlag = 0;
												$scope.bidderDatamoreFlags = 0;
												$scope.manpowerFlag=true;
												$scope.plantFlag=true;
												$scope.materialFlag=true;
												$scope.serviceFlag=true;
												
												var approvedCompanyMap = {};

												$scope.currencyList = angular
												.copy(data.currencyTOs);
												$scope.contractTypes = data.preContractTypeTOs;
												$scope.projEmpClassmap = data.projEmpClassMap;
												$scope.projPlantClassmap = data.projPlantMap;
												$scope.projMaterialClassmap = data.projMaterialClassMap;
												$scope.projServiceClassmap = data.projServiceMap;
												$scope.storeClassmap = data.storeMap;
												$scope.projStoreClassmap = data.projStoreMap;
												$scope.projcostCodeMap = data.projCostItemMap;
												$scope.preContractData = data.preContractTO;
												$scope.companyMap = data.companyMap;
												$scope.companyList = data.preContractTO.preContractCmpTOs;
												
												
												$scope.expandCollapseManpower=function(manpowerFlag)
												{
													$scope.manpowerFlag=!manpowerFlag;
												},
												$scope.expandCollapsePlant=function(plantFlag)
												{
													$scope.plantFlag=!plantFlag;
												},
												$scope.expandCollapseMaterial=function(materialFlag)
												{
													$scope.materialFlag=!materialFlag;
												},
												$scope.expandCollapseService=function(serviceFlag)
												{
													$scope.serviceFlag=!serviceFlag;
												},
												
														$scope.onClickForwardBidderData = function(
																bidderDatamoreFlags1) {
															if ($scope.bidderDatamoreFlags < 3) {
																$scope.bidderDatamoreFlags = bidderDatamoreFlags1 + 1;
															}
														},

														$scope.onClickBackwardBidderData = function(
																bidderDatamoreFlags1) {
															if ($scope.bidderDatamoreFlags > 0) {
																$scope.bidderDatamoreFlags = bidderDatamoreFlags1 - 1;
															}
														},

														$scope.clickForwardBidderData = function(
																bidderDatamoreFlag1) {
															if ($scope.bidderDatamoreFlag < 2) {
																$scope.bidderDatamoreFlag = bidderDatamoreFlag1 + 1;
															}
														},

														$scope.clickBackwardBidderData = function(
																bidderDatamoreFlag1) {
															if ($scope.bidderDatamoreFlag > 0) {
																$scope.bidderDatamoreFlag = bidderDatamoreFlag1 - 1;
															}
														},

														$scope.saveProcBidderItems = function(
																apprvStatus) {
															var savereq = {
																"preContractTO" : $scope.preContractData,
																"apprvStatus" : apprvStatus,
																"approvedCompanyMap" : approvedCompanyMap
															};
															PreContractExternalService
																	.saveExternalPreContracts(
																			savereq)
																	.then(
																			function(
																					data) {
																				console
																						.log(data);
																				if(apprvStatus==3)
																					{
																				GenericAlertService
																				.alertMessage(
																						"Bid has been sent back to requestor  ",
																								data.status);
																				ngDialog.close();
																				
																			}
																			if(apprvStatus==4)
																				{
																				GenericAlertService
																				.alertMessage(
																						"Bid has been put on hold",
																								data.status);
																				ngDialog.close();
																				}
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Approval Failed To save",
																								"Error");
																			});
																
														},
														
														$scope.approveOrRejectProcBidderItems = function(
																apprvStatus) {
															if(apprvStatus!=6)
																{
																$scope.validateBid();
																
																}
															var savereq = {
																"preContractTO" : $scope.preContractData,
																"apprvStatus" : apprvStatus,
																"approvedCompanyMap" : approvedCompanyMap
															};
															PreContractExternalService
																	.saveExternalPreContracts(
																			savereq)
																	.then(
																			function(
																					data) {
																				console
																						.log(data);
																				if(apprvStatus==5)
																					{
																				GenericAlertService
																				.alertMessage(
																						"Bid has been Approved",
																								data.status);
																				ngDialog.close();
																					}
																				if(apprvStatus==6)
																				{
																			GenericAlertService
																			.alertMessage(
																					"Bid has been Rejected ",
																							data.status);
																			ngDialog.close();
																				}
																				
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Approval Failed To save",
																								"Error");
																			});
																
														},
														
														$scope.validateBid=function()
														{
															if ($scope.preContractData.preContractEmpDtlTOs) {
																angular
																.forEach(
																		$scope.preContractData.preContractEmpDtlTOs,
																		function(
																				empDtlTO,
																				key) {
																			var quantity = 0;
																			var apprvQuantity = 0;
																			var manpowerFalg = false;
																			var count=0;
																			angular
																					.forEach(
																							empDtlTO.preContractsEmpCmpTOs,
																							function(
																									empCmpTO,
																									key) {
																								if (empCmpTO.approveFlag) {
																									count=count+1;
																									if(count > 0)
																										{
																											if(empCmpTO.quantity <=0)
																												{
																												GenericAlertService
																												.alertMessage(
																														"Please enter manpower items approval quantity for bid",
																														"Error");
																												forEach.break();
																												apprvQuantity=0;
																												}
																										}else
																											{
																												apprvQuantity=empDtlTO.quantity;
																											}
																									quantity += parseInt(empCmpTO.quantity);
																									manpowerFalg=true;
																									if(approvedCompanyMap==null || approvedCompanyMap[empCmpTO.preContractCmpId]==null)
																									{
																									  approvedCompanyMap[empCmpTO.preContractCmpId]=empCmpTO.preContractCmpId;
																									}
																								}
																								
																							});

																			if (empDtlTO.quantity < quantity) {
																				GenericAlertService
																						.alertMessage(
																								"Manpower Approval quantity cannot be greater than actual quantity",
																								"Error");
																				forEach.break();
																			}
																			
																			if (!manpowerFalg) {
																				GenericAlertService
																				.alertMessage(
																						"Please select Manpower item for bid for approval",
																						"Warning");
																				forEach.break();

																			}
																		});
														
																
															}
															if ($scope.preContractData.preContractPlantDtlTOs) {
																angular
																		.forEach(
																				$scope.preContractData.preContractPlantDtlTOs,
																				function(
																						plantDtlTO,
																						key) {
																					var quantity = 0;
																					var apprvQuantity = 0;
																					var plantFalg = false;
																					var count=0;
																					angular
																							.forEach(
																									plantDtlTO.preContractPlantCmpTOs,
																									function(
																											plantCmpTO,
																											key) {
																										if (plantCmpTO.approveFlag) {
																											count=count+1;
																											if(count > 0)
																												{
																													if(plantCmpTO.quantity <=0)
																														{
																														GenericAlertService
																														.alertMessage(
																																"Please enter  plant items approval quantity for bid",
																																"Error");
																														forEach.break();
																														apprvQuantity=0;
																														}
																												}else
																													{
																														apprvQuantity=plantDtlTO.quantity;
																													}
																											quantity += parseInt(plantCmpTO.quantity);
																											plantFalg=true;
																											if(approvedCompanyMap==null || approvedCompanyMap[plantCmpTO.preContractCmpId]==null)
																											{
																											  approvedCompanyMap[plantCmpTO.preContractCmpId]=plantCmpTO.preContractCmpId;
																											}
																										}
																										
																									});

																					if (plantDtlTO.quantity < quantity) {
																						GenericAlertService
																								.alertMessage(
																										"Plant Approval quantity cannot be greater than actual quantity",
																										"Error");
																						forEach.break();
																					}
																					
																					if (!plantFalg) {
																						GenericAlertService
																						.alertMessage(
																								"Please select plant item for bid for approval",
																								"Warning");
																						forEach.break();

																					}
																				});
															}

															if ($scope.preContractData.preContractMaterialDtlTOs) {
																angular
																.forEach(
																		$scope.preContractData.preContractMaterialDtlTOs,
																		function(
																				materialDtlTO,
																				key) {
																			var quantity = 0;
																			var apprvQuantity = 0;
																			var materialFalg = false;
																			var count=0;
																			angular
																					.forEach(
																							materialDtlTO.preContractMaterialCmpTOs,
																							function(
																									materialCmpTO,
																									key) {
																								if (materialCmpTO.approveFlag) {
																									count=count+1;
																									if(count > 0)
																										{
																											if(materialCmpTO.quantity <=0)
																												{
																												GenericAlertService
																												.alertMessage(
																														"Please enter material items approval quantity for bid",
																														"Error");
																												forEach.break();
																												apprvQuantity=0;
																												}
																										}else
																											{
																												apprvQuantity=materialDtlTO.quantity;
																											}
																									quantity += parseInt(materialCmpTO.quantity);
																									materialFalg=true;
																									if(approvedCompanyMap==null || approvedCompanyMap[materialCmpTO.preContractCmpId]==null)
																									{
																									  approvedCompanyMap[materialCmpTO.preContractCmpId]=materialCmpTO.preContractCmpId;
																									}
																								}
																								
																							});

																			if (materialDtlTO.quantity < quantity) {
																				GenericAlertService
																						.alertMessage(
																								"Material Approval quantity cannot be greater than actual quantity",
																								"Error");
																				forEach.break();
																			}
																			
																			if (!materialFalg) {
																				GenericAlertService
																				.alertMessage(
																						"Please select Material item for bid for approval",
																						"Warning");
																				forEach.break();

																			}
																		});
															
															}
															if ($scope.preContractData.preContractServiceDtlTOs) {
																angular
																.forEach(
																		$scope.preContractData.preContractServiceDtlTOs,
																		function(
																				serviceDtlTO,
																				key) {
																			var quantity = 0;
																			var apprvQuantity = 0;
																			var serviceFalg = false;
																			var count=0;
																			angular
																					.forEach(
																							serviceDtlTO.preContractServiceCmpTOs,
																							function(
																									serviceCmpTO,
																									key) {
																								if (serviceCmpTO.approveFlag) {
																									count=count+1;
																									if(count > 0)
																										{
																											if(serviceCmpTO.quantity <=0)
																												{
																												GenericAlertService
																												.alertMessage(
																														"Please enter  service items approval quantity for bid",
																														"Error");
																												forEach.break();
																												apprvQuantity=0;
																												}
																										}else
																											{
																												apprvQuantity=serviceDtlTO.quantity;
																											}
																									quantity += parseInt(serviceCmpTO.quantity);
																									serviceFalg=true;
																									if(approvedCompanyMap==null || approvedCompanyMap[serviceCmpTO.preContractCmpId]==null)
																									{
																									  approvedCompanyMap[serviceCmpTO.preContractCmpId]=serviceCmpTO.preContractCmpId;
																									}
																								}
																								
																							});

																			if (serviceDtlTO.quantity < quantity) {
																				GenericAlertService
																						.alertMessage(
																								"Service Approval quantity cannot be greater than actual quantity",
																								"Error");
																				forEach.break();
																			}
																			
																			if (!serviceFalg) {
																				GenericAlertService
																				.alertMessage(
																						"Please select Service item for bid for approval",
																						"Warning");
																				forEach.break();

																			}
																		});
																
															}
															return true;
														}
											} ]
								});
						return deferred.promise;
					};
					return service;

				});
