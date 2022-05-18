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


async function intermediary_get_persons(id){
    try {
        pool.connect();
       const result = await pool.query(
        `SELECT person_number,incident_number,incident_relation FROM "intermediary" WHERE incident_number = $1;`
        ,[id]);
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
async function intermediary_get_incidents(id){
    try {
        pool.connect();
       const result = await pool.query(
        `SELECT person_number,incident_number,incident_relation FROM "intermediary" WHERE person_number = $1;`
        ,[id]);
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
async function intermediary_delete_persons(id){
    try {
        pool.connect();
       const result = await pool.query(
        `DELETE  FROM "intermediary" WHERE person_number = $1;`
        ,[id]);
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
async function intermediary_delete_incidents(id){
    try {
        pool.connect();
       const result = await pool.query(
        `DELETE  FROM "intermediary" WHERE incident_number = $1;
         ;`
        ,[id]);
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}


module.exports ={
    create_intermediary_table,
    intermediary_insert,
    intermediary_get_persons,
    intermediary_get_incidents,
    intermediary_delete_persons,
    intermediary_delete_incidents,
}