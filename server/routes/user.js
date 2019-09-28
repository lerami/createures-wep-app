const express = require('express');
const User = require('../schema/User');
const router = express.Router();

router.get('/', (req,res) => {
    res.json({'user': 'isWorking'});
});

module.exports = router;