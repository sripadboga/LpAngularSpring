
'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Emp Class Service in the potApp.
 */
app.factory('ProjCrewListService', function(Restangular) {
	return {
		getProjCrewLists : function(req) {
			var projCrewData = Restangular.one("projectlib/getProjCrewLists").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return projCrewData;
		},
		projCrewListifOnLoad : function(onLoadReq) {
			var  response = Restangular.one("projectlib/projCrewListifOnLoad").customPOST(
					onLoadReq, '', {}, {
						ContentType : 'application/json'
					});
			return response;
		},
		getProjWorkShifts : function(req) {
			var workshift= Restangular.one("projectlib/getProjWorkShifts").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return workshift;
		},
		saveProjCrewLists : function(req) {
			var saveStatus = Restangular.one("projectlib/saveProjCrewLists").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteProjCrewLists : function(req) {
			var deleteStatus = Restangular.one("projectlib/deleteProjCrewLists")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		},
		getProjWorkShifts : function(req) {
			var empClasses = Restangular.one("projectlib/getProjWorkShifts").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return empClasses;
		}

	}
});
