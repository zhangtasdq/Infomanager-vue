let EMPTY_VALUE = ["", null, undefined];

function isEmpty(value) {
    return EMPTY_VALUE.indexOf(value) !== -1;
}

export {
    isEmpty
}