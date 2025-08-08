const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get('/', (req, res) => {
    const sql = "select * from appointment";

    db.all(sql,[], (err,rows) => {
        if (err)
        {
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    });
});

router.post('/', (req,res) => {
    const { doctor_id,patient_id,appointment_time,medicines_prescribed,medical_bill,fee } = req.body;

    if (!doctor_id || !patient_id){
        res.status(400).json({"Error": "Missing values"});
        return;
    }
    const sql = `insert into appointment (doctor_id,patient_id,appointment_time,medicines_prescribed,medical_bill,fee) values (?,?,?,?,?,?)`
    const params = [doctor_id,patient_id,appointment_time,medicines_prescribed,medical_bill,fee];

    db.run(sql,params, (err,result) => {
        if (err) {
            res.status(400).json({"Error": err.message});
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": {
                id:this.lastID,
                patient_id,
                doctor_id,
                appointment_time,
                medicines_prescribed,
                medical_bill,
                fee
            }
        });
    });
});

module.exports = router;