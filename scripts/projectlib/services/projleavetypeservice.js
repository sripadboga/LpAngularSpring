'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Object Service in the potApp.
 */
app.factory('ProjLeaveTypeService', function(Restangular) {
	
	return {
		getUserProjects : function(req) {
			var projectEps = Restangular.one("projectlib/getUserProjects").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return projectEps;
		},
		getCostDetails : function(req) {
			var costDetails = Restangular
					.one("projectlib/getProjCostItems").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return costDetails;
		},
		getProjLeaveCodeTypes : function(req) {
			var leaveCodeTypes = Restangular.one("projectlib/getProjLeaveCodeTypes").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return leaveCodeTypes;
		},
		getProjLeavePaidTypes : function(req) {
			var leavePaidTypes = Restangular.one("projectlib/getProjLeavePaidTypes").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return leavePaidTypes;
		},
		getProjLeaveTypes : function(req) {
			var leaveTypes = Restangular.one("projectlib/getProjLeaveTypes").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return leaveTypes;
		},getProjEmpTypes : function(req) {
			var empClasses = Restangular.one("projectlib/getProjEmpTypes").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return empClasses;
		},
		projLeaveTypeifOnLoad : function(req) {
			var  response = Restangular.one("projectlib/projLeaveTypeifOnLoad").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return response;
		},
		saveProjLeaveTypes : function(req) {
			var saveStatus = Restangular.one("projectlib/saveProjLeaveTypes").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deleteProjLeaveTypes : function(req) {
			var deleteStatus = Restangular.one("projectlib/deleteProjLeaveTypes")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}
});
