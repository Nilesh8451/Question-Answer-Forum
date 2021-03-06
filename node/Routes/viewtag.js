const express = require('express');
const verifyToken = require('../Helpers/verifytoken')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Tags = require("../Models/tags")
const router = express.Router()
const Answer = require('../Models/answer')
const Community = require('../Models/community')




router.use(bodyParser())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))




router.post('/', (req, res) => {
    if (req.body.tag == null || req.body.tag == undefined)
        res.status(400).json({ "msg": "Send all data" });
    const resu = Tags.find({ name: new RegExp(req.body.tag, 'i') }).then((re => {
        if (re.length == 0) {
            res.status(202).json({ "msg": "not found" })
        }
        else
            res.status(200).send(re);
        // console.log(re);
    }))

});
module.exports = router
