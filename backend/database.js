const sqlite = require('sqlite3');
const dbPath = process.env.DATABASE_PATH || './database.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to database:",err.message);
    }
    console.log("Connected to the database successfully");
});

const createTables = () => {
    db.serialize( () => {
        db.run(`Create table if not exists doctor(
                d_id integer primary key autoincrement,
                name text not null,
                password text not null,
                expertise text not null,
                YOE integer not null,
                gender text
            ) `);

        db.run(`Create table if not exists patient(
                p_id integer primary key autoincrement,
                name text  not null,
                password text not null,
                gender text,
                disease text,
                severity text,
                phone integer not null,
                DOB text not null
            )`);

        db.run(`Create table if not exists appointment(
                a_id integer primary key autoincrement,
                doctor_id integer,
                patient_id integer,
                app_time text not null,
                status text not null default 'booked',
                foreign key (doctor_id) references doctor(d_id),
                foreign key (patient_id) references patient(p_id)
                )`);

        console.log("Tables are ready or already exists");
    })
};

createTables();

module.exports = db;