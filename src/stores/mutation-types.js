export const userTypes = {
    SET_CURRENT_USER: "[User] Set Current",
    RESET_STATE: "[User] Reset State"
};

export const infoTypes = {
    SET_ALL_INFOS: "[Info] Set All Infos",
    SAVE_INFO_TO_LOCAL_BEGIN: "[Info] Save Into To Local Begin",
    SAVE_INFO_TO_LOCAL_SUCCESS: "[Info] Save Into To Local Success",
    SAVE_INFO_TO_LOCAL_FAILED: "[Info] Save Into To Local Failed",
    RESET_SAVE_INFO_TO_LOCAL_STATUS: "[Info] Reset Save Into To Local Status",
    ADD_INFO: "[Info] Add Info",
    UPDATE_INFO: "[Info] Update Info",
    DELETE_INFO: "[Info] Delete Info",
    RESET_STATE: "[Info] Reset State"
};

export const loginViewTypes = {
    USER_LOGIN: "[Login View] Login",
    RESET_USER_LOGIN_STATUS: "[Login View] Reset User Login Status",
    USER_BEGIN_LOGIN: "[Login View] Begin Login",
    USER_LOGIN_SUCCESS: "[Login View] Login Success",
    USER_LOGIN_FAILED: "[Login View] Login Failed",
    RESET_VIEW_STATE: "[Login View] Reset View State"
};

export const infoShowViewTypes = {
    SET_CURRENT_INFO: "[Info Show View] Set Current Info",    
    RESET_VIEW_STATE: "[Info Show View] Reset View State"
};

export const infowListViewTypes = { 
    SET_ACTIVITY_CATEGORY: "[Info List View] Set Activity Category",
    
    LOAD_LOCAL_INFO_BEGIN: "[Info List View] Load Local Info Begin",
    LOAD_LOCAL_INFO_SUCCESS: "[Info List View] Load Local Info Success",
    LOAD_LOCAL_INFO_FAILED: "[Info List View] Load Local Info Failed",
    RESET_LOAD_LOCAL_INFO_STATUS: "[Info List View] Reset Load Local Info Status",    
    
    BACKUP_INFO_BEGIN: "[Info List View] Backup Info Begin",
    BACKUP_INFO_SUCCESS: "[Info List View] Backup Info Success",
    BACKUP_INFO_Failed: "[Info List View] Backup Info Failed",
    RESET_BACKUP_INFO_STATUS: "[Info List View] Reset Backup Info Status",

    RESTORE_INFO_BEGIN: "[Info List View] Restore Info Begin",
    RESTORE_INFO_SUCCESS: "[Info List View] Restore Info SUCCESS",
    RESTORE_INFO_FAILED: "[Info List View] Restore Info Failed",
    RESET_RESTORE_INFO_STATUS: "[Info List View] Reset Restore Info Status",
    
    RESET_VIEW_STATE: "[Info List View] Reset View State"
};

export const infoEditViewTypes = {
    SET_CURRENT_INFO: "[Info Edit View] Set Current Info",
    ADD_DETAIL_ITEM: "[Info Edit View] Add Detail Item",
    UPDATE_DETAIL_ITEM: "[Info Edit View] Update Detail Item",
    DELETE_DETAIL_ITEM: "[Info Edit View] Delete Detail Item",
    RESET_CURRENT_INFO: "[Info Edit View] Reset Current Info",
    RESET_VIEW_STATE: "[Info Edit View] Reset View State"
};

export const infoDetailEditViewTypes = {
    SET_CURRENT_DETAIL_ITEM: "[Info Detail Edit View] Set Current Detail Item",
    RESET_VIEW_STATE: "[Info Detail Edit View] Reset View State"
};