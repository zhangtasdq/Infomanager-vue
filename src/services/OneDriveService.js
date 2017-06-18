
import StatusCode from "@/configs/status-code-config";

class OneDriveService {
    isFileExist(fileName, clientId, scope, callback) {
        this._getOneDriveTool().isFileExists(fileName, clientId, scope, (fileExistError, isExist) => {
            if (fileExistError) {
                callback(fileExistError);
            } else {
                if (isExist) {
                    callback(null, StatusCode.FILE_EXIST);
                } else {
                    callback(null, StatusCode.FILE_NOT_EXIST);
                }
            }
        });
    }

    uploadFile(fileName, content, clientId, scope, callback) {
        this._getOneDriveTool().saveFile(fileName, content, clientId, scope, (error) => {
            if (error) {
                callback(error, StatusCode.UPLOAD_FILE_FAILED);
            } else {
                callback(null, StatusCode.UPLOAD_FILE_SUCCESS);
            }
        });
    }

    downloadFile(fileName, clientId, scope, callback) {
        this.getOneDriveTool().downloadFile(fileName, clientId, scope, (error, data) => {
            if (error) {
                callback(error, StatusCode.DOWNLOAD_FILE_FAILED);
            } else {
                callback(null, StatusCode.DOWNLOAD_FILE_SUCCESS, data);
            }
        });
    }

    _getOneDriveTool() {
        return cordova.plugins.OneDriveTool;
    }
}

export default new OneDriveService();