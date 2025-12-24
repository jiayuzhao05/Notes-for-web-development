// nodejs module which is written in first line
const path = require('path')
//import math module
const math = require('./math');

// using module method in math module
const rs1 = math.sum(1,2);
const rs2 = math.sub(3,2);

//alert(rs1, rs2)?? alert belongs to window object, running environment is browser,here is node environment, so it will not work.
console.log('rs1', rs1, 'rs2', rs2);

//test nodejs module function 
console.log('==>','path', path.resolve(__dirname, 'math.js'),path.basename('//foo/bar/baz/asdf/quux.html'));
//__dirname: the directory name of the current module
//__filename: the file name of the current module
// node index in terminal