
'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # WorkShift Class Service in the potApp.
 */
app.factory('ProjWorkShiftService', function(Restangular) {
	return {
		getProjWorkShifts : function(req) {
			var empClasses = Restangular.one("projectlib/getProjWorkShifts").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return empClasses;
		},
		projWorkShiftOnLoad : function(req) {
			var  response = Restangular.one("projectlib/projWorkShiftOnLoad").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return response;
		},
		saveProjWorkShifts : function(req) {
			var saveStatus = Restangular.one("projectlib/saveProjWorkShifts").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteProjWorkShifts : function(req) {
			var deleteStatus = Restangular.one("projectlib/deleteprojWorkShifts")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}
});
