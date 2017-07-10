'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:RoleController
 * @description # Role Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state('roles', {
		url : '/roles',
		parent : 'site',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/role/role.html',
				controller : 'RoleController'
			}
		}
	})
}).controller(
		'RoleController',
		function($scope, $state, RoleService, GenericAlertService) {
			$scope.users = {};
			$scope.moduleTreeData = [];
			$scope.userProfiles = [];
			var deleteIds = [];
			var saveData = [];
			$scope.defaultRole=false;
			$scope.roleId = null;
			$scope.addProfile = function() {
				$scope.defaultRole=false;
				$scope.userProfiles.push({
					"roleId" : null,
					"roleName" : '',
					"status" : 1
				});
			}, $scope.rowSelect = function(rowData) {
				if (rowData.select) {
					deleteIds.push(rowData.roleId);
				} else {
					deleteIds.pop(rowData.roleId);
				}
			}, $scope.deleteRoles = function() {
				if (deleteIds == undefined || deleteIds.length <= 0) {
					GenericAlertService.alertMessage(
							"Please select atleast one Role to deactivate",
							'Warning');
					return;
				}
				var roleDeactivateReq = {
					"roleIds" : deleteIds,
					"status" : 2
				};
				RoleService.deactivateRoles(roleDeactivateReq)
						.then(
								function(data) {
									GenericAlertService.alertMessage(
											"Role is Deactivated successfully",
											"Info");
									$scope.userProfiles = data.roleTOs;
									deleteIds = [];
								},
								function(error) {
									GenericAlertService.alertMessage(
											"Role is failed to deactivate",
											"Error");
								});
			}, $scope.getRoles = function() {
				$scope.defaultRole=false;
				var roleReq = {
					"status" : 1
				};
				RoleService.getRoles(roleReq).then(function(data) {
					$scope.userProfiles = data.roleTOs;
				});
			}, $scope.saveRoles = function() {

				$scope.profile = true;
				angular.forEach($scope.userProfiles, function(userProfile) {
					if (userProfile.roleId == undefined
							|| userProfile.roleId == null) {
						saveData.push(userProfile);
					}
				});
				var saveRoleReq = {
					"roleTOs" : saveData
				};
			
				RoleService.saveRoles(saveRoleReq).then(
						function(data) {
							GenericAlertService.alertMessage(
									"Role Name Created succuessfully", "Info");
							$scope.userProfiles = data.roleTOs;
							saveData = [];
						},
						function(error) {
							GenericAlertService.alertMessage(
									"Error Occured While Creating Role Name",
									"Error");
						});
			}, $scope.getRolePermissions = function(roleObj) {
				$scope.roleId = roleObj.roleId;
				$scope.defaultRole=roleObj.defaultRole;
				var rolePermissionReq = {
					"moduleId" : null,
					"roleIds" : [ roleObj.roleId ],
					"status" : 1
				};
				RoleService.getRolePermissions(rolePermissionReq).then(
						function(data) {
							$scope.moduleTreeData = data.moduleTOs;
						});
			}, $scope.saveRolePermission = function(moduleData) {
				var savePermissionReq = {
					"moduleTOs" : moduleData,
					"roleId" : $scope.roleId
				};
				RoleService.saveRolePermission(savePermissionReq).then(
						function(data) {
							GenericAlertService.alertMessage(
									'Role Permissions ' + data.message,
									data.status);
						},
						function(error) {
							GenericAlertService.alertMessage(
									"Error Occured While Saving Permissions",
									"Error");
						});
			};
			$scope.itemId = 1;
			$scope.isExpand = true;
			$scope.itemClick = function(itemId, expand) {
				$scope.itemId = itemId;
				$scope.isExpand = !expand;
			}
		}).filter(
		'roleFilterTree',
		function() {
			function recursive(obj, newObj, level, itemId, isExpand) {
				angular.forEach(obj, function(o) {
					if (o.childModules && o.childModules.length != 0) {
						o.level = level;
						o.leaf = false;
						newObj.push(o);
						if (o.moduleId == itemId) {
							o.expand = isExpand;
						}
						if (o.expand == true) {
							recursive(o.childModules, newObj, o.level + 1,
									itemId, isExpand);
						}
					} else {
						o.level = level;
						o.leaf = true;
						newObj.push(o);
						return false;
					}
				});
			}

			return function(obj, itemId, isExpand) {
				var newObj = [];
				recursive(obj, newObj, 0, itemId, isExpand);
				return newObj;
			}
		});
