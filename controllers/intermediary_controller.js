const incident = require("../models/incident_model.js");
const person = require("../models/person_model");
const intermediary = require("../models/intermediary_model");

const person_part = (req,res) => {
    console.log(req.body);
    let rows = req.body.rows;
    let personId = req.body.id_number;
    rows.forEach(element => {
        intermediary.intermediary_insert([personId,element.id,element.guilty]);
    });
    res.json({result:'good'});
  
}

const incident_part = (req,res) => {
    
    let rows = req.body.rows;
    let incidentId = req.body.id_number;
    rows.forEach(element => {
        intermediary.intermediary_insert([element.id,incidentId,element.guilty]);
    });
    res.json({result:'good'});
  
}



module.exports = {
    person_part,
    incident_part,
}