// 2024-04-29 create
// 2024-05-01 update

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

// # GET
app.get('/', (req, res) => {
    // 메인
    res.status(200).send('Main Page');
});

app.get('/users/:param_userId', function(req, res) {
    // 유저 정보 개별 조회
    let { param_userId } = req.params;
    // 최신버전 개발자 모드에서는 디버깅용으로 페이지가 두 번 렌더링

    const user = userDB.get(param_userId);
    if (user == undefined ){
        res.status(404).send("존재하지 않는 유저입니다.");
    } else {
        res.status(200).json({ userInformation : user });
    }
});

app.get('/users', function(req, res){
    // 전체 유저 정보 조회
    
    // let jsonObject = {};
    // if(userDB.size != 0) {
    //     userDB.forEach(function(value, key){
    //         jsonObject[key] = value;
    //     });
    //     res.status(200).json(jsonObject);
    // } else {
    //     res.status(404).send("등록된 유저가 없습니다.");
    // }

    if(userDB.size == 0){
        res.status(404).send("등록된 유저가 없습니다.");
    } else {
        let userList = 'User List\n';
        userDB.forEach(element => {
            userList += JSON.stringify(element) + '\n';
        // console.log(userList);
        });
        res.status(200).send(userList);
    }
});

// # POST
app.post('/user', (req, res) => {
    // 유저 등록

    // body 형태
    // {
    //     "userID" : "",
    //     "userName" : "",
    //     "age" : n
    // }
    const param_userName = req.body.userName;
    if(param_userName) {
        userDB.set(req.body.userID, req.body);
        res.status(201).send(`${param_userName}님 환영합니다 !`);
    } else {
        res.status(400).send("오류! 요청 값을 다시 확인해주세요.");
    }
    
});

// # PUT
app.put('/users/:param_userId', function(req, res) {
    // 유저 정보 수정 with userID
    let { param_userId } = req.params;
    let user = userDB.get(param_userId);

    if( user == undefined ) {
        res.status(404).send(`${param_userId}님의 회원 정보가 DB에 존재하지 않습니다.\n userID 재확인 부탁드립니다.`);
    } else if( user.userID != req.body.userID ){
        res.status(406).send("userID는 변경이 불가능합니다!");
    } else {
        let old_userName = user.userName;
        let new_userName = req.body.userName;
        user.userName = new_userName;
        userDB.set(param_userId, user);
        res.status(200).send(`${param_userId}님의 회원 정보 ${old_userName}이(가) ${new_userName}(으)로 수정 되었습니다.\n`);
    }
});

// # DELETE
app.delete('/users', (req, res) => {
    // 유저 DB 전체 삭제
    if( userDB.size == 0 ) {
        res.status(404).send("삭제할 유저 데이터가 존재하지 않습니다.");
    } else {
        userDB.clear();
        res.status(200).send("모든 유저 데이터가 삭제 되었습니다.");
    }
});

app.delete('/users/:param_userId', function(req, res) {
    // userId 값을 key로 가진 user 정보 DB에서 삭제
    let { param_userId } = req.params;
    
    if( userDB.get(param_userId) == undefined ) {
        res.status(404).send(`${param_userId}님의 회원 정보가 DB에 존재하지 않습니다.\n userID 재확인 부탁드립니다.`);
    } else {
        userDB.delete(param_userId);
        res.status(200).send(`${param_userId}님의 회원 정보가 삭제 되었습니다.`);
    }
});

app.listen(1234);