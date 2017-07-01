import StatusCode from "@/configs/status-code-config";
import UserService from "@/services/UserService";

const SET_CURRENT_USER = "[User] Set Current";
const RESET_CURRENT_USER = "[User] Reset Current";


export const userState = {
    state: {
        password: ""
    },

    mutations: {
        [SET_CURRENT_USER]: function(state, payload) {
            state.password = payload.password;
        },

        [RESET_CURRENT_USER]: function(state) {
            state.password = "";
        }
    },

    actions: {
        setCurrentUser: function({commit}, payload) {
            commit(SET_CURRENT_USER, payload);
        },

        resetCurrentUser: function({commit}, payload) {
            commit(RESET_CURRENT_USER);
        }
    },

    getters: {
        currentUserPassword: function(state) {
            return state.password;
        }
    }
};