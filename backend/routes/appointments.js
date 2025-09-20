const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.post('/', async (req, res) => {
    const { app_time, status, doctor_id, patient_id } = req.body;

    if (!app_time || !status) {
        return res.status(400).json({ "Error": "Missing appointment required fields" });
    }

    try {
        const sql = `INSERT INTO appointment (app_time, status, doctor_id, patient_id) VALUES ($1, $2, $3, $4) RETURNING a_id`;
        const params = [app_time, status, doctor_id, patient_id];

        const result = await db.query(sql, params);
        
        res.status(201).json({
            "status": true,
            "message": "success",
            "data": { id: result.rows[0].a_id }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ "Error": "error storing data to the appointment table" });
    }
});

router.get('/', async (req, res) => {
    try {
        const sql = `SELECT a_id, status, app_time, doctor_id, patient_id FROM appointment`;
        const result = await db.query(sql);
        
        res.status(200).json({
            "status": true,
            "data": result.rows
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ "Error": "error in calling the appointment table" });
    }
});

module.exports = router;