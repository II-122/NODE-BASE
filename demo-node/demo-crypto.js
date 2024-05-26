const crypto = require('crypto');   // node.js 내장 모듈 : 암호화

const pw1 = "9876";

const salt = crypto.randomBytes(64).toString('base64');
const hashedPw = crypto.pbkdf2Sync(users_password, salt, 10000, 64, 'sha512').toString('base64');


// 방법 1. salt 값을 고정

// 방법 2. salt 를 DB에 같이 저장
// 회원가입 시 비밀번호를 암호화해서 암호화된 비밀번호와 salt 값을 같이 저장
// 로그인 시 이메일, 비밀번호 => salt 값 꺼내서 비밀번호 암호화 후 DB에 저장된 비밀번호와 비교