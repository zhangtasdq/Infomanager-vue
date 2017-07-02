import { infoShowViewTypes as types } from "../mutation-types";

const initState = {currentInfo: null};

export const infoShowViewState = {
    namespaced: true,
    state: { ...initState },

    mutations: {
        [types.SET_CURRENT_INFO]: function(state, payload) {
            state.currentInfo = payload.currentInfo;
        },

        [types.RESET_VIEW_STATE]: function(state) {
            state.currentInfo = initState.currentInfo;
        }
    },

    actions: {
        setCurrentInfo: function({commit}, payload) {
            commit(types.SET_CURRENT_INFO, payload);
        },

        reset: function({commit}) {
            commit(types.RESET_VIEW_STATE);
        }
    }
};