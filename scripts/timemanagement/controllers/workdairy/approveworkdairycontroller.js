'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"approveworkdiary",
									{
										url : '/approveworkdiary',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/timemanagement/workdairy/approveworkdairy/approveworkdairy.html',
												controller : 'ApproveWorkDairyController'
											}
										}
									})
				})
		.controller(
				'ApproveWorkDairyController',
				function($scope, $state, ngDialog, UserEPSProjectService,
						ApprovedManpowerFactory, ApprovedMaterialFactory,ApprovedPlantFactory,ApprovedProgressFactory,
						GenericAlertService) {
					$scope.searchProject = {};
					$scope.currentTab = null;
					var editManpower = [];
					$scope.man = [];

					var editPlant = [];
					$scope.plant = [];

					var editProgress = [];
					$scope.pro = [];

					var editMaterial = [];
					$scope.matestore = [];

					$scope.editApprovedMaterial = [];
							$scope.getUserProjects = function() {
								var userProjectSelection = UserEPSProjectService
										.epsProjectPopup();
								userProjectSelection
										.then(
												function(userEPSProjData) {
													$scope.searchProject = userEPSProjData.selectedProject;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting EPS Project name",
																	'Error');
												});
							},

							$scope.supervisor = {
								data : [ {
									id : "id1",
									name : "CSS"
								}, {
									id : "id2",
									name : "CNN"
								} ]
							};

					/*$scope.dailycrewid = {
						data : [ {
							id : "id1",
							name : "CSS"
						}, {
							id : "id2",
							name : "CNN"
						} ]
					};*/
					$scope.approveWorkDiaryTabs = [
							{
								title : 'Man Power Utilisation',
								url : 'views/timemanagement/workdairy/approveworkdairy/approvemanpower.html'
							},
							{
								title : 'plant Utilisation',
								url : 'views/timemanagement/workdairy/approveworkdairy/approveplantsutilisation.html'
							},
							{
								title : 'Material and store Consumption',
								url : 'views/timemanagement/workdairy/approveworkdairy/approvematerialandstoreutilisation.html'
							},
							{
								title : 'Progress',
								url : 'views/timemanagement/workdairy/approveworkdairy/approveprogress.html'
							} ];

					$scope.currentTab = 'views/timemanagement/workdairy/approveworkdairy/approvemanpower.html';
					$scope.onClickTab = function(tab) {
						$scope.currentTab = tab.url;
					}, $scope.isActiveTab = function(tabUrl) {
						return tabUrl == $scope.currentTab;
					}

					$scope.mans = [ {
						"select" : false,
						"resourceId" : '',
						"firstName" : '',
						"surName" : '',
						"tradeNameAsCompany" : '',
						"category" : '',
						"wageRateFactor" : '',
						"unitOfMeasure" : '',
						"ccadmin1" : '',
						"ccaes1" : '',
						"ccbes1" : '',
						"total1" : '',
						"ccAdmin2" : '',
						"ccaes2" : '',
						"ccbes2" : '',
						"total2" : ''
					} ];
					$scope.approveManpowerRowSelect = function(man) {
						if (man.select) {
							editManpower.push(man);
						} else {
							editManpower.pop(man);
						}
					}
					$scope.editApprovedManpower = function(actionType) {
						if (actionType == 'Edit' && editManpower <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}

						var approveManpowerPopup = ApprovedManpowerFactory
								.approvedManpowerFactoryPopUp(actionType,
										editManpower);
						approveManpowerPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp service history  details",
															'Error');
										});
					}

					/* ========material============== */

					$scope.matestores = [ {
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
						"uploadDeliDoc" : '',
						"defectsIfAny" : '',
						"gfgf" : '',
						"nbnb" : '',
						"totalConsumQuan" : '',
						"apprvStatus" : ''
					} ];
					$scope.approveMaterialRowSelect = function(matestore) {
						if (matestore.select) {
							editMaterial.push(matestore);
						} else {
							editMaterial.pop(matestore);
						}
					}
					$scope.editApprovedMaterial = function(actionType) {
						if (actionType == 'Edit' && editMaterial <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}

						var approveMaterialPopup = ApprovedMaterialFactory
								.approvedMaterialFactoryPopUp(actionType,
										editMaterial);
						approveMaterialPopup.then(function(data) {
						}, function(error) {
							GenericAlertService.alertMessage(
									"Error occurred while fetching   details",
									'Error');
						});
					}
					/* ==============Plant=========== */
					$scope.plants = [ {
						"select" : false,
						"resourceId" : ' ',
						"rego" : ' ',
						"description" : ' ',
						"make" : ' ',
						"model" : ' ',
						"unitOfMeasure" : ' ',
						"wageRateFactor" : ' ',
						"plantChargeCate" : ' ',
						"gfgf" : ' ',
						"nbnb" : ' ',
						"total" : ' ',
						"nbnb" : ' ',
						"nbnb" : ' ',
						"total" : ' ',
						"totalAndIdle" : ' ',
						"approvalStatus" : ' ',
					} ];
					$scope.approvePlantRowSelect = function(plant) {
						if (plant.select) {
							editPlant.push(plant);
						} else {
							editPlant.pop(plant);
						}
					}
					$scope.editApprovedPalnt = function(actionType) {
						if (actionType == 'Edit' && editPlant <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}

						var approvePlantPopup = ApprovedPlantFactory
								.approvedPlantFactoryPopUp(actionType,
										editPlant);
						approvePlantPopup.then(function(data) {
						}, function(error) {
							GenericAlertService.alertMessage(
									"Error occurred while fetching   details",
									'Error');
						});
					}
					
					/*===========Progress=========*/
					$scope.progress = [ {
						"select" : false,
						"sowItemId" : ' ',
						"sorItemId" : ' ',
						"soeItemId" : ' ',
						"costCodeId" : ' ',
						"workDescrp" : ' ',
						"unitOfMeasure" : ' ',
						"gfgf" : ' ',
						"nbnb" : ' ',
						"total" : ' ',
						"approvalStatus" : ' '
					} ];
					$scope.approveProgressRowSelect = function(pro) {
						if (pro.select) {
							editProgress.push(pro);
						} else {
							editProgress.pop(pro);
						}
					}
					$scope.editApprovedProgress = function(actionType) {
						if (actionType == 'Edit' && editProgress <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}

						var approveProgressPopup = ApprovedProgressFactory
								.approvedProgressFactoryPopUp(actionType,
										editProgress);
						approveProgressPopup.then(function(data) {
						}, function(error) {
							GenericAlertService.alertMessage(
									"Error occurred while fetching   details",
									'Error');
						});
					}
					
				});
