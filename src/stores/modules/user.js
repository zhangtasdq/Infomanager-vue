import StatusCode from "@/configs/status-code-config";
import UserService from "@/services/UserService";

export const SET_CURRENT_USER = "[User] Set Current";
export const RESET_CURRENT_USER = "[User] Reset Current";


export const userState = {
    state: {
        password: ""
    },

    mutations: {
        setCurrentUser: function(state, payload) {
            state.password = payload.password;
        },

        resetCurrentUser: function(state) {
            state.password = "";
        }
    },

    actions: {
        [SET_CURRENT_USER]: function({commit}, payload) {
            commit("setCurrentUser", payload);
        },

        [RESET_CURRENT_USER]: function({commit}, payload) {
            commit("resetCurrentUser");
        }
    },

    getters: {
        currentUserPassword: function(state) {
            return state.password;
        }
    }
};