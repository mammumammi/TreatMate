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

router.post('/auth/login/doctor/', (req, res) => {
    // FIX #1: Add 'password' to the list of expected data
    const { name, expertise, YOE, gender, password } = req.body;

    // FIX #2: Add 'password' to the validation check
    if (!name || !expertise || !YOE || !password) {
        res.status(400).json({ "Error": "Missing required fields" });
        return;
    }

    // FIX #3: Add the 'password' column and a '?' placeholder to the SQL query
    const sql = `INSERT INTO doctor (name, expertise, YOE, gender, password) VALUES (?, ?, ?, ?, ?)`;
    
    // FIX #4: Add the 'password' variable to the params array
    const params = [name, expertise, YOE, gender, password];

    // FIX #5: Use the 'function' keyword so 'this.lastID' works correctly
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ "Error": err.message });
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
                // No need to send the password back to the client
            }
        });
    });
});
router.get('/:id/appointments', (req, res) => {
    const doctorId = req.params.id;

    // This SQL query joins the appointment and patient tables
    const sql = `
        SELECT 
            a.a_id, 
            a.appointment_time,
            a.status,
            p.name as patient_name 
        FROM 
            appointment a
        JOIN 
            patient p ON a.patient_id = p.p_id
        WHERE 
            a.doctor_id = ? 
            AND a.status = 'booked'
    `;

    db.all(sql, [doctorId], (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

module.exports = router;