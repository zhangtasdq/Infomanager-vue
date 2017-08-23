let EMPTY_VALUE = ["", null, undefined];

const PADDING_CHARS = ['`', '~', '(', ')', ':', '"', ',', '!', '@', '+', 'a', 'c',
                      'd', '.', '\\', 'w', 'r', 'p', 'l', 'e', '=', '&', '^', '$',
                      '#', '?', '>', '<', ';', '{', 'y', 'v', 'm', 'i', 'g', 'h',
                      'H', 'P', 'S', 'Q', '}', '|', '[', ']', '*', '%', 'X', 'Z',
                      'S', 'J'];

/**
 * 填充密码，如果密码长度已经大小最小长度则不进行填充
 * @param {String} password - 需要进行填充的密码
 * @param {Integer} minLength - 最小的密码长度
 */
function paddingPassword(password, minLength) {
    if (password.length >= minLength) {
        return password;
    }

    let paddingCount = minLength - password.length,
        leftCount = Math.floor(paddingCount / 2),
        rightCount = minLength - password.length - leftCount;

    for(let i = 0; i < leftCount; ++i) {
        password = PADDING_CHARS[i % PADDING_CHARS.length] + password;
    }

    for(let i = 0; i < rightCount; ++i) {
        password = password + PADDING_CHARS[i % PADDING_CHARS.length];
    }

    return password;
}

function isEmpty(value) {
    return EMPTY_VALUE.indexOf(value) !== -1;
}

export {
    isEmpty,
    paddingPassword
}