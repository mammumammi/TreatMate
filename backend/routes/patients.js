const express = require('express');
const router = express.Router();

const db = require('../database.js');

router.get('/', (req,res) => {
    const sql ="select * from patient";
    db.all(sql,[], (err,rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return ;
        }
        res.status(200).json({
            "message": "success",
            "data" : rows
        });
    });
});

router.post('/', (req,res) => {
    const { name,gender,medical_reports,DOB,disease,severity,medicines_in_use} = req.body;

    if (!name || !DOB ){
        res.status(400).json({"Error": "Missing required fields"});
        return ;
    }

    const sql = `insert into patient (name,gender,medical_reports,DOB,disease,severity,medicines_in_use) values (?,?,?,?,?,?,?)`;
    const params = [name,gender,medical_reports,DOB,disease,severity,medicines_in_use];

    db.run(sql,params, function(err,result) {
        if (err){
            res.status(400).json({"Error": err.message});
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": {
                id: this.lastID,
                name,
                gender,
                medical_reports,
                DOB,
                disease,
                severity
            }
        })
    });
});

router.get('/:id/appointments', (req,res) => {
    const patientId = req.params.id;
    const sql = `
    SELECT a.*, d.name AS doctor_name
    FROM appointment a
    JOIN doctor d ON a.doctor_id = d.d_id
    WHERE a.patient_id = ? 
      AND a.status COLLATE NOCASE = 'pending'
  `;

    db.all(sql,[patientId], (err,rows) => {
        if (err) { res.status(400).json({"error": err.message});
        return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

module.exports = router;