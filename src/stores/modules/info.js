import StatusCode from "@/configs/status-code-config";
import InfoService from "@/services/InfoService";

export const SET_CURRENT_INFO = "[Info] Set Current";
export const RESET_CURRENT_INFO = "[Info] Reset Current";

const SAVE_INFO_TO_LOCAL_BEGIN = "[Info] Save Into To Local Begin";
const SAVE_INFO_TO_LOCAL_SUCCESS = "[Info] Save Into To Local Success";
const SAVE_INFO_TO_LOCAL_FAILED = "[Info] Save Into To Local Failed";
const RESET_SAVE_INFO_TO_LOCAL_STATUS = "[Info] Reset Save Into To Local Status";



export const infoState = {
    state: {
        infos: [],
        saveIntoToLocalStatus: null
    },

    mutations: {
        setCurrentInfos: function(state, payload) {
            state.infos = payload.infos;
        },

        resetCurrentInfos: function(state) {
            state.infos = [];
        },

        addInfo: function(state, payload) {
            state.infos.push(payload.info);
        },

        updateInfo: function(state, payload) {
            let infos = state.infos,
                updateInfo = payload.info;
            
            state.infos = infos.map((item) => item.id === updateInfo.id ? updateInfo : item);
        },

        deleteInfo: function(state, payload) {
            let infos = state.infos,
                deleteId = payload.id;

            state.infos = infos.filter((item) => item.id !== deleteId);
        },

        [SAVE_INFO_TO_LOCAL_BEGIN]: function(state) {
            state.saveIntoToLocalStatus = StatusCode.SAVE_INFO_TO_LOCAL_BEGIN;
        },

        [SAVE_INFO_TO_LOCAL_FAILED]: function(state) {
            state.saveIntoToLocalStatus = StatusCode.SAVE_INFO_TO_LOCAL_FAILED;
        },

        [SAVE_INFO_TO_LOCAL_SUCCESS]: function(state) {
            state.saveIntoToLocalStatus = StatusCode.SAVE_INFO_TO_LOCAL_SUCCESS;
        },

        [RESET_SAVE_INFO_TO_LOCAL_STATUS]: function(state) {
            state.saveIntoToLocalStatus = null;
        }
    },

    actions: {
        [SET_CURRENT_INFO]: function({commit}, payload) {
            commit("setCurrentInfos", payload);
        },

        [RESET_CURRENT_INFO]: function({commit}, payload) {
            commit("resetCurrentInfos");
        },

        addInfo: function({commit}, payload) {
            commit("addInfo", payload);
        },

        updateInfo: function({commit}, payload) {
            commit("updateInfo", payload);
        },

        deleteInfo: function({commit}, payload) {
            commit("deleteInfo", payload);
        },

        saveInfoToLocal: function({commit}, payload) {
            commit(SAVE_INFO_TO_LOCAL_BEGIN);
            InfoService.saveInfoToLocal(payload.infos, payload.password, (error, saveStatus) => {
                if (error) {
                    commit(SAVE_INFO_TO_LOCAL_FAILED);
                } else {
                    commit(SAVE_INFO_TO_LOCAL_SUCCESS);
                }
            });
        },

        resetSaveInfoToLocalStatus: function({commit}) {
            commit(RESET_SAVE_INFO_TO_LOCAL_STATUS);
        }
    },

    getters: {
        allCategories: function(state) {
            let results = [];

            state.infos.forEach((item) => {
                if (results.indexOf(item.category) === -1) {
                    results.push(item.category);
                }
            });
            
            return results;
        },

        allInfos: function(state) {
            return state.infos;
        },

        saveIntoToLocalStatusGetter: function(state) {
            return state.saveIntoToLocalStatus;
        },

        getInfoByRouteParam: function(state, getters, rootState) {
            let infos = state.infos,
                id = rootState.route.params.id;
     
            for(let i = 0, j = infos.length; i < j; ++i) {
                if (infos[i].id === id) {
                    return infos[i];
                }
            }
        }
    }
};