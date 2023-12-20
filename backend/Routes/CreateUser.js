const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator')

const jwt=require("jsonwebtoken");
const  bcrypt=require("bcryptjs");
const jwtSecret="Sagarisagoodboiyouniggas"
router.post("/CreateUser",

    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        body('name').isLength({ min: 5 }),
        body('location').isLength({ min: 5 })
    ]


    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
const salt=await bcrypt.genSalt(10);
let secPassowrd=await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassowrd,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })

        }
    })

router.post("/loginUser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email
        try {
            let Userdata = await User.findOne({ email })
            if (!Userdata) {
                return res.status(400).json({ errors: "Wrong crdentials" })
            }
            const pwdCompare=await bcrypt.compare(req.body.password,Userdata.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Wrong crdentials" })
            }
const data={
    User:{
        id:Userdata.id
    }
}

const authToken=jwt.sign(data,jwtSecret)


            return res.json({ success: true,authToken:authToken })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })

        }
    })


module.exports = router;