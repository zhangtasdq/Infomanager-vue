import StatusCode from "@/configs/status-code-config";

class AesService {
    decrypt(password, content, callback) {
        this._getAesTool().decrypt(password, content, (error, data) => {
            if (error) {
                callback(error, StatusCode.DECRYPT_FAILED);
            } else {
                callback(null, StatusCode.DECRYPT_SUCCESS, data);
            }
        });

    }

    encrypt(password, content, callback) {
        this._getAesTool().encrypt(password, content, (error, data) => {
            if (error) {
                callback(error, StatusCode.ENCRYPT_FAILED);
            } else {
                callback(null, StatusCode.ENCRYPT_SUCCESS, data);
            }
        });
    }

    _getAesTool() {
        return cordova.plugins.Aestool;
    }
}

export default new AesService();