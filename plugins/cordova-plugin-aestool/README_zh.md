cordova-plugin-aestool
===
> 使用 Aes 加密码数据的 cordova 插件，
> 只是对 `AESCrypt-Android` 的一个简单封装

使用
---

### 加密
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

### 解密

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

感谢
---
[AESCrypt-Android](https://github.com/scottyab/AESCrypt-Android)
