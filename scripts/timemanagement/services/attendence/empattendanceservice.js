'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Attendance Service in the potApp.
 */
app.factory('EmpAttendanceService', function($q, Restangular) {
	return {
		getAttendanceOnLoad : function(req) {
			var attendanceOnLoad = Restangular.one(
					"attendance/getEmpAttendance").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return attendanceOnLoad;
		},
		getEmpAttendanceDetails : function(req) {
			var empAttendanceDetails = Restangular.one(
					"attendance/getEmpAttendanceRecords").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return empAttendanceDetails;
		},
		saveEmpAttendanceRecords : function(req) {
			var empAttendanceDetails = Restangular.one(
					"attendance/saveEmpAttendanceRecords").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return empAttendanceDetails;
		},
		getEmpAttendanceSheets : function(req) {
			var empAttendanceDetails = Restangular.one(
					"attendance/getEmpAttendanceSheets").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return empAttendanceDetails;
		},
		getProjCrewLists : function(req) {
			var projCrewData = Restangular.one("projectlib/getProjCrewLists")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return projCrewData;
		},
		getProjLeaveCodes : function(req) {
			var projCrewData = Restangular.one("projectlib/getProjLeaveCodes")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return projCrewData;
		},
		getEmpRegisters : function(req) {
			console.log("req save --->" + JSON.stringify(req));
			var deferred = $q.defer();
			var userProjDetailsTOs = {
				"userProjDetailsTOs" : [ {
					"select" : false,
					"empId" : "Sprite",
					"firstName" : "co-co",
					"lastName" : "sprite",
					"trade" : "sprite",
					"category" : "sprite"
				}, {
					"select" : false,
					"empId" : "Pepsi",
					"firstName" : "Kristályvíz",
					"lastName" : "pepsi",
					"trade" : "pepsi",
					"category" : "pepsi"
				}, {
					"select" : false,
					"empId" : "Slice",
					"firstName" : "slice",
					"lastName" : "slice",
					"trade" : "maaza",
					"category" : "maaza"
				} ]
			};
			deferred.resolve(userProjDetailsTOs);
			return deferred.promise;
		}
	}
});
