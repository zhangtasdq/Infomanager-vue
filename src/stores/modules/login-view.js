import StatusCode from "@/configs/status-code-config";
import UserService from "@/services/UserService";

export const USER_BEGIN_LOGIN = "[User] Begin Login";
export const USER_LOGIN_SUCCESS = "[User] Login Success";
export const USER_LOGIN_FAILED = "[User] Login Failed";
export const RESET_USER_LOGIN_STATUS = "[User] Reset Login Status";


export const loginViewState = {
    namespaced: true,
    state: {
        loginStatus: null,
        password: ""
    },

    mutations: {
        [USER_BEGIN_LOGIN]: function(state) {
            state.loginStatus = StatusCode.BEGIN_LOGIN;
        },

        [USER_LOGIN_FAILED]: function(state) {
            state.loginStatus = StatusCode.LOGIN_FAILED
        },

        [USER_LOGIN_SUCCESS]: function(state, payload) {
            state.loginStatus = StatusCode.LOGIN_SUCCESS;
            state.password = payload.password;
        },

        [RESET_USER_LOGIN_STATUS]: function(state) {
            state.loginStatus = null;
            state.password = "";
        }
    },

    actions: {
        login: function({commit}, payload) {
            commit(USER_BEGIN_LOGIN);

            UserService.login(payload.password, (error, status, paddingPassword) => {
                if (error || (status === StatusCode.LOGIN_FAILED)) {
                    commit(USER_LOGIN_FAILED);
                } else {
                    commit(USER_LOGIN_SUCCESS, {password: paddingPassword})
                }
            });
        },

        reset: function({commit}) {
            commit(RESET_USER_LOGIN_STATUS);
        }
    }
};