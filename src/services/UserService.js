import AppConfig from "@/configs/app-config";
import StatusCode from "@/configs/status-code-config";
import { paddingPassword } from "@/tools";

import FileService from "./FileService";
import AesService from "./AesService";

class UserService {
    login(password, callback) {
        let infoFileName = AppConfig.infoFileName,
            actualPassword = paddingPassword(password, AppConfig.passwordLength);
        
        FileService.isFileExist(infoFileName, (fileExistError, existStatusCode) => {
            if (fileExistError) {
                return callback(fileExistError, StatusCode.LOGIN_FAILED);
            }
            if (existStatusCode === StatusCode.FILE_NOT_EXIST) {
                return callback(null, StatusCode.LOGIN_SUCCESS, actualPassword);
            }

            FileService.getFileContent(infoFileName, (contentError, contentCode, content) => {
                if (contentError) {
                    return callback(contentError, StatusCode.LOGIN_FAILED);
                }

                AesService.decrypt(actualPassword, content, (decryptError, decryptStatus) => {
                    if (decryptError) {
                        callback(decryptError, StatusCode.LOGIN_FAILED);
                    } else {
                        callback(null, StatusCode.LOGIN_SUCCESS, actualPassword);
                    }
                })
            });
        });
    }
}

export default new UserService;