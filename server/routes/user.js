const express = require('express');
const account = require('./services/account');
const router = express.Router();

router.post('/register', (req,res) => account.register(req,res));
router.post('/login', (req,res) => account.login(req,res));

module.exports = router;