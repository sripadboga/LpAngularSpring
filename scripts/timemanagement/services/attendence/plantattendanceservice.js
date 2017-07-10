'use strict';

app.factory('PlantAttendanceService', function(Restangular) {
	return {
		getAttendanceOnLoad : function(req) {
			var attendanceOnLoad = Restangular.one(
					"attendance/getPlantAttendance").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return attendanceOnLoad;
		},
		getPlantAttendanceDetails : function(req) {
			var plantAttendanceDetails = Restangular.one(
					"attendance/getPlantAttendanceRecords").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return plantAttendanceDetails;
		},
		savePlantAttendanceRecords : function(req) {
			var plantAttendanceDetails = Restangular.one(
					"attendance/savePlantAttendanceRecords").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return plantAttendanceDetails;
		},
		getPlantAttendanceSheets : function(req) {
			var plantAttendanceDetails = Restangular.one(
					"attendance/getPlantAttendanceSheets").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return plantAttendanceDetails;
		},
		getProjLeaveCodes : function(req) {
			var projCrewData = Restangular.one("projectlib/getProjLeaveCodes")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return projCrewData;
		},
		getPlantRegisters : function(req) {
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
