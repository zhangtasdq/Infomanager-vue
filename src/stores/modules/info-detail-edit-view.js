export const infoDetailEditViewState = {
    namespaced: true,
    state: {
        currentDetailItem: null
    },

    mutations: {
        setCurrentDetailItem: function(state, payload) {
            state.currentDetailItem = payload.detailItem;
        }
    },

    actions: {
        setCurrentDetailItem: function({commit}, payload) {
            commit("setCurrentDetailItem", payload);
        }
    },

    getters: {
    }
};