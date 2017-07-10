'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('EmpService', function(Restangular) {
	return {
		getEmpClasses: function(req) {
			var emp = Restangular.one("centrallib/getEmpClasses").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return emp;
		},
		saveEmpClasses : function(req) {
			var resultStatus = Restangular.one("centrallib/saveEmpClasses").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteEmpClasses: function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteEmpClasses").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
