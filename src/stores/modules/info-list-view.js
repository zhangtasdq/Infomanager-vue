import StatusCode from "@/configs/status-code-config";
import InfoService from "@/services/InfoService";

import { infowListViewTypes as types } from "../mutation-types";

const initState = {
    activeCategory: "",
    loadLocalInfoStatus: null,
    backupInfoStatus: null,
    restoreInfoStatus: null,
    loadInfos: null
};

export const infoListViewState = {
    namespaced: true,
    state: {...initState},

    mutations: {
        [types.LOAD_LOCAL_INFO_BEGIN]: function(state) {
            state.loadLocalInfoStatus = StatusCode.LOAD_LOCAL_INFO_BEGIN;
        },

        [types.LOAD_LOCAL_INFO_SUCCESS]: function(state, payload) {
            state.loadInfos = payload.data;
            state.loadLocalInfoStatus = StatusCode.LOAD_LOCAL_INFO_SUCCESS;
        },

        [types.LOAD_LOCAL_INFO_FAILED]: function(state) {
            state.loadLocalInfoStatus = StatusCode.LOAD_LOCAL_INFO_FAILED;
        },

        [types.RESET_LOAD_LOCAL_INFO_STATUS]: function(state) {
            state.loadLocalInfoStatus = null;
            state.loadInfos = null;
        },

        [types.SET_ACTIVITY_CATEGORY]: function(state, payload) {
            state.activeCategory = payload.activeCategory;
        },

        [types.BACKUP_INFO_BEGIN]: function(state) {
            state.backupInfoStatus = StatusCode.BACKUP_INFO_BEGIN;
        },

        [types.BACKUP_INFO_Failed]: function(state) {
            state.backupInfoStatus = StatusCode.BACKUP_INFO_FAILED;
        },

        [types.BACKUP_INFO_SUCCESS]: function(state) {
            state.backupInfoStatus = StatusCode.BACKUP_INFO_SUCCESS;
        },

        [types.RESET_BACKUP_INFO_STATUS]: function(state) {
            state.backupInfoStatus = null;
        },

        [types.RESTORE_INFO_BEGIN]: function(state) {
            state.restoreInfoStatus = StatusCode.RESTORE_INFO_BEGIN;
        },

        [types.RESTORE_INFO_FAILED]: function(state) {
            state.restoreInfoStatus = StatusCode.RESTORE_INFO_FAILED;
        },

        [types.RESTORE_INFO_SUCCESS]: function(state) {
            state.restoreInfoStatus = StatusCode.RESTORE_INFO_SUCCESS;
        },

        [types.RESET_RESTORE_INFO_STATUS]: function(state) {
            state.restoreInfoStatus = null;
        },

        [types.RESET_VIEW_STATE]: function(state) {
            state.activeCategory = initState.activeCategory;
            state.loadLocalInfoStatus = initState.loadLocalInfoStatus;
            state.restoreInfoStatus = initState.restoreInfoStatus;
            state.backupInfoStatus = initState.backupInfoStatus;
            state.loadInfos = initState.loadInfos;
        }
    },

    actions: {
        loadLocalInfo: function({commit}, payload) {
            commit(types.LOAD_LOCAL_INFO_BEGIN);
            InfoService.loadLocalInfo(payload.password, (error, status, data) => {
                if (error || status === StatusCode.LOAD_LOCAL_INFO_FAILED) {
                    commit(types.LOAD_LOCAL_INFO_FAILED);
                } else {
                    commit(types.LOAD_LOCAL_INFO_SUCCESS, {data});
                }
            });
        },

        resetLoadLocalStatus: function({commit}) {
            commit(types.RESET_LOAD_LOCAL_INFO_STATUS);
        },

        setActiveCategory: function({commit}, payload) {
            commit(types.SET_ACTIVITY_CATEGORY, payload);
        },

        backupInfo: function({commit}) {
            commit(types.BACKUP_INFO_BEGIN);
            InfoService.backupInfos((error) => {
                if (error) {
                    commit(types.BACKUP_INFO_Failed);
                } else {
                    commit(types.BACKUP_INFO_SUCCESS);
                }
            });
        },

        resetBackupInfoStatus: function({commit}) {
            commit(types.RESET_BACKUP_INFO_STATUS);
        },

        restoreInfo: function({commit}) {
            commit(types.RESTORE_INFO_BEGIN);
            InfoService.restoreInfos((error) => {
                if (error) {
                    commit(types.RESTORE_INFO_FAILED);
                } else {
                    commit(types.RESTORE_INFO_SUCCESS);
                }
            });
        },

        resetRestoreInfoStatus: function({commit}) {
            commit(types.RESET_RESTORE_INFO_STATUS);
        },

        reset: function({commit}) {
            commit(types.RESET_VIEW_STATE);
        }
    },

    getters: {
        currentInfosGetter: function(state, getters, rootState) {
            return rootState.info.infos.filter((item) => item.category === state.activeCategory);
        }
    }
};