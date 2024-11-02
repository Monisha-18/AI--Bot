const express = require('express');
const router = express.Router();
const { verifyAnswer } = require('../controllers/answerController');

router.post('/', verifyAnswer);

module.exports = router;
