const person = require("../models/person_model.js");

const person_index = (req, res) => {


}

const person_create = (req, res) => {
    res.render('person/create_person.ejs', { title: 'Create a new person', controller: 'person_controller' });

}

const person_update = (req, res) => {

}

const person_delete = (req, res) => {

}
const person_get_all = (req, res) => {


    person.person_get_all_data().then(
        (data) => {
            res.json(data.rows);
        })



}

const person_create_post = (req, res) => {
    person.person_get_id(req.body).then(
        (data) => {
            
            if (data.rowCount > 0) {
                res.json({ result: 'already-exist' });
            } else {
                person.person_insert(req.body).then(() => {

                    person.person_get_id(req.body).then(
                        (data) => {
                            res.json(data.rows[0]);
                        });
                });
            }
        }
    );

}
module.exports = {
    person_index,
    person_create,
    person_update,
    person_delete,
    person_get_all,
    person_create_post,
}