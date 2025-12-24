// define commonjs module
function sum(a,b) {
    return a + b;
}

function sub(a,b) {
    return a - b;
}

// export module using commonjs
module.exports = {
    sum,
    sub
}