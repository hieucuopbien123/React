var a = 1;
var b = a;//copy mà
b = b + 1;
console.log("CHECK");
console.log(a, " ", b);
function testFun(a){
    a++;
}
testFun(a);
console.log(a);//k đổi a, copy hết