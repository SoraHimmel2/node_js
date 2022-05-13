const { pool } = require("./db");

async function create_intermediary_table(){
    await pool.query('CREATE TABLE IF NOT EXISTS intermediary('+
    'person_number INTEGER NOT NULL,'+
    'incident_number INTEGER NOT NULL,'+
    'incident_relation VARCHAR(50) NOT NULL'+

     ');');
}

async function intermediary_insert(data){
    try {
        pool.connect();
        await pool.query(
        `INSERT INTO "intermediary" ("person_number","incident_number","incident_relation")
        VALUES ($1,$2,$3);`
        ,data);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

module.exports ={
    create_intermediary_table,
    intermediary_insert,
}