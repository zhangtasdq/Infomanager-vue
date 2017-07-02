import { infoEditViewTypes as types } from "../mutation-types";

const initState = {currentInfo: null};

export const infoEditViewState = {
    namespaced: true,
    state: { ...initState },

    mutations: {
        [types.SET_CURRENT_INFO]: function(state, payload) {
            state.currentInfo = payload.currentInfo;
        },

        [types.ADD_DETAIL_ITEM]: function(state, payload) {
            window.world = state.currentInfo;
            state.currentInfo.details.push(payload.detailItem);
        },

        [types.UPDATE_DETAIL_ITEM]: function(state, payload) {
            let info = state.currentInfo,
                updateItem = payload.detailItem;

            info.details = info.details.map((item) => item.id === updateItem.id ? updateItem : item);
        },

        [types.UPDATE_DETAIL_ITEM]: function(state, payload) {
            let info = state.currentInfo,
                deleteItem = payload.detailItem;

            info.details = info.details.filter((item) => item.id !== deleteItem.id);
        },

        [types.RESET_CURRENT_INFO]: function(state) {
            state.currentInfo = null;
        },

        [types.RESET_VIEW_STATE]: function(state) {
            state.currentInfo = initState.currentInfo;
        }
    },

    actions: {
        setCurrentInfo: function({commit}, payload) {
            commit(types.SET_CURRENT_INFO, payload);
        },

        addDetailItem: function({commit}, payload) {
            commit(types.ADD_DETAIL_ITEM, payload);
        },

        updateDetailItem: function({commit}, payload) {
            commit(types.UPDATE_DETAIL_ITEM, payload);
        },

        deleteDetailItem: function({commit}, payload) {
            commit(types.DELETE_DETAIL_ITEM, payload);
        },

        resetCurrentInfo: function({commit}) {
            commit(types.RESET_CURRENT_INFO);
        },

        reset: function({commit}) {
            commit(types.RESET_VIEW_STATE);
        }
    }
};