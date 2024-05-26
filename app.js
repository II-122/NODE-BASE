// 2024-05-05 create
// 2024-05-14 update

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/users.js');
const channelRouter = require('./routes/channels.js')

app.use('/', userRouter);
app.use('/', channelRouter);

app.listen(process.env.PORT);