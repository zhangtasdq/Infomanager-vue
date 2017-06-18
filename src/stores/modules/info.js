export const SET_CURRENT_INFO = "[Info] Set Current";
export const RESET_CURRENT_INFO = "[Info] Reset Current";


export const infoState = {
    state: {
        infos: []
    },

    mutations: {
        setCurrentInfos: function(state, payload) {
            state.infos = payload.infos;
        },

        resetCurrentInfos: function(state) {
            state.infos = [];
        }
    },

    actions: {
        [SET_CURRENT_INFO]: function({commit}, payload) {
            commit("setCurrentInfos", payload);
        },

        [RESET_CURRENT_INFO]: function({commit}, payload) {
            commit("resetCurrentInfos");
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
        }
    }
};