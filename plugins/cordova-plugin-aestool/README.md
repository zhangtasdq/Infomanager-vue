cordova-plugin-aestool
===
> Simple API to perform AES encryption on cordova，
> Just a simple encapsulation of `AESCrypt-Android`

Example
---

### encryption
```javaScript
let Aestool = cordova.plugins.Aestool;

Aestool.encrypt(password, content, (error, data) => {
    if (error) {
        ....
    } else {
        ....
    }
});
```

### Decrypted

```javaScript
let Aestool = cordova.plugins.Aestool;

Aestool.decrypt(password, content, (error, data) => {
    if (error) {
        ....
    } else {
        ....
    }
});
```

Thanks
---
[AESCrypt-Android](https://github.com/scottyab/AESCrypt-Android)
