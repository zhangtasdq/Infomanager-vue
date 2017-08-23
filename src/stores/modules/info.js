import StatusCode from "@/configs/status-code-config";
import InfoService from "@/services/InfoService";
import { infoTypes as types } from "../mutation-types";

const initState = {
    infos: [],
    saveIntoToLocalStatus: null
};

export const infoState = {
    state: { ...initState },

    mutations: {
        [types.SET_ALL_INFOS]: function(state, payload) {
            state.infos = payload.infos;
        },


        [types.ADD_INFO]: function(state, payload) {
            state.infos.push(payload.info);
        },

        [types.UPDATE_INFO]: function(state, payload) {
            let infos = state.infos,
                updateInfo = payload.info;
            
            state.infos = infos.map((item) => item.id === updateInfo.id ? updateInfo : item);
        },

        [types.DELETE_INFO]: function(state, payload) {
            let infos = state.infos,
                deleteId = payload.id;

            state.infos = infos.filter((item) => item.id !== deleteId);
        },

        [types.SAVE_INFO_TO_LOCAL_BEGIN]: function(state) {
            state.saveIntoToLocalStatus = StatusCode.SAVE_INFO_TO_LOCAL_BEGIN;
        },

        [types.SAVE_INFO_TO_LOCAL_FAILED]: function(state) {
            state.saveIntoToLocalStatus = StatusCode.SAVE_INFO_TO_LOCAL_FAILED;
        },

        [types.SAVE_INFO_TO_LOCAL_SUCCESS]: function(state) {
            state.saveIntoToLocalStatus = StatusCode.SAVE_INFO_TO_LOCAL_SUCCESS;
        },

        [types.RESET_SAVE_INFO_TO_LOCAL_STATUS]: function(state) {
            state.saveIntoToLocalStatus = null;
        },

        [types.RESET_STATE]: function(state) {
            state.infos = initState.infos;
            state.saveIntoToLocalStatus = initState.saveIntoToLocalStatus;
        }
    },

    actions: {
        setAllInfos: function({commit}, payload) {
            commit(types.SET_ALL_INFOS, payload);
        },

        addInfo: function({commit}, payload) {
            commit(types.ADD_INFO, payload);
        },

        updateInfo: function({commit}, payload) {
            commit(types.UPDATE_INFO, payload);
        },

        deleteInfo: function({commit}, payload) {
            commit(types.DELETE_INFO, payload);
        },

        saveInfoToLocal: function({commit}, payload) {
            commit(types.SAVE_INFO_TO_LOCAL_BEGIN);
            InfoService.saveInfoToLocal(payload.infos, payload.password, (error, saveStatus) => {
                if (error) {
                    commit(types.SAVE_INFO_TO_LOCAL_FAILED);
                } else {
                    commit(types.SAVE_INFO_TO_LOCAL_SUCCESS);
                }
            });
        },

        resetSaveInfoToLocalStatus: function({commit}) {
            commit(types.RESET_SAVE_INFO_TO_LOCAL_STATUS);
        },

        reset: function({commit}) {
            commit(types.RESET_STATE);
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
                id = parseInt(rootState.route.params.id, 10);
     
            for(let i = 0, j = infos.length; i < j; ++i) {
                if (infos[i].id === id) {
                    return infos[i];
                }
            }
        }
    }
};