import StatusCode from "@/configs/status-code-config";

class FileService {
    isFileExist(fileName, callback) {
        this._getFileTool().checkFile(this.getAppPath(), fileName).then((exists) => {
            callback(null, StatusCode.FILE_EXIST);
        }).catch((error) => {
            if (this.isFileNotExistError(error)) {
                callback(null, StatusCode.FILE_NOT_EXIST);
            } else {
                callback(error, StatusCode.CHEKC_FILE_EXIST_FAILED);
            }
        });
    }

    getFileContent(fileName, callback) {
        this._getFileTool().readAsText(this.getAppPath(), fileName).then((data) => {
            callback(null, StatusCode.GET_FILE_CONTENT_SUCCESS, data);
        }).catch((error) => {
            callback(error, StatusCode.GET_FILE_CONTENT_FAILED);
        });
    }

    saveFileContent(fileName, data, callback) {
        this._getFileTool().writeFile(this.getAppPath(), fileName, data, {append: false, replace: true}).then(() => {
            callback(null, StatusCode.SAVE_FILE_SUCCESS);
        }).catch((error) => {
            callback(error, StatusCode.SAVE_FILE_FAILED);
        });
    }

    getAppPath() {
        return this._getFileTool().dataDirectory;
    }

     isFileNotExistError(error) {
        return error.message === this._getFileTool().cordovaFileError[1];
    }

    _getFileTool() {
        return cordova.plugins.File;
    }
}

export default new FileService();