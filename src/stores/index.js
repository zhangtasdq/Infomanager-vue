import Vuex from "vuex";

import { loginViewState } from "./modules/login-view";
import { userState } from "./modules/user";
import { infoListViewState } from "./modules/info-list-view";
import { infoState } from "./modules/info";


function storeBuilder() {
    return new Vuex.Store({
        modules: {
            user: userState,   
            info: infoState,         
            loginView: loginViewState,
            infoListView: infoListViewState
        }
    });
}
export default storeBuilder;