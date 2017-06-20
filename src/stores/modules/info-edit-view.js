export const infoEditViewState = {
    namespaced: true,
    state: {
        currentInfo: null
    },

    mutations: {
        setCurrentInfo: function(state, payload) {
            state.currentInfo = payload.currentInfo;
        },

        addDetailItem: function(state, payload) {
            window.world = state.currentInfo;
            state.currentInfo.details.push(payload.detailItem);
        },

        updateDetailItem: function(state, payload) {
            let info = state.currentInfo,
                updateItem = payload.detailItem;

            info.details = info.details.map((item) => item.id === updateItem.id ? updateItem : item);
        },

        deleteDetailItem: function(state, payload) {
            let info = state.currentInfo,
                deleteItem = payload.detailItem;

            info.details = info.details.filter((item) => item.id !== deleteItem.id);
        },

        resetCurrentInfo: function(state) {
            state.currentInfo = null;
        }
    },

    actions: {
        setCurrentInfo: function({commit}, payload) {
            commit("setCurrentInfo", payload);
        },

        addDetailItem: function({commit}, payload) {
            commit("addDetailItem", payload);
        },

        updateDetailItem: function({commit}, payload) {
            commit("updateDetailItem", payload);
        },

        deleteDetailItem: function({commit}, payload) {
            commit("deleteDetailItem", payload);
        },

        resetCurrentInfo: function({commit}) {
            commit("resetCurrentInfo");
        }
    },

    getters: {
    }
};