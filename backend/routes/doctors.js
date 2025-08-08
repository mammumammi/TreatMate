const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get('/', (req,res) => {
    const sql = "Select * from doctor";
    db.all(sql,[], (err,rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return ;
        }
        res.status(200).json({
            "message": "success",
            "data" : rows
        });
    });
});

router.post('/', (req,res) => {
    const {name , expertise , YOE , gender } = req.body;

    if (!name || !expertise || !YOE ){
        res.status(400).json({"Error" : "Missing required fields"});
        return;
    }
    const sql = ` insert into doctor (name,expertise,YOE,gender) Values (?,?,?,?) `;
    const params = [name,expertise,YOE,gender];

    db.run(sql,params, (err,result) => {
        if (err){
            res.status(400).json({"Error": err.message});
            return;
        }

        res.status(201).json({
            "message": "success",
            "data": {
                id: this.lastID,
                name,
                expertise,
                gender,
                YOE
            }
        })
    });
});

module.exports = router;