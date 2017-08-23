import StatusCode from "@/configs/status-code-config";
import UserService from "@/services/UserService";
import { loginViewTypes as types } from "../mutation-types";

const initState = {
    loginStatus: null,
    password: ""
}

export const loginViewState = {
    namespaced: true,
    state: { ...initState },

    mutations: {
        [types.USER_BEGIN_LOGIN]: function(state) {
            state.loginStatus = StatusCode.BEGIN_LOGIN;
        },

        [types.USER_LOGIN_FAILED]: function(state) {
            state.loginStatus = StatusCode.LOGIN_FAILED
        },

        [types.USER_LOGIN_SUCCESS]: function(state, payload) {
            state.loginStatus = StatusCode.LOGIN_SUCCESS;
            state.password = payload.password;
        },

        [types.RESET_USER_LOGIN_STATUS]: function(state) {
            state.loginStatus = null;
            state.password = "";
        },

        [types.RESET_VIEW_STATE]: function(state) {
            state.loginStatus = initState.loginStatus;
            state.password = initState.password;
        }
    },

    actions: {
        userLogin: function({commit}, payload) {
            commit(types.USER_BEGIN_LOGIN);

            UserService.login(payload.password, (error, status, paddingPassword) => {
                if (error || (status === StatusCode.LOGIN_FAILED)) {
                    commit(types.USER_LOGIN_FAILED);
                } else {
                    commit(types.USER_LOGIN_SUCCESS, {password: paddingPassword})
                }
            });
        },

        resetUserLoginStatus: function({commit}) {
            commit(types.RESET_USER_LOGIN_STATUS);
        },

        reset: function({commit}) {
            commit(types.RESET_VIEW_STATE);
        }
    },

    getters: {
        currentPasswordGetter: function(state) {
            return state.password;
        }
    }
};