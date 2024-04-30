// 2024-04-30

const arr = [1, 2, 3, 4, 5];

let temp_arr1 = arr.forEach((element) => {
    return element * 2;
});

let temp_arr2 = arr.map((value) => {
    return value * 3;
});

console.log(temp_arr1); // 출력 > undefined
console.log(temp_arr2); // 출력 > [ 3, 6, 9, 12, 15 ]
