const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.post('/login/doctor',(req,res) => {
    const [name, password] = req.body;
    const sql = "select * from doctors where name = ? and password = ?";
    
    db.get(sql,[name,password],(err,row) => {
        if (err) return res.status(400).json({"Error": err.message});
        if (row) {
            return res.status(500).json({"message": "success",user: row});
        }
        else {
            return res.status(401).json({"error": "invalid name or password"});
        }
    });
});

router.post('/login/patient', (req,res) => {
    const [name,password] = req.body;
    const sql = "select * from patients where name = ? and password = ?";

    db.get(sql,[name,password], (err,rows) => {
        if (err){
            return res.status(400).json({"Error":err.message});
        }
        if (rows) {
            return res.status(500).json({"message": "success",user: rows}); 
        }
        else{
            return res.status(401).json({"Error": 'invalid name or password'});
        }
    });
});

module.exports = router;