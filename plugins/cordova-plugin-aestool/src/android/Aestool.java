package cordova.plugin.aestool;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import com.scottyab.aescrypt.AESCrypt;
import java.security.GeneralSecurityException;
/**
 * This class echoes a string called from JavaScript.
 */
public class Aestool extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        String password = args.getString(0);
        String content = args.getString(1);

        if (action.equals("decrypt")) {
            this.decrypt(password, content, callbackContext);
        } else if (action.equals("encrypt")) {
            this.encrypt(password, content, callbackContext);
        }
        return false;
    }

    private void decrypt(String password, String content, CallbackContext callback) {
        try {
            String data = AESCrypt.decrypt(password, content);
            callback.success(data);
        } catch (GeneralSecurityException e) {
            callback.error(e.getMessage());
            e.printStackTrace();
        }
    }


    private void encrypt(String password, String content, CallbackContext callback) {
        try {
            String data = AESCrypt.encrypt(password, content);
            callback.success(data);
        } catch (GeneralSecurityException e) {
            callback.error(e.getMessage());
            e.printStackTrace();
        }
    }
}
