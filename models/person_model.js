const { pool } = require("./db");

async function person_create_table() {
    await pool.query('CREATE TABLE IF NOT EXISTS person(' +
        'registration_number serial PRIMARY KEY,' +
        'surname VARCHAR(50) NOT NULL,' +
        'name VARCHAR(50) NOT NULL,' +
        'patronymic VARCHAR(50) NOT NULL,' +
        'place_of_residence VARCHAR(50) NOT NULL,' +
        'criminal_record_count INTEGER NOT NULL CHECK (criminal_record_count >= 0)' +

        ');');
}


async function person_insert(data) {
    try {
        pool.connect();

        await pool.query(
            `INSERT INTO "person" ("surname","name","patronymic","place_of_residence","criminal_record_count")
        VALUES ($1,$2,$3,$4,$5);`
            , [data['surname'], data['name'], data['patronymic'], data['place_of_residence'], data['criminal_record_count']]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }

}

async function person_get_all_data() {
    try {
        pool.connect();

        const result = await pool.query(
            `SELECT * FROM "person";`);

        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}



async function person_get_id(data) {

    try {
        pool.connect();

        const result = await pool.query(
            `SELECT registration_number FROM "person"  WHERE "surname" = $1 AND "name" = $2 AND "patronymic" = $3 AND "place_of_residence" = $4
         AND "criminal_record_count" = $5;`
            , [data['surname'], data['name'], data['patronymic'], data['place_of_residence'], data['criminal_record_count']]);
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
async function person_get_all_by_id(id) {
    try {
        pool.connect();

        const result = await pool.query(
            `SELECT
            registration_number ,
            surname,
            name,
            patronymic,
            place_of_residence,
            criminal_record_count
            FROM "person" WHERE registration_number = $1;`, [id]);

        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

module.exports = {
    person_create_table,
    person_insert,
    person_get_all_data,
    person_get_id,
    person_get_all_by_id,
}