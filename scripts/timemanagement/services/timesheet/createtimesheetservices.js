'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Module Service in the potApp.
 */
app.factory('CreateTimeSheetService', function(Restangular, $http) {
	return {
		getTimeSheet : function(req) {
			var timesheet = Restangular.one('timesheet/createtimesheet/getTimeSheet')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return timesheet;
		},
		
		getUsers : function(req) {
			console.log(JSON.stringify(req));
			var users = Restangular.one("user/getUsers").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return users;
		},
		saveUser : function(req) {
			var data = angular.toJson(req, true);
			console.log("save request -----------" + data);
			var saveUsers = Restangular.one("user/saveUser").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveUsers;
		},
		
		
		//date wise tab get
		getDateWise : function(req) {
			var dateWise = Restangular.one('timesheet/createtimesheet/getDateWise')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return dateWise;
		},
		//emp save
		saveEmployee : function(req) {
			console.log(JSON.stringify(req));
			var saveEmpReq = Restangular.one(
					'empReg/saveEmployee').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveEmpReq;
		},
		//Approver popup save
		saveApproverpopup : function(req) {
			console.log(JSON.stringify(req));
			var saveApproverReq = Restangular.one(
					'timesheet/createtimesheet/saveApproverpopup').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveApproverReq;
		},
		//DateWise Save
		saveDateWisepopup : function(req) {
			console.log(JSON.stringify(req));
			var saveDatewiseReq = Restangular.one(
					'timesheet/createtimesheet/saveDateWisepopup').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveDatewiseReq;
		},
		//Expensess Save
		saveExpensesspopup : function(req) {
			console.log(JSON.stringify(req));
			var saveExpensessReq = Restangular.one(
					'timesheet/createtimesheet/saveExpensesspopup').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveExpensessReq;
		},
	}
});
