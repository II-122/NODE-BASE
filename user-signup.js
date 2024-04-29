const express = require('express');
const app = express();
app.use(express.json());

let userDB = new Map();
var index = 1;

let user1 = {
    userId : 'id_user1',
    userName : 'user1',
    age : 25
}
let user2 = {
    userId : 'id_user2',
    userName : 'user2',
    age : 26
}
userDB.set(index++, user1);
userDB.set(index++, user2);

app.get('/', (req, res) => {
    res.send('Main Page');
});

app.post('/user', (req, res) => {
    // body 형태
    // {
    //     userID : '',
    //     userName : '',
    //     age : n
    // }
    userDB.set(index++, req.body);
    res.send(`${req.body.userName}님 환영합니다 !`);
});

app.get('/user/:index', function(req, res) {
    // 유저 정보 개별 조회
    let { index } = req.params;
    index = parseInt(index);  // "숫자" -> 숫자
    // 최신버전 개발자 모드에서는 디버깅용으로 페이지가 두 번 렌더링

    const user = userDB.get(index);
    if (user == undefined ){
        res.json({
            message : "존재하지 않는 유저입니다."
        });
    } else {
        res.json({
            userInformation : user
        });
    }
});

app.get('/users', function(req, res){
    // 전체 유저 조회
    let userList = 'User List\n';
    userDB.forEach(element => {
        // console.log(element);
        userList += JSON.stringify(element) + '\n';
        console.log(userList);
    });
    res.send(userList);
});

app.listen(1234);