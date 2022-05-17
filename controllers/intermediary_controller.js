const incident = require("../models/incident_model.js");
const person = require("../models/person_model");
const intermediary = require("../models/intermediary_model");

const person_part = (req,res) => {
   
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

const incident_part_update = (req,res) => {
   
    intermediary.intermediary_get_persons(req.body.id).then((result)=>{
        res.json(result.rows);
    });
    
  
}
const person_part_update = (req,res) => {
  
    intermediary.intermediary_get_incidents(req.body.id).then((result)=>{
        res.json(result.rows);
    });
    
  
}

module.exports = {
    person_part,
    incident_part,
    incident_part_update,
    person_part_update,
}