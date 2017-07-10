'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:Project Schedules Controller
 * @description # Project Schedules Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state("projschedules", {
				url : '/projschedules',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/projectschedules/scheduleprojectview.html',
						controller : 'ProjectSchedulesController'
					}
				}
			})
		})
		.controller(
				'ProjectSchedulesController',
				function($rootScope, $scope, $state, $q,UserEPSProjectService,ProjEmpClassService,
						 ngDialog, GenericAlertService,ProjectSettingsService,
						EpsService,ProjectSettingCostItemFactory,ProjSOWService) {

					$rootScope.projId = null;
					var deferred = $q.defer();

					$scope.moreFlag = 0;
					
					$scope.scheduleManpowerDetails = [];
					$scope.schedulePlantsDetails = [];
					$scope.scheduleMaterialDetails = [];
					$scope.scheduleTangibleDetails = [];
					$scope.scheduleCostStmtDtls = [];
					$scope.searchProject = {};
					
					
					$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
					  $scope.series = ['Series A', 'Series B'];
					  $scope.data = [
					    [65, 59, 80, 81, 56, 55, 40],
					    [28, 48, 40, 19, 86, 27, 90]
					  ];
					  $scope.onClick = function (points, evt) {
					    console.log(points, evt);
					  };
					  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
					  $scope.options = {
					    scales: {
					      yAxes: [
					        {
					          id: 'y-axis-1',
					          type: 'linear',
					          display: true,
					          position: 'left'
					        },
					        {
					          id: 'y-axis-2',
					          type: 'linear',
					          display: true,
					          position: 'right'
					        }
					      ]
					    }
					  };
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
						$scope.resetData = function() {
							$scope.searchProject = {};
							$scope.scheduleManpowerDetails = [];
							$scope.schedulePlantsDetails = [];
							$scope.scheduleMaterialDetails = [];
							$scope.scheduleTangibleDetails = [];
							$scope.scheduleCostStmtDtls = [];
							
						}
					$scope.scheduleTabs = [
												{
													title : 'Materials',
													url : 'views/projectschedules/schedulematerial.html',
												},
												{
													title : 'Man Power',
													url : 'views/projectschedules/schedulemanpower.html'
												} ,
												{
													title : 'Plant & Equipment',
													url : 'views/projectschedules/scheduleplant.html'
												} ,
												{
													title : 'Cost Budget',
													url : 'views/projectschedules/schedulecost.html'
												} ,
												{
													title : 'Tangible Quantity',
													url : 'views/projectschedules/scheduletangible.html'
												} ,
												{
													title : 'Summary Activity',
													url : 'views/projectschedules/scheduleactivity.html'
												} ];
				
					$scope.onClickTab = function(tab) {
						if ($rootScope.projId) {
							 if ($scope.scheduleTabs[0].url === tab.url) {
								 $scope.getScheduleMaterial();
							} else if ($scope.scheduleTabs[1].url === tab.url) {
							$scope.getScheduleManpower();
							$scope.getGeneralValuesOnLoad();
						} else if ($scope.scheduleTabs[2].url === tab.url) {
							$scope.getSchedulePlants();
						} else if ($scope.scheduleTabs[3].url === tab.url) {
							$scope.getScheduleCostStatement();
						} else if ($scope.scheduleTabs[4].url === tab.url) {
							$scope.getScheduleTangible();
						} else if ($scope.scheduleTabs[5].url === tab.url) {
						} 
						$scope.currentTab = tab.url;
						}
					},

					$scope.isActiveTab = function(tabUrl) {
						return tabUrl == $scope.currentTab;
					},
					
							$scope.openTabs = function(projId) {
								$rootScope.projId = projId;
								$scope.onClickTab($scope.scheduleTabs[0]); 
							},
							
							$scope.getEPSDetails = function() {
								var epsReq = {
									"status" : 1
								};
								EpsService
										.getEPSDetails(epsReq)
										.then(
												function(data) {
													$scope.epsData = data.ePSProjectTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting  EPS Project Details",
																	"Error");
												});
							};
							$scope.getGeneralValuesOnLoad = function() {
								var getGVOnLoadReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.projGeneralOnLoad(getGVOnLoadReq)
										.then(
												function(data) {
													$scope.generalValues = data.projGeneralMstrTO;
													$scope.resourceCurves = data.projresourceCurveTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting General Values",
																	"Error");
												});
							}
							
							$scope.getScheduleManpower = function() {
								var getManpowerReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								console.log(JSON.stringify(getManpowerReq));
								ProjectSettingsService
										.getProjManpowers(getManpowerReq)
										.then(
												function(data) {
													$scope.scheduleManpowerDetails = data.projManpowerTOs;
													$scope.startdate =  data.projManpowerTOs.startDate;
													console.log(JSON.stringify(data.projManpowerTO[$index].startDate));
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Man Power Details",
																	"Error");
												});
							},
							$scope.getSchedulePlants = function() {
								var getPlantReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjectPlants(getPlantReq)
										.then(
												function(data) {
													$scope.schedulePlantsDetails = data.projectPlantsDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Plant Details",
																	"Error");
												});
							},
							$scope.getScheduleMaterial = function() {
								var getMaterialReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjectMaterials(getMaterialReq)
										.then(
												function(data) {
													$scope.scheduleMaterialDetails = data.projectMaterialDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Material Details",
																	"Error");
												});
							},
							$scope.getScheduleTangible =  function() {
								var getProgMeasureReq = {
										"status" : 1,
										"projId" : $rootScope.projId
									};
									ProjectSettingsService
											.getProjProgMeasure(getProgMeasureReq)
											.then(
													function(data) {

														console.log(JSON
																.stringify(data));

														$scope.scheduleTangibleDetails = data.projProgressTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occured while getting Progress Measure Details",
																		"Error");
													});

							},
							$scope.getScheduleCostStatement = function() {
								var getCostStatReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getProjCostStatements(getCostStatReq)
										.then(
												function(data) {
													$scope.scheduleCostStmtDtls = data.projCostStmtDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting Cost Details",
																	"Error");
												});
							}
							/*var costReq = {
									"status" : 1,
									"projId" : $rootScope.projId
								};
								ProjectSettingsService
										.getCostDetails(costReq)
										.then(
												function(data) {
													$scope.scheduleCostStmtDtls = data.projCostItemTOs;
												});*/
								 $scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};
					function itemexpandCollpase(item, expand) {
						angular.forEach(item.children, function(o) {
							o.expand = !expand;
							if (o.children != null && o.children.length > 0) {
								o.expand = false;
								itemexpandCollpase(o, expand);
							}
						});
					}
				}).filter('slice', function() {
			return function(arr, start, end) {
				return (arr || []).slice(start, end);
			}
	}).filter(
				'projCostStatementFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.projCostStmtChildTOs
									&& o.projCostStmtChildTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								newObj.push(o);
								if (o.expand == true) {
									recursive(o.projCostStmtChildTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
									newObj.push(o);
								} else {
									obj.splice(obj.indexOf(o), 1);
									o.leaf = false;
								}
								return false;
							}
						});
					}
					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'projCostFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o != undefined && o.projCostCodeItemTOs
									&& o.projCostCodeItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.projCostCodeItemTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								newObj.push(o);
								return false;
							}
						});
					}
					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'sowFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childSOWItemTOs
									&& o.childSOWItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childSOWItemTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								newObj.push(o);
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'sowProgMeasureFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childProjProgressTOs
									&& o.childProjProgressTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								newObj.push(o);
								if (o.expand == true) {
									recursive(o.childProjProgressTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
									newObj.push(o);
								} else {
									obj.splice(obj.indexOf(o), 1);
									o.leaf = false;
								}
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				});