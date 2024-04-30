// 2024-04-29 create
// 2024-04-30 update

const express = require('express');
const app = express();
app.use(express.json());

let userDB = new Map();

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
userDB.set('id_user1', user1);
userDB.set('id_user2', user2);

app.get('/', (req, res) => {
    res.send('Main Page');
});

app.post('/user', (req, res) => {
    // body 형태
    // {
    //     "userID" : "",
    //     "userName" : "",
    //     "age" : n
    // }
    userDB.set(req.body.userID, req.body);
    res.send(`${req.body.userName}님 환영합니다 !`);
});

app.get('/users/:param_userId', function(req, res) {
    // 유저 정보 개별 조회
    let { param_userId } = req.params;
    // 최신버전 개발자 모드에서는 디버깅용으로 페이지가 두 번 렌더링

    const user = userDB.get(param_userId);
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

// 2024-04-30 수정
app.get('/users', function(req, res){
    // 전체 유저 조회
    
    // let jsonObject = {};
    // userDB.forEach(function(value, key){
    //     jsonObject[key] = value;
    // });
    // res.json(JSON.stringify(jsonObject));
    if(userDB.size == 0){
        res.send("등록된 유저가 없습니다.");
    } else {
        let userList = 'User List\n';
        userDB.forEach(element => {
            userList += JSON.stringify(element) + '\n';
        // console.log(userList);
        });
        res.send(userList);
    }
});

// 2024-04-30
app.put('/users/:param_userId', function(req, res) {
    // 유저 정보 수정 with userID
    let { param_userId } = req.params;
    let user = userDB.get(param_userId);

    if( user == undefined ) {
        res.send(`${param_userId}님의 회원 정보가 DB에 존재하지 않습니다.\n userID 재확인 부탁드립니다.`);
    } else if( user.userID != req.body.userID ){
        res.send("userID는 변경이 불가능합니다!");
    } else {
        let old_userName = user.userName;
        let new_userName = req.body.userName;
        user.userName = new_userName;
        userDB.set(param_userId, user);
        res.send(`${param_userId}님의 회원 정보 ${old_userName}이(가) ${new_userName}(으)로 수정 되었습니다.\n`);
    }
});

// 2024-04-30
app.delete('/users', (req, res) => {
    // 유저 DB 전체 삭제
    if( userDB.size == 0 ) {
        res.send("삭제할 유저 데이터가 존재하지 않습니다.");
    } else {
        userDB.clear();
        res.send("모든 유저 데이터가 삭제 되었습니다.");
    }
});

// 2024-04-30
app.delete('/users/:param_userId', function(req, res) {
    // userId 값을 key로 가진 user 정보 DB에서 삭제
    let { param_userId } = req.params;
    
    // 예외 처리
    if( userDB.get(param_userId) == undefined ) {
        res.send(`${param_userId}님의 회원 정보가 DB에 존재하지 않습니다.\n userID 재확인 부탁드립니다.`);
    } else {
        userDB.delete(param_userId);
        res.send(`${param_userId}님의 회원 정보가 삭제 되었습니다.`);
    }
});

app.listen(1234);