import StatusCode from "@/configs/status-code-config";

class FileService {
    isFileExist(fileName, callback) {
        this._getFs((fsError, fs) => {
            if (fsError) {
                callback(fsError, StatusCode.CHEKC_FILE_EXIST_FAILED);
            } else {
                fs.root.getFile(this.buildFilePath(fileName), {create: false}, () => {
                    callback(null, StatusCode.FILE_EXIST);
                }, () => {
                    callback(null, StatusCode.FILE_NOT_EXIST);
                });
            }
        });
    }

    getFileContent(fileName, callback) {
        this._getFileEntry(this.buildFilePath(fileName), (fileEntryError, fileEntry) => {
            if (fileEntryError) {
                callback(fileEntryError, StatusCode.GET_FILE_CONTENT_FAILED);
            } else {
                fileEntry.file((file) => {
                    let reader = new FileReader();

                    reader.onloadend = function() {
                        callback(null, StatusCode.GET_FILE_CONTENT_SUCCESS, this.result);
                    };
                    reader.readAsText(file);
                });
            }
        });
    }

    saveFileContent(fileName, data, callback) {
        this._getFileEntry(this.buildFilePath(fileName), (fileEntryError, fileEntry) => {
            console.log(data);
            if (fileEntryError) {
                callback(fileEntryError, StatusCode.SAVE_FILE_FAILED);
            } else {
                fileEntry.createWriter((writer) => {
                    writer.onwriteend = function() {
                        console.log("save success");
                        callback(null, StatusCode.SAVE_FILE_SUCCESS);
                    };

                    writer.onerror = function(writeError) {
                        console.log("save failed");
                        callback(writeError, StatusCode.SAVE_FILE_FAILED);
                    };
                    writer.write(data);
                });
            }

        });
    }

    buildFilePath(fileName) {
        return fileName;
    }

    getAppPath() {
        return cordova.file.dataDirectory;
    }

    _getFileEntry(fileName, callback) {
        this._getFs((fsError, fs) => {
            if (fsError) {
                callback(fsError);
            } else {
                fs.root.getFile(fileName, {create: true, exclusive: false}, (fileEntry) => {
                    callback(null, fileEntry);
                }, (error) => {
                    callback(error);
                });
            }
            
        });
    }

    _getFs(callback) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            callback(null, fs);
        }, (error) => {
            console.log(error);
            callback(error);
        });
    }
}

export default new FileService();