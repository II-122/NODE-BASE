// 2024-05-01 create

const express = require('express');
const app = express();
app.use(express.json());

let userDB = new Map();

// # GET
app.get('/users/:param_userID', (req, res) => {
    // [개인] 유저 정보 조회
    let { param_userID } = req.params;

    const user = userDB.get(param_userID);
    if (user == undefined ){
        res.status(404).send("해당 ID의 회원은 존재하지 않습니다.");
    } else {
        res.status(200).send(`회원 ID : ${user.userID}\n회원 닉네임 : ${user.userName}`);
    }
});

// # POST
app.post('/login', (req, res) => {
    // 로그인

    // body 형태
    // {
    //     "userID" : "",
    //     "userPW" : ""
    // }
    res.end();
});

app.post('/join', (req, res) => {
    // 회원 가입

    // body 형태
    // {
    //     "userID" : "",
    //     "userPW" : "",
    //     "userName" : ""
    // }

    /* userID를 key값으로 사용,
       userID 중복에 대한 예외 처리 필요 */
    const param_userID = req.body.userID;
    const param_userPW = req.body.userPW;
    const param_userName = req.body.userName;
    if(param_userID && param_userPW && param_userName) {
        let dup = 0;
        if(userDB.size > 0) {   // userDB is not empty
            // 아이디 중복 검사
            userDB.forEach((value, key) => {
                if(key == param_userID) { dup = 1; }    // 중복된 ID가 존재
            });
        }
        
        if(dup == 1) {  // 중복된 ID를 가진 회원이 존재하는 경우
            res.status(400).send("같은 ID를 가진 회원이 이미 존재합니다.\n 다른 ID를 입력해주세요.");
        } else {
            userDB.set(param_userID, req.body);  // key : userID
            console.log(userDB);
            res.status(201).send(`${param_userName}님 가입을 환영합니다 !`);
        }
    } else { // 회원 가입에 필요한 데이터 값 부족
        res.status(400).send("오류! 가입 정보 입력란이 비어있는지 확인해주세요.");
    }
});

// # PUT
app.put('/users/:param_userID', (req, res) => {
    // 회원 정보 수정
    res.end();
});

// # DELETE
app.delete('/users/:param_userID', (req, res) => {
    // 회원 탈퇴
    let { param_userID } = req.params;
    
    if(userDB.get(param_userID) == undefined) { // 해당 회원 존재 x
        res.status(404).send(`${param_userID}님의 회원 정보가 존재하지 않습니다.\n userID 재확인 부탁드립니다.`);
    } else {
        userDB.delete(param_userID);
        console.log(userDB);
        res.status(200).send(`${param_userID}님의 회원 탈퇴가 완료되었습니다.`);
    }
});


app.listen(1234);