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
        }
    },

    getters: {
        currentInfosGetter: function(state, getters, rootState) {
            return rootState.info.infos.filter((item) => item.category === state.activeCategory);
        }
    }
};