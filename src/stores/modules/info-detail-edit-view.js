import { infoDetailEditViewTypes as types } from "../mutation-types";

const initState = {currentDetailItem: null};

export const infoDetailEditViewState = {
    namespaced: true,
    state: { ...initState },

    mutations: {
        [types.SET_CURRENT_DETAIL_ITEM]: function(state, payload) {
            state.currentDetailItem = payload.detailItem;
        },

        [types.RESET_VIEW_STATE]: function(state) {
            state.currentDetailItem = initState.currentDetailItem;
        }
    },

    actions: {
        setCurrentDetailItem: function({commit}, payload) {
            commit(types.SET_CURRENT_DETAIL_ITEM, payload);
        },

        reset: function({commit}) {
            commit(types.RESET_VIEW_STATE);
        }
    }
};