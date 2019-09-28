const express = require('express');
const account = require('./services/account');
const router = express.Router();

router.post('/signup', (req,res) => account.signup(req,res));
router.post('/login', (req,res) => account.login(req,res));

module.exports = router;