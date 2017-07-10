'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # PreContract Service in the potApp.
 */
app.factory('PreContractInternalService', function(Restangular) {
	return {
		getInternalPreContracts : function(req) {

			var contractDetails = Restangular.one(
					"procurement/getInternalPreContracts").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return contractDetails;
		},
		getWorkFlowstatus : function() {
			var workFlowstatus = Restangular.one(
					"procurement/getWorkFlowStatus").customPOST(null, '', {}, {
				ContentType : 'application/json'
			});
			return workFlowstatus;
		},
		getUsersByModulePermission : function(req) {
			var users = Restangular.one("user/getUsersByModulePermission")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return users;
		},
		getPreContractTypes : function(req) {

			var contractDetails = Restangular.one(
					"procurement/getPreContractTypes").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return contractDetails;
		},
		getInternalPreContractPopupOnLoad : function(req) {
			var costCodes = Restangular.one(
					"procurement/getInternalPreContractPopupOnLoad")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return costCodes;
		},
		getPreContractReqApprs : function(req) {
			var reqApprovals = Restangular.one(
					"procurement/getPreContractReqApprs").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return reqApprovals;
		},
		getProjStoreStocks : function(req) {
			var result = Restangular.one("projectlib/getProjStoreStocks")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return result;
		},
		saveInternalPreContracts : function(req) {

			var costSaveStatus = Restangular.one(
					"procurement/saveInternalPreContracts").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costSaveStatus;
		},
		deactivateInternalRequest : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/deactivatePreContracts").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		deactivatePreContractDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/deactivatePreContractDetails").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratEmpDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratEmpTypes").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratPlantDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratPlants").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratMaterialDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratMaterials").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratServiceDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratServices").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return serDetails;
		},
		saveManPowerDetails : function(req) {

			var saveStatus = Restangular.one(
					"procurement/savePreContratEmpTypes").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});

			return saveStatus;

		},
		savePreContratMaterials : function(req) {

			var saveStatus = Restangular.one(
					"procurement/savePreContratMaterials").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		savePreContratPlants : function(req) {

			var saveStatus = Restangular
					.one("procurement/savePreContratPlants").customPOST(req,
							'', {}, {
								ContentType : 'application/json'
							});
			return saveStatus;
		},
		savePreContratServices : function(req) {

			var saveStatus = Restangular.one(
					"procurement/savePreContratServices").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		savePreContratDocuments : function(req) {

			var saveStatus = Restangular.one("procurement/savePreContratDocs")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		}
	}
});
