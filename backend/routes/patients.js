const express = require('express');
const router = express.Router();
const db = require('../database.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/', async (req, res) => {
    const { name, password, gender, disease, severity, phone, DOB } = req.body;

    if (!name || !phone || !password || !DOB) {
        return res.status(400).json({ "Error": "All required fields are not filled. Please fill them all." });
    }

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        
        const sql = `INSERT INTO patient (name, password, gender, disease, severity, phone, DOB) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING p_id, name`;
        const params = [name, hash, gender, disease, severity, phone, DOB];

        const result = await db.query(sql, params);
        
        res.status(201).json({
            "status": true,
            "data": { id: result.rows[0].p_id, name: result.rows[0].name }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ "Error": "error storing to database" });
    }
});

router.get('/', async (req, res) => {
    try {
        const sql = `SELECT p_id, name, gender, disease, phone, severity, DOB FROM patient`;
        const result = await db.query(sql);
        
        res.status(200).json({
            "status": true,
            "patients": result.rows
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ "Error": "Error calling the patients record from the table" });
    }
});

module.exports = router;