// 2024-05-01 create
// 2024-05-15 update

const express = require('express');
// const app = express();
const conn = require('../mysql2.js');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router.post('/login', (req, res) => {
    // 로그인
    const { users_email, users_password } = req.body;

    let sql = `SELECT * FROM users WHERE users_email = ?`;
    conn.query(sql, users_email,
        function(err, results, fields) {
            let loginUser = results[0];

            if(loginUser && loginUser.users_password == users_password){
                // token 발급
                const token = jwt.sign({
                    email : loginUser.users_email,
                    name : loginUser.users_name
                }, process.env.PRIVATE_KEY, { expiresIn : '30m' });

                res.cookie("token", token, { httpOnly : true });

                res.status(200).json({
                    message : `로그인 성공\n${loginUser.users_name}님 안녕하세요.`,
                });
            } else {
                res.status(403).json({
                    message : "이메일 또는 비밀번호를 확인해주세요."
                });
            }
        }
    );
});

router.post('/join', (req, res) => {
    // 회원 가입

    // 유저 email 중복에 대한 처리 코드 필요
    if (req.body == {}) {
        res.status(400).send("오류! 가입 정보 입력란이 비어있는지 확인해주세요.");
    } else {
        const { users_email, users_name, users_password, users_contact } = req.body;
        conn.query(
            `INSERT INTO users (users_email, users_name, users_password, users_contact)
                VALUES(?, ?, ?, ?)`, [users_email, users_name, users_password, users_contact],
            function(err, results) {
                res.status(201).send(`${users_name}님 가입을 환영합니다.`);
            }
        );
    }
});

router
    .route('/users')
    .get((req, res) => {
        // [개인] 유저 정보 조회
        let { users_email } = req.body;
        conn.query(
            `SELECT * FROM users WHERE users_email = ?`, users_email,
            function(err, results, fields) {
                if(results) {
                    res.status(200).json(results);
                } else {
                    res.status(404).send("회원 정보가 존재하지 않습니다.");
                }
            }
        );
    })
    // .put((req, res) => {
    //     // 회원 정보 수정
    //     let { param_userID } = req.params;
    //     let user = userDB.get(param_userID);

    //     if(valueOk(user.userID, user.userPW, user.userName)) {
    //         user.userPW = req.body.userPW;
    //         user.userName = req.body.userName;
    //         userDB.set(param_userID, user);
    //         res.status(200).send(`${param_userID}님의 회원 정보가 수정 되었습니다.\n`);
    //     } else {
    //         res.status(400).send("오류! 입력란이 비어있는지 확인해주세요.");
    //     }
    // })
    .delete((req, res) => {
        // 회원 탈퇴
        if (req.body == {}) {
            res.status(404).send(`회원 정보가 존재하지 않습니다.`);
        } else {
            const { users_email, users_name, users_password } = req.body;
            conn.query(
                `DELETE FROM users WHERE users_email = ? and users_name = ? and users_password = ?`, [users_email, users_name, users_password],
                function(err, results, fields) {
                    res.status(200).send(`${users_name}님의 회원 탈퇴가 정상적으로 완료되었습니다.`);
                }
            );
        }
    });

module.exports = router;