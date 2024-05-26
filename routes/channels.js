// 2024-05-03 create

const express = require('express');
// const app = express();
const router = express.Router();
router.use(express.json());
const conn = require('../mysql2.js');

router
    .route('/channels')
    .post((req, res) => {

    }) // 채널 개별 생성
    .get((req, res) => {

    });  // 채널 전체 조회

router
    .route('/channels/:param_userID')   // 채널 개별 수정
    .put((req, res) => {

    })     // 채널 개별 삭제
    .delete((req, res) => {

    })  // 채널 전체 삭제
    .get((req, res) => {
        let { users_email } = req.body;
        conn.query(
            `SELECT * FROM users WHERE users_email = ?`, users_email,
            function(err, results, fields) {
                res.status(200).json(results);
            }
        );
    });    // 채널 개별 조회

router
    .route('/search')
    .get((req, res) => {

    }); // 채널 검색

module.exports = router;