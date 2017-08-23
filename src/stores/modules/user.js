import StatusCode from "@/configs/status-code-config";
import UserService from "@/services/UserService";
import { userTypes as types } from "../mutation-types";

const initState = {password: ""};

export const userState = {
    state: { ...initState },

    mutations: {
        [types.SET_CURRENT_USER]: function(state, payload) {
            state.password = payload.password;
        },

        [types.RESET_STATE]: function(state) {
            state.password = initState.password;
        }
    },

    actions: {
        setCurrentUser: function({commit}, payload) {
            commit(types.SET_CURRENT_USER, payload);
        },

        reset: function({commit}, payload) {
            commit(types.RESET_STATE);
        }
    },

    getters: {
        currentUserPassword: function(state) {
            return state.password;
        }
    }
};