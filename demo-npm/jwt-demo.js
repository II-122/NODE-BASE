// 2024-05-14 create

let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// .env 설정 사용 선언
dotenv.config();

// token 생성 = jwt (페이로드, 나만의 암호키) + HS256
let token = jwt.sign({ foo : 'bar' }, process.env.PRIVATE_KEY);

console.log(token);

// 검증
let decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);   // 페이로드 값 확인 가능