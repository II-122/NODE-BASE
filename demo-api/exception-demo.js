// 2024-05-01

const express = require('express');
const app = express();

const fruits = [
    { id : 1, name : 'pineapple' },
    { id : 2, name : 'banana' },
    { id : 3, name : 'strawberry' },
    { id : 4, name : 'pitaya' },
    { id : 5, name : 'grape' }
];

app.get('/fruits', (req, res) => {
    // 과일 전체 조회
    res.json(fruits);
});


app.get('/fruits/:id', (req, res) => {
    // 과일 개별 조회
    let id = req.params.id;
    
    // # case 1
    // let fruit = fruits[id-1];

    // # case 2
    // let fruitName = '';
    // fruits.forEach(fruit => {
    //     if(fruit.id == id) {
    //         fruitName = fruit;
    //     }
    // });
    // res.json(fruitName);

    // # case 3
    let fruitName =
        fruits.find(f => f.id == id);
        // fruits 배열 안에 있는 객체 중, id 값이 params.id와 동일한 객체 반환

    // 예외 처리 w. HTTP status code
    if(fruitName != undefined) {
        res.send(fruitName);
    } else {
        res.status(404).send(`id=${id}에 해당하는 과일이 없습니다.`);
    }
});
app.listen(1234);