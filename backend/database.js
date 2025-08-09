const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./scheduler.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Connected to the sqlite db');
});

const createTables = () => {
    db.serialize( () => {
       

        db.run(`Create table if not exists patient (
            p_id integer primary key autoincrement,
            name text not null,
            gender text,
            medical_reports text,
            DOB text not null,
            disease text ,
            password text not null,
            severity text ,
            medicines_in_use text
            )`);

        db.run(`Create table if not exists doctor (
                d_id integer primary key autoincrement,
                name text not null,
                expertise text not null,
                password text not null,
                YOE integer not null,
                gender text,
                patients_assigned text default '[]'
                )`);

        db.run(`Create table if not exists appointment(
            a_id integer primary key autoincrement,
            doctor_id integer,
            patient_id integer,
            appointment_time text not null,
            medicines_prescribed text,
            medical_bill text,
            fee integer not null,
            status text default 'Pending',
            foreign key (doctor_id) references doctor(d_id),
            foreign key (patient_id) references patient(p_id)
            )`);
        
            console.log('Tables are ready');
    } );
};

createTables();
module.exports = db;

