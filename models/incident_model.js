const { pool } = require("./db");
async function incident_create_table (){
    await pool.query('CREATE TABLE IF NOT EXISTS incident('+
     '"registration_number" serial PRIMARY KEY,'+
      'registration_date TIMESTAMP NOT NULL,'+
      'description VARCHAR(500) NOT NULL,'+
      'resolution_result VARCHAR(70) NOT NULL,'+
      '"case_number" VARCHAR(50)'+
      ');');
}
async function incident_insert(data){
    try {
        pool.connect();
        await pool.query(
        `INSERT INTO "incident" ("registration_date","description","resolution_result","case_number")
        VALUES ($1,$2,$3,$4);`
        ,[data['registration_date'],data['description'],data['resolution_result'],data['case_number']]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

async function incident_get_all_data(){
    try {
        pool.connect();
       
       const result = await pool.query(
        `SELECT registration_number,
        TO_CHAR(registration_date,'YYYY:MM:DD') registration_date,
        description,
        resolution_result,
        case_number FROM "incident";`);
        
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
async function incident_get_id(data){
    
    try {
        pool.connect();
        
       const result = await pool.query(
        `SELECT registration_number FROM "incident"  WHERE "registration_date" = $1 AND "description" = $2 AND "resolution_result" = $3;` 
        ,[data['registration_date'],data['description'],data['resolution_result']]);
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
async function incident_get_all_by_id(id){
    try {
        pool.connect();
       
       const result = await pool.query(
        `SELECT registration_number,
        TO_CHAR(registration_date,'YYYY:MM:DD') registration_date,
        description,
        resolution_result,
        case_number FROM "incident" WHERE registration_number = $1;`,[id]);
        
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
module.exports = {
    incident_create_table,
    incident_insert,
    incident_get_all_data,
    incident_get_id,
    incident_get_all_by_id,
}