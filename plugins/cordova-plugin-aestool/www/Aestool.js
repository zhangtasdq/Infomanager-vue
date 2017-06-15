var exec = require('cordova/exec');

exports.decrypt = function(password, content, callback) {
    exec(function(content) {
             callback(null, content)
         },
         function(error) {
             callback(error)
         },
         "Aestool",
         "decrypt",
         [password, content]
     );
}

exports.encrypt = function (password, content, callback) {
    exec(function(content) {
             callback(null, content)
         },
         function(error) {
             callback(error)
         },
         "Aestool",
         "encrypt",
         [password, content]
     );
}
