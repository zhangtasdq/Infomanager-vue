export const infoShowViewState = {
    namespaced: true,
    state: {
        currentInfo: null
    },

    mutations: {
        setCurrentInfo: function(state, payload) {
            state.currentInfo = payload.currentInfo;
        },

        resetCurrentInfo: function(state) {
            state.currentInfo = null;
        }
    },

    actions: {
        setCurrentInfo: function({commit}, payload) {
            commit("setCurrentInfo", payload);
        },

        resetCurrentInfo: function({commit}) {
            commit("resetCurrentInfo")
        }
    }
};