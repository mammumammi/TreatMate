const express = require('express');
const router = express.Router();
const db = require('../database.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/', (req,res) => {
    const { name,password,expertise,YOE,gender} = req.body;

    if (!name || !password || !expertise || !YOE){
        return res.status(400).json({"Error": "Missing required fields"});
    }

    bcrypt.hash(password,saltRounds, (err,hash) => {
        if (err) {
            return res.status(500).json({"Error": "Error hashing password"});
        }

        const sql = `insert into doctor (name,password,expertise,YOE,gender) values (?,?,?,?,?)`;

        const params = [name,hash,expertise,YOE,gender];

        db.run(sql,params, function(err,result) {
            if (err) {
                return res.status(400).json({"Error": "error storing to the doctor table"});
            }
            res.status(201).json({"status": true,"message": "success","data": {id: this.lastID,name}});
        });
    });
});

router.get('/', (req,res) => {
    const sql = `select d_id,name,expertise,YOE,gender from doctor`;

    db.all(sql,[],(err,rows) => {
        if (err){
            return res.status(500).json({"Error": "error in calling the doctors table"});
        }
        res.status(200).json({"status": true,"data": rows});
    });
});

module.exports = router;