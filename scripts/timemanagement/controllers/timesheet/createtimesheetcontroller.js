'use strict';
app
		.config(function($stateProvider) {
			$stateProvider.state('createtimesheet', {
				url : '/createtimesheet',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/timemanagement/timesheet/createtimesheet/createstaff.html',
						controller : 'CreateTimeSheetController'
					}
				}
			})
		})
		.controller(
				"CreateTimeSheetController",
				function($rootScope,$scope,$state,ngDialog,UserEPSProjectService,CreateTimeSheetFactory,UserService,DateWiseFactory,ExpensesFactory,CreateTimeSheetService,ApproverTimeSheetFactory,GenericAlertService) {
				
					var editEmp = [];
					$scope.timesheet = [];
					$scope.deletecodes = [];
					var selectedEmp = [];
					var addTimeSheet=[];
					var editTimeSheet=[];
					var editExpenses=[];
					var editApprover=[];
					var addDate=[];
					var editDate=[];
					var addExpenses=[];
					var expensesPopup=[];
					
					var datePopup=[];
					var addApprover=[];
					$scope.addApprover = [];
					

					$scope.approver = {
					"status" : 1,
					"clientId" : null,
					"labelKeyTO" : {

					"name" : null
					}
					};

					 
					
					//userlist data from admin
					var addapproverPersonPopup = [];
					$scope.approverPerson = function(labelKeyTO) {

					addapproverPersonPopup = ApproverTimeSheetFactory
					.getApprovers($rootScope.clientId);
					addapproverPersonPopup
					.then(
					function(data) {
					labelKeyTO.code = data.userListTO.userId;
					},
					function(error) {
					GenericAlertService
					.alertMessage(
					"Error occured while adding companies to precontract",
					'Error');
					});
					}

					 
                     
					$scope.getUserProjects = function() {					
					    var userProjectSelection=UserEPSProjectService.epsProjectPopup();
				    	userProjectSelection.then(function(userEPSProjData) {
				    		$scope.searchProject = userEPSProjData.selectedProject;
		                }, function(error) {
		                     GenericAlertService.alertMessage("Error occured while selecting EPS Project name",'Error');
		                });                   
				}
						//get TimeSheet
					$scope.getTimeSheet = function(projId) {
						var req = {
								
							"status" :"1"
						};
						CreateTimeSheetService.getTimeSheet(req).then(function(data) {
											$scope.timesheet =data.timeSheetTOs;
											/*if (req.projId == null
													&& workGetReq.status == 1) {
												GenericAlertService
														.alertMessage(
																"Please enter proper values",
																'Warning');
											}*/
										},function(error) {
											GenericAlertService
											.alertMessage(
													"Error occured while getting TimeSheet Details",
													'Error');
								});
					}
					
					//----Tabs----//
					$scope.timeSheetTab = [{
				        title: 'DateWise and EmployeeWise TaskListPerformed',
				        url: 'views/timemanagement/timesheet/createtimesheet/datewise.html'
				    }, {
				        title: 'DateWise Expenses incurred',
				        url: 'views/timemanagement/timesheet/createtimesheet/expenses.html'
				    }
				];
					$scope.currentTab = 'views/timemanagement/timesheet/createtimesheet/datewise.html';
					$scope.onClickTimeSheetTab = function(masterTabs) {
						$scope.currentTab= masterTabs.url;
						}, $scope.isActiveTimeSheetTab = function(masterTabsUrl) {
						return masterTabsUrl == $scope.currentTab;
						}
						
					//---dropdowns---//
					$scope.crews = [{
				        id: 1,
				        name: 'Team',
				        desc: ''
				    }, {
				        id: 2,
				        name: 'Individual',
				        desc: ''
				    }
				   
				    ];
					  $scope.crewindvs= [{
					        parent: 1,
					        id: 9,
					        name: 'concreteworkCrew',
					        desc: ''
					    }, {
					        parent: 1,
					        id: 10,
					        name: 'EarthworkCrew',
					        desc: ''
					    }, {
					        parent: 1,
					        id: 11,
					        name: 'bridgeDesignTeam',
					        desc: ''
					    }, {
					        parent: 2,
					        id: 12,
					        name: 'E-101',
					        desc: ''
					    }
					   
					    ]
					  
					  $scope.timesheet= [{
		     				"employeeID" : '',
		    				"firstName" : "cc",
		    				"surName" : '',
		                    "tradeName" : '',
		                    "category" : '',
		                    "wageName" : '',
		                    "cosName" : '',
		                    "mon" : '',
		                    "tue" : '',
		                    "wed" : '',
		                    "thu" : '',
		                    "fri" : '',
		                    "sat" : '',
		                    "sun" : '',
		                    "total" : ''
		  }];

					  $scope.expensesList= [{
						    "Date":'',
							"employeeId":'',
							"firstName":'',
							"surName":'',
						    "costcodeId":'',
							"amount":'',
							"desc":'',
		  }];
					  
					  $scope.dates= [{
		     				"employeeID" : 'aa',
		    				"firstName" : "cc",
		    				"surName" : 'ee',
		                    "tradeName" : '',
		                    "category" : '',
		                    "wageName" : '',
		                    "cosName" : '',
		                    "mon" : '1',
		                    "tue" : '2',
		                    "wed" : '3',
		                    "thu" : '',
		                    "fri" : '',
		                    "sat" : '',
		                    "sun" : '',
		                    "total" : ''
		  }];
				 
					//emp popup
				    $scope.rowSelect = function(time) {
						if (time.selected) {
							editTimeSheet.push(time);
						} else {
							editTimeSheet.pop(time);
						}
					}
					  
					  $scope.addTimeSheet=function(actionType){
							if(actionType=='Edit' && editTimeSheet<=0){
								GenericAlertService.alertMessage("Please select atlist one row to edit",'Warning');
								return ;
							}
							var empdetailsPopup = CreateTimeSheetFactory.empPopupDetails(actionType,editTimeSheet);
							empdetailsPopup.then(function(data){
								},function(error){
									GenericAlertService.alertMessage("Error occurred while fetching employee details",'Error');
								});
						}
					  
					  // datewise popup tab
					  $scope.dateWiseRowSelect = function(date) {
							if (date.selected) {
								editDate.push(date);
							} else {
								editDate.pop(date);
							}
						}
						  
						  $scope.addDate=function(actionType){
								if(actionType=='Edit' && editDate<=0){
									GenericAlertService.alertMessage("Please select atlist one row to edit",'Warning');
									return ;
								}
								var datePopup = DateWiseFactory.dateWisePopUp(actionType,editDate);
								datePopup.then(function(data){
									},function(error){
										GenericAlertService.alertMessage("Error occurred while fetching employee details",'Error');
									});
							}
						  
						  //expenses tab popup
						  $scope.expensesRowSelect = function(expenses) {
							  console.log(JSON.stringify((expenses.selected)));
								if (expenses.selected) {
									editExpenses.push(expenses);
								} else {
									editExpenses.pop(expenses);
								}
							}
							  
							  $scope.addExpenses=function(actionType){
									if(actionType=='Edit' && editExpenses<=0){
										GenericAlertService.alertMessage("Please select atlist one row to edit",'Warning');
										return ;
									}
									var expensesPopup = ExpensesFactory.expensesFactPopUp(actionType,editExpenses);
									expensesPopup.then(function(data){
										},function(error){
											GenericAlertService.alertMessage("Error occurred while fetching employee details",'Error');
										});
								}
							  
							
								  //emp popup save
								  
								  $scope.saveStaff = function() {
										var saveEmpReq = {
											"projAttendenceTOs" : $scope.staffDetails
										};
										CreateTimeSheetService
												.saveEmployeePopup(saveEmpReq)
												.then(
														function(data) {
															GenericAlertService
																	.alertMessage(
																			'Emp(s)popup are saved succuessfully',
																			"Info");
														},
														function(error) {
															GenericAlertService
																	.alertMessage(
																			'Emp(s)popup are failed to save',
																			"Error");
														});
									},
								  
								  
									 // DateWise popup save
									  
									  
									  $scope.saveDate = function() {
											var saveDateReq = {
												"projAttendenceTOs" : $scope.dateDetails
											};
											CreateTimeSheetService
													.saveDateWisePopup(saveDateReq)
													.then(
															function(data) {
																GenericAlertService
																		.alertMessage(
																				'DateWise(s)popup are saved succuessfully',
																				"Info");
															},
															function(error) {
																GenericAlertService
																		.alertMessage(
																				'DateWise(s)popup are failed to save',
																				"Error");
															});
										},
										
										 // Expenses popup save
										  
										  
										  $scope.saveExp = function() {
												var saveExpReq = {
													"projAttendenceTOs" : $scope.expensesDetails
												};
												CreateTimeSheetService
														.saveExpensesPopup(saveExpReq)
														.then(
																function(data) {
																	GenericAlertService
																			.alertMessage(
																					'Expenses(s)popup are saved succuessfully',
																					"Info");
																},
																function(error) {
																	GenericAlertService
																			.alertMessage(
																					'Expenses(s)popup are failed to save',
																					"Error");
																});
											},
											
									  
									  
							$scope.deleteEmpClass = function(time) {
								$scope.deleteIds = [];
								if ($scope.selectedAll) {
									$scope.timesheet = [];
								} else {
									angular.forEach($scope.timesheet, function(
											value, key) {
										if (!value.select) {
											$scope.deleteIds.push(value);
										}
									});
									$scope.timesheet = $scope.deleteIds;
								}
								if ($scope.timesheet.length <= 0) {
									$scope.selectedAll = false;
								}
								$scope.deleteIds = [];
							}
				}).filter('crewDropdown', function () {
				    return function (secondcrewSelect, crewSelect) {
				        var filtered = [];
				        if (crewSelect === null) {
				            return filtered;
				        }
				        angular.forEach(secondcrewSelect, function (s2) {
				            if (s2.parent == crewSelect) {
				                filtered.push(s2);
				            }
				        });
				        return filtered;
				    }	
				    });

								

			