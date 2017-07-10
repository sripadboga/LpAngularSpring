'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Module Service in the potApp.
 */
app.factory('ApproveTimeSheetService', function(Restangular, $http) {
	return {
		getApprove : function(req) {
			var settings = Restangular.one('timesheet/approvetimesheet/getEmployee')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return settings;
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
	}
});
