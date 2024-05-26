// 2024-05-02

let x = {};
let y = { msg : "is not empty" };
let num = 5;
let str = "random string";
let str_empty = "";

function isEmpty(obj) {
    if(Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
};

console.log(Object.keys(x));
console.log(Object.keys(y));
// 출력 결과
// []
// [ 'msg' ]

console.log(isEmpty(x));   // true
console.log(isEmpty(y));   // false
// console.log(Object.keys(num).length === 0); // true  =>  논리 오류 - 사용 불가
console.log(isEmpty(str)); // false
console.log(isEmpty(str_empty)); // true

// 변수가 객체인지 확인
let temp = "Object?";
if(temp.constructor === Object){
    console.log(`Object`);
} else {
    console.log(`not Object`);
}