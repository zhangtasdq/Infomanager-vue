import StatusCode from "@/configs/status-code-config";
import InfoService from "@/services/InfoService";


export const infoListViewState = {
    namespaced: true,
    state: {
        activeCategory: "",
        loadLocalInfoStatus: null,
        backupInfoStatus: null,
        restoreInfoStatus: null,
        loadInfos: null
    },

    mutations: {
        loadLocalInfoBegin: function(state) {
            state.loadLocalInfoStatus = StatusCode.LOAD_LOCAL_INFO_BEGIN;
        },

        localLocalInfoSuccess: function(state, payload) {
            state.loadLocalInfoStatus = StatusCode.LOAD_LOCAL_INFO_SUCCESS;
            state.loadInfos = payload.data;
        },

        loadLocalInfoFailed: function(state) {
            state.loadLocalInfoStatus = StatusCode.LOAD_LOCAL_INFO_FAILED;
        },

        ressetLoadLocalInfoStatus: function(state) {
            state.loadLocalInfoStatus = null;
            state.loadInfos = null;
        },

        setActiveCategory: function(state, payload) {
            state.activeCategory = payload.activeCategory;
        },

        backupInfoBegin: function(state) {
            state.backupInfoStatus = StatusCode.BACKUP_INFO_BEGIN;
        },

        backupInfoFailed: function(state) {
            state.backupInfoStatus = StatusCode.BACKUP_INFO_FAILED;
        },

        backupInfoSuccess: function(state) {
            state.backupInfoStatus = StatusCode.BACKUP_INFO_SUCCESS;
        },

        resetBackupInfoStatus: function(state) {
            state.backupInfoStatus = null;
        },

        restoreInfoBegin: function(state) {
            state.restoreInfoStatus = StatusCode.RESTORE_INFO_BEGIN;
        },

        restoreInfoFailed: function(state) {
            state.restoreInfoStatus = StatusCode.RESTORE_INFO_FAILED;
        },

        restoreInfoSuccess: function(state) {
            state.restoreInfoStatus = StatusCode.RESTORE_INFO_SUCCESS;
        },

        resetRestoreInfoStatus: function(state) {
            state.restoreInfoStatus = null;
        }
    },

    actions: {
        loadLocalInfo: function({commit}, payload) {
            commit("loadLocalInfoBegin");
            InfoService.loadLocalInfo(payload.password, (error, status, data) => {
                if (error || status === StatusCode.LOAD_LOCAL_INFO_FAILED) {
                    commit("loadLocalInfoFailed");
                } else {
                    commit("localLocalInfoSuccess", {data});
                }
            });
        },

        resetLoadLocalStatus: function({commit}) {
            commit("ressetLoadLocalInfoStatus");
        },

        setActiveCategory: function({commit}, payload) {
            commit("setActiveCategory", payload);
        },

        backupInfo: function({commit}) {
            commit("backupInfoBegin");
            InfoService.backupInfos((error) => {
                if (error) {
                    commit("backupInfoFailed");
                } else {
                    commit("backupInfoSuccess");
                }
            });
        },

        resetBackupInfoStatus: function({commit}) {
            commit("resetBackupInfoStatus");
        },

        restoreInfo: function({commit}) {
            commit("restoreInfoBegin");
            InfoService.restoreInfos((error) => {
                if (error) {
                    commit("restoreInfoFailed");
                } else {
                    commit("restoreInfoSuccess");
                }
            });
        },

        resetRestoreInfoStatus: function({commit}) {
            commit("resetRestoreInfoStatus");
        }
    },

    getters: {
        currentInfosGetter: function(state, getters, rootState) {
            return rootState.info.infos.filter((item) => item.category === state.activeCategory);
        }
    }
};