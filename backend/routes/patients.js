const express = require('express');
const router = express.Router();
const db = require('../database.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/', (req,res) => {
    const {name,password,gender,disease,severity,phone,DOB} = req.body;

    if (!name || !phone || !password || !DOB){
     return res.status(400).json({"Error": "All required fields are not filled.Please fill them all."})
    }

    bcrypt.hash(password, saltRounds, (err,hash) => {
        if (err) {
            return res.status(500).json({"Error": "Error hashing password"});
        }

        const sql = `insert into patient (name,password,gender,disease,severity,phone,DOB) values (?,?,?,?,?,?,?)`;

        const params = [name,hash,gender,disease,severity,phone,DOB];

        db.run(sql,params, function(err,result) {
            if (err) {
                return res.status(400).json({"Error": "error storing to database"});
            }
            res.status(201).json({
                "status":true,
                "data": {id:this.lastID,name}
            });
        });
    });


});

router.get('/', (req,res) => {
    const sql = `select p_id,name,gender,disease,phone,severity,DOB from patient`;

    db.all(sql,[], (err,rows) => {
        if (err){
            return res.status(500).json({"Error": "Error calling the patients record from the table"});
        }
        res.status(200).json({"status" : true,
            "patients": rows
        });
    });
});

module.exports = router;