const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.post('/', (req,res) => {
    const {app_time,status,doctor_id,patient_id} = req.body;

    if (!app_time || !status){
        return res.status(400).json({"Error":"Missing appointment required fields"});
    }

    const sql = `insert into appointment (app_time,status,doctor_id,patient_id) values(?,?,?,?)`;

    const params = [app_time,status,doctor_id,patient_id];

    db.run(sql,params, function(err,result){
        if (err){
            return res.status(400).json({"Error": "error storing data to the appointment table"});
        }
        res.status(201).json({"status": true,"message":"success","data": {id: this.lastID}});
    });
});

router.get('/', (req,res) => {
    const sql = `select a_id,status,app_time,doctor_id,patient_id from appointment`;

    db.all(sql,[],(err,rows) => {
        if (err){
            return res.status(500).json({"Error": "error in calling the doctors table"});
        }
        res.status(200).json({"status": true,"data": rows})
    })
})

module.exports = router;