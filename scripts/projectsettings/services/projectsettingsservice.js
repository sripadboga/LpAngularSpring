'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Module Service in the potApp.
 */
app.factory('ProjectSettingsService', function(Restangular, $http) {
	return {
		getProjSettings : function(req) {
			var settings = Restangular.one('projsettings/getProjSettings')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return settings;
		},
		projGeneralOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var onLoadGenValReq = Restangular.one(
					'projsettings/projGeneralOnLoad').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return onLoadGenValReq;
		},
		getCountryDetailsById : function(req) {
			console.log(JSON.stringify(req));
			var getProvisionsReq = Restangular.one('common/getCountryDetailsById')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return getProvisionsReq;
		},
		saveProjGeneralValues : function(req) {
			console.log(JSON.stringify(req));
			var saveProjGeneralsReq = Restangular.one(
					'projsettings/saveProjGenerals').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveProjGeneralsReq;
		},
		projAttendenceOnLoad : function(req) {
			var projAttendenceOnLoadReq = Restangular.one(
					'projsettings/projAttendenceOnLoad').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return projAttendenceOnLoadReq;
		},
		getProjCrewLists : function(req) {
			
			var crewLists = Restangular.one('projectlib/getProjCrewLists')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return crewLists;
		},
		getProjUsers : function(req) {
			console.log(JSON.stringify(req));
			var users = Restangular.one("user/getUsers").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return users;
		},
		getNotifications : function(req) {
			console.log(JSON.stringify(req));
			var notificationDtls = Restangular
					.one("projsettings/getPreContractNotifications").customPOST(req, '', {},
							{
								ContentType : 'application/json'
							});
			return notificationDtls;
		},
		saveProjectPlants : function(req) {
			console.log(JSON.stringify(req));
			var resultPlantsStatus = Restangular.one(
					"projsettings/saveProjectPlants").customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return resultPlantsStatus;
		},
		getEPSDetails : function(req) {
			console.log(JSON.stringify(req));
			var epsDetails = Restangular.one("projectlib/projEPSOnLoad")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return epsDetails;
		},
		getCostDetails : function(req) {
			console.log(JSON.stringify(req));
			var costDetails = Restangular.one("projectlib/getProjCostItems")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return costDetails;
		},
		getProjSOWDetails : function(req) {
			console.log(JSON.stringify(req));
			var sowDetails = Restangular.one("projectlib/getSOWItems")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return sowDetails;
		},

		saveProjAttendence : function(req) {
			console.log(JSON.stringify(req));
			var saveProjAttendenceReq = Restangular.one(
					'projsettings/saveProjAttendence').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveProjAttendenceReq;
		},
		saveProjAttendenceAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveProjAttendenceApprReq = Restangular.one(
					'projsettings/saveProjAttendenceAppr').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveProjAttendenceApprReq;
		},

		projWorkDairyOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var workDairyOnLoadReq = Restangular.one(
					'projsettings/projWorkDairyOnLoad').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return workDairyOnLoadReq;
		},
		saveWorkDairy : function(req) {
			console.log(JSON.stringify(req));
			var saveWorkDairyReq = Restangular
					.one('projsettings/saveWorkDairy').customPOST(req, '', {},
							{
								ContentType : 'application/json'
							});
			return saveWorkDairyReq;
		},

		saveWorkDairyApprs : function(req) {
			console.log(JSON.stringify(req));
			var saveWorkDairyApprReq = Restangular.one(
					'projsettings/saveWorkDairyApprs').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveWorkDairyApprReq;
		},

		projTimeSheetOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var timeSheetOnLoadReq = Restangular.one(
					'projsettings/ProjTimeSheetOnLoad').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return timeSheetOnLoadReq;
		},
		saveProjTimeSheet : function(req) {
			console.log(JSON.stringify(req));
			var saveTimeSheetReq = Restangular.one(
					'projsettings/saveProjTimeSheet').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveTimeSheetReq;
		},

		saveProjTimeSheetAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveProjTimeSheetApprReq = Restangular.one(
					'projsettings/saveProjTimeSheetAppr').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveProjTimeSheetApprReq;
		},

		// Procurement Create
		getProjProcurements : function(req) {
			console.log(JSON.stringify(req));
			var getProcurementReq = Restangular.one(
					'projsettings/getProjProcure').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getProcurementReq;
		},
		saveProjProcurements : function(req) {
			console.log(JSON.stringify(req));
			var saveProcureReq = Restangular
					.one('projsettings/saveProjProcure').customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveProcureReq;
		},

		// Procurement Approval
		saveProjProcurementAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveProjProcureApprReq = Restangular.one(
					'projsettings/saveProjProcureAppr').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveProjProcureApprReq;
		},

		// Employee Transfer Create
		projEmpTransOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var empTransOnLoadReq = Restangular.one(
					'projsettings/projEmpTransOnLoad').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empTransOnLoadReq;
		},
		saveEmpTrans : function(req) {
			console.log(JSON.stringify(req));
			var saveEmpTransReq = Restangular.one('projsettings/saveEmpTrans')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpTransReq;
		},

		// Employee Transfer Approval
		saveEmpTransAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveEmpTransApprReq = Restangular.one(
					'projsettings/saveEmpTransAppr').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveEmpTransApprReq;
		},

		// Plant Transfer Create
		projPlantTransOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var plantTransOnLoadReq = Restangular.one(
					'projsettings/projPlantTransOnLoad').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return plantTransOnLoadReq;
		},
		saveProjPlantTrans : function(req) {
			console.log(JSON.stringify(req));
			var saveProjPlantTransReq = Restangular.one(
					'projsettings/saveProjPlantTrans').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveProjPlantTransReq;
		},

		// Plant Transfer Approval
		saveProjPlantTransAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveProjPlantTransApprReq = Restangular.one(
					'projsettings/saveProjPlantTransAppr').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveProjPlantTransApprReq;
		},

		// Material Transfer Create
		projMaterialTransOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var materialTransOnLoadReq = Restangular.one(
					'projsettings/projMaterialTransOnLoad').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return materialTransOnLoadReq;
		},
		saveProjMaterialTrans : function(req) {
			console.log(JSON.stringify(req));
			var saveProjMaterialTransReq = Restangular.one(
					'projsettings/saveProjMaterialTrans').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveProjMaterialTransReq;
		},

		// Material Transfer Approval
		saveProjMaterialTransAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveProjMaterialTransApprReq = Restangular.one(
					'projsettings/saveProjMaterialTransAppr').customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return saveProjMaterialTransApprReq;
		},

		// Project Estimate
		getProjEstimate : function(req) {
			var getProjEstimateReq = Restangular.one(
					'projsettings/getProjEstimate').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getProjEstimateReq;
		},
		saveProjEstimate : function(req) {
			var saveProjEstimateReq = Restangular.one(
					'projsettings/saveProjEstimate').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveProjEstimateReq;
		},
		
		// Project Summary
		
		getMeasureUnits : function(req) {
			var getMeasureUnitsReq = Restangular.one(
					'projsettings/getProjManPowerStatus').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getMeasureUnitsReq;
		},
		
		getPlantUnits : function(req) {
			var getPlantUnitsReq = Restangular.one(
					'projsettings/getProjectPlantsStatus').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getPlantUnitsReq;
		},
		
		getCostUnits : function(req) {
			var getCostUnitsReq = Restangular.one(
					'projsettings/getProjectCostStatementsSummary').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getCostUnitsReq;
		},
		getDateUnits : function(req) {
			var getDateUnitsReq = Restangular.one(
					'projsettings/getProjScheduledSummary').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getDateUnitsReq;
		},
		// Project Status
		getProjectStatus : function(req) {
			console.log("req------->" + JSON.stringify(req));
			var getProjectStatusReq = Restangular.one(
					'projsettings/getProjectStatus').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getProjectStatusReq;
		},
		// Note Book
		getProjNoteBook : function(req) {
			console.log("req------->" + JSON.stringify(req));
			var getNoteBookReq = Restangular.one(
					'projsettings/getProjNoteBook').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getNoteBookReq;
		},
		saveProjNoteBook : function(req) {
			console.log("req------->" + JSON.stringify(req));
			var saveNoteBookReq = Restangular
					.one('projsettings/saveProjNoteBook').customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveNoteBookReq;
		},
		// Project Reports
		getProjReports : function(req) {
			console.log(JSON.stringify(req));
			var getProjReportsReq = Restangular.one(
					'projsettings/getProjReports').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getProjReportsReq;
		},
		saveProjReports : function(req) {
			console.log(JSON.stringify(req));
			var saveProjReportsReq = Restangular.one(
					'projsettings/saveProjReports').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveProjReportsReq;
		},
		getProjProgressClaims : function(req) {
			console.log(JSON.stringify(req));
			var getProjClaimReq = Restangular.one(
					'projsettings/getProjProgressClaim').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return getProjClaimReq;
		},
		saveProjProgressClaim : function(req) {
			console.log(JSON.stringify(req));
			var saveProjClaimReq = Restangular.one(
					'projsettings/saveProjProgressClaim').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveProjClaimReq;
		},
		saveProgressClaimAppr : function(req) {
			console.log(JSON.stringify(req));
			var saveProjClaimApprReq = Restangular.one(
					'projsettings/saveProjProgressClaimAppr').customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return saveProjClaimApprReq;
		},
		projPayRollCycleOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var getPayRollReq = Restangular.one(
					'projsettings/projPayRollCycleOnLoad').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return getPayRollReq;
		},
		saveProjPayRollCycle : function(req) {
			console.log(JSON.stringify(req));
			var saveProjClaimApprReq = Restangular.one(
					'projsettings/saveProjPayRollCycle').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveProjClaimApprReq;
		},
		/* ================================================== */
		getProjManpowers : function(req) {
			var getManpowerReq = Restangular.one(
					'projsettings/getProjManpowers').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return getManpowerReq;
		},
		saveProjManpowers : function(req) {
			var saveManpowerReq = Restangular.one(
					'projsettings/saveProjManpowers').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveManpowerReq;
		},
		getProjectPlants : function(req) {
			var getPlantsReq = Restangular.one('projsettings/getProjectPlants')
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return getPlantsReq;
		},
		saveProjectPlants : function(req) {
			var savePlantsReq = Restangular.one(
					'projsettings/saveProjectPlants').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return savePlantsReq;
		},
		getProjectMaterials : function(req) {
			var getMaterialReq = Restangular.one(
					'projsettings/getProjectMaterials').customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return getMaterialReq;
		},
		saveProjectMaterials : function(req) {
			var saveMeterialsReq = Restangular.one(
					'projsettings/saveProjectMaterials').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveMeterialsReq;
		},

		getProjCostStatements : function(req) {
			var getProjReportsReq = Restangular.one(
					'projsettings/getProjCostStatements').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return getProjReportsReq;
		},
		saveCostStatement : function(req) {
			var saveCostStmtReq = Restangular.one(
					'projsettings/saveProjCostStatements').customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveCostStmtReq;
		},

		saveProjCostCodes : function(req) {
			var saveCostStmtReq = Restangular.one(
					'projsettings/saveProjCostCodes').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveCostStmtReq;
		},
		getProjProgMeasure : function(req) {
			var saveCostStmtReq = Restangular.one(
					'projsettings/getProjProgress').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveCostStmtReq;
		},
		saveProjSOWItems : function(req) {
			var saveProjSOWItemReq = Restangular.one(
					'projsettings/saveProjSows').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveProjSOWItemReq;
		},
		saveProjProgMeasure : function(req) {
			var saveProjProgMeasureReq = Restangular.one(
					'projsettings/saveProjProgress').customPOST(req, '', {}, {
				ContentType : 'application/json'
			});
			return saveProjProgMeasureReq;
		}
		

		
	}
});
