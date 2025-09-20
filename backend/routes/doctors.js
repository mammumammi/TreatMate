const express = require('express');
const router = express.Router();
const db = require('../database.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/', async (req, res) => {
    const { name, password, expertise, YOE, gender } = req.body;

    if (!name || !password || !expertise || !YOE) {
        return res.status(400).json({ "Error": "Missing required fields" });
    }

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        
        const sql = `INSERT INTO doctor (name, password, expertise, YOE, gender) VALUES ($1, $2, $3, $4, $5) RETURNING d_id, name`;
        const params = [name, hash, expertise, YOE, gender];

        const result = await db.query(sql, params);
        
        res.status(201).json({
            "status": true,
            "message": "success",
            "data": { id: result.rows[0].d_id, name: result.rows[0].name }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ "Error": "error storing to the doctor table" });
    }
});

router.get('/', async (req, res) => {
    try {
        const sql = `SELECT d_id, name, expertise, YOE, gender FROM doctor`;
        const result = await db.query(sql);
        
        res.status(200).json({
            "status": true,
            "doctors": result.rows
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ "Error": "error in calling the doctors table" });
    }
});

module.exports = router;