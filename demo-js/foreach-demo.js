// 2024-04-30

const arr = [1, 2, 3];
let map = new Map([['a', 123], ['b', 234], ['c', 345]]);


arr.forEach((element, index, a)=>{
    // 객체 (또는 배열)에서 요소를 하나 꺼낸 다음 불리는 콜백 함수
    console.log(`값 : ${element}, 인덱스 : ${index}, 객체 : ${a}`);
});
// 출력
// 값 : 1, 인덱스 : 0, 객체 : 1,2,3
// 값 : 2, 인덱스 : 1, 객체 : 1,2,3
// 값 : 3, 인덱스 : 2, 객체 : 1,2,3

map.forEach(function(value, key, m){ 
    console.log(`값 : ${value}, 키 : ${key}, map : ${m}`);
});
// 출력
// 값 : 123, 키 : a, map : [object Map]
// 값 : 234, 키 : b, map : [object Map]
// 값 : 345, 키 : c, map : [object Map]

