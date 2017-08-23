import Vuex from "vuex";

import { loginViewState } from "./modules/login-view";
import { userState } from "./modules/user";
import { infoListViewState } from "./modules/info-list-view";
import { infoState } from "./modules/info";
import { infoEditViewState } from "./modules/info-edit-view";
import { infoDetailEditViewState } from "./modules/info-detail-edit-view";
import { infoShowViewState } from "./modules/info-show-view";


function storeBuilder() {
    return new Vuex.Store({
        modules: {
            user: userState,   
            info: infoState,         
            loginView: loginViewState,
            infoListView: infoListViewState,
            infoEditView: infoEditViewState,
            infoDetailEditView: infoDetailEditViewState,
            infoShowView: infoShowViewState
        }
    });
}
export default storeBuilder;