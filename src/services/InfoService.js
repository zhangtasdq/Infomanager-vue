import FileService from "./FileService";
import AesService from "./AesService";
import OneDriveService from "./OneDriveService";
import AppConfig from "@/configs/app-config";
import StatusCode from "@/configs/status-code-config";

import Info from "@/models/Info";
import InfoDetail from "@/models/InfoDetail";

class InfoService {
    constructor() {
        this.infoFileName = AppConfig.infoFileName;
        this.oneDriveClientId = AppConfig.oneDriveClientId;
        this.oneDriveScope = AppConfig.oneDriveScope;
    }

    loadLocalInfo(password, callback) {
        FileService.isFileExist(this.infoFileName, (checkFileExistError, checkFileExistStatusCode) => {
            if (checkFileExistError) {
                return callback(checkFileExistError, StatusCode.LOAD_LOCAL_INFO_FAILED);
            }

            if (checkFileExistStatusCode === StatusCode.FILE_NOT_EXIST) {
                return callback(null, StatusCode.LOAD_LOCAL_INFO_SUCCESS, []);
            }
            
            FileService.getFileContent(this.infoFileName, (getContentError, getContentStatusCode, fileContent) => {
                if (getContentError) {
                    return callback(getContentError, StatusCode.LOAD_LOCAL_INFO_FAILED);
                }
                if (!fileContent) {
                    return callback(null, StatusCode.LOAD_LOCAL_INFO_SUCCESS, []);
                }

                AesService.decrypt(password, fileContent, (decryptError, decryptStatusCode, decryptContent) => {
                    if (decryptError) {
                        return callback(decryptError, StatusCode.LOAD_LOCAL_INFO_FAILED);
                    } 
                    callback(null, StatusCode.LOAD_LOCAL_INFO_SUCCESS, JSON.parse(decryptContent));
                });
            });
        });
    }

    saveInfoToLocal(infos, password, callback) {
        let infoStr = JSON.stringify(infos);
        AesService.encrypt(password, infoStr, (encryptError, encryptStatus, encryptData) => {
            if (encryptError) {
                callback(encryptError, StatusCode.SAVE_INFO_TO_LOCAL_FAILED);
            }

            FileService.saveFileContent(this.infoFileName, encryptData, (saveFileError, saveFileStatus) => {
                if (saveFileError) {
                    callback(saveFileError, StatusCode.SAVE_INFO_TO_LOCAL_FAILED);
                } else {
                    callback(null, StatusCode.SAVE_INFO_TO_LOCAL_SUCCESS);
                }
            });
        });
    }

    restoreInfos(callback) {
        OneDriveService.isFileExist(this.infoFileName, this.oneDriveClientId, this.oneDriveScope, (fileExistError, statusCode) => {
            if (fileExistError) {
                callback(fileExistError, StatusCode.RESTORE_INFO_FAILED);
            } else if (statusCode === StatusCode.FILE_NOT_EXIST) {
                callback(null, StatusCode.RESTORE_INFO_SUCCESS);
            } else {
                OneDriveService.downloadFile(this.infoFileName, this.oneDriveClientId, this.oneDriveScope, 
                        (downloadError, downloadStatusCode, downloadData) => {
                    if (downloadError) {
                        callback(downloadError, StatusCode.RESTORE_INFO_FAILED);
                    } else {
                        FileService.saveFileContent(this.infoFileName, downloadData, (saveError) => {
                            if (saveError) {
                                callback(saveError, StatusCode.RESTORE_INFO_FAILED);
                            } else {
                                callback(null, StatusCode.RESTORE_INFO_SUCCESS);
                            }
                        });
                    }
                });
            }
        });
    }

    backupInfos(callback) {
        FileService.isFileExist(this.infoFileName, (fileExistError, fileExistStatus) => {
            if (fileExistError) {
                return callback(fileExistError, StatusCode.BACKUP_INFO_FAILED);
            }
            if (fileExistStatus === StatusCode.FILE_NOT_EXIST) {
                return callback(null, StatusCode.BACKUP_INFO_SUCCESS);
            }

            FileService.getFileContent(this.infoFileName, (getFileError, getFileStatus, fileContent) => {
                if (getFileError) {
                    callback(getFileError, StatusCode.BACKUP_INFO_FAILED);
                } else {
                    OneDriveService.uploadFile(this.infoFileName, fileContent, this.oneDriveClientId, this.oneDriveScope, 
                            (uploadError, uploadStatus) => {
                        if (uploadError) {
                            callback(uploadError, StatusCode.BACKUP_INFO_FAILED);
                        } else {
                            callback(null, StatusCode.BACKUP_INFO_SUCCESS);
                        }
                    })
                }
            });
        });
    }

    buildEmptyInfo() {
        return new Info("", "", []);
    }

    buildEmptyInfoDetail() {
        return new InfoDetail("", "");
    }
}

export default new InfoService();