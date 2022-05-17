const incident = require("../models/incident_model.js");
const person = require("../models/person_model");
const intermediary = require("../models/intermediary_model");

const person_part = (req, res) => {

    if (req.body.rows.length == 0) {
        intermediary.intermediary_delete_persons(req.body.id_number).then(() => {
            res.json({ result: 'good' });
        })


    } else {
        console.log(`we are here ${req.body.id_number}`);
        intermediary.intermediary_delete_persons(req.body.id_number).then(() => {
            let rows = req.body.rows;

            let incidentId = req.body.id_number;
            console.log(`rows is ${rows.length}`)
            rows.forEach(element => {
                intermediary.intermediary_insert([element.id, incidentId, element.guilty]);
            });
            res.json({ result: 'good' });
        }).catch((error) => console.log(error));


    }

}

const incident_part = (req, res) => {
    if (req.body.rows.length == 0) {
        intermediary.intermediary_delete_incidents(req.body.id_number).then(() => {
            res.json({ result: 'good' });
        })


    } else {
        console.log(`we are here ${req.body.id_number}`);
        intermediary.intermediary_delete_incidents(req.body.id_number).then(() => {
            let rows = req.body.rows;

            let incidentId = req.body.id_number;
            console.log(`rows is ${rows.length}`)
            rows.forEach(element => {
                intermediary.intermediary_insert([element.id, incidentId, element.guilty]);
            });
            res.json({ result: 'good' });
        }).catch((error) => console.log(error));


    }


}

const incident_part_update = (req, res) => {

    intermediary.intermediary_get_persons(req.body.id).then((result) => {
        res.json(result.rows);
    });


}
const person_part_update = (req, res) => {

    intermediary.intermediary_get_incidents(req.body.id).then((result) => {
        res.json(result.rows);
    });


}


const person_delete = (req, res) => {
    const list = req.body;
    list.forEach((element) => {

        intermediary.intermediary_delete_persons(element.id).then(() => {
            person.person_delete(element.id).then(() => {

            })

        });
    })
    res.json({ result: 'good' });




}
const incident_delete = (req, res) => {

    const list = req.body;
    list.forEach((element) => {

        intermediary.intermediary_delete_incidents(element.id).then(() => {
            incident.incident_delete(element.id).then(() => {

            })

        });
    })
    res.json({ result: 'good' });

}

module.exports = {
    person_part,
    incident_part,
    incident_part_update,
    person_part_update,
    person_delete,
    incident_delete,
}