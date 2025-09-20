const { Pool } = require('pg');

// Database configuration
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

const pool = new Pool(dbConfig);

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to PostgreSQL database successfully');
    release();
  }
});

const createTables = async () => {
  try {
    // Create doctors table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS doctor(
        d_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        expertise TEXT NOT NULL,
        YOE INTEGER NOT NULL,
        gender TEXT
      )
    `);

    // Create patients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patient(
        p_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        gender TEXT,
        disease TEXT,
        severity TEXT,
        phone INTEGER NOT NULL,
        DOB TEXT NOT NULL
      )
    `);

    // Create appointments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointment(
        a_id SERIAL PRIMARY KEY,
        doctor_id INTEGER,
        patient_id INTEGER,
        app_time TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'booked',
        FOREIGN KEY (doctor_id) REFERENCES doctor(d_id),
        FOREIGN KEY (patient_id) REFERENCES patient(p_id)
      )
    `);

    console.log("Tables are ready or already exist");
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

createTables();

module.exports = pool;