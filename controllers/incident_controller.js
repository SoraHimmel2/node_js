const incident = require("../models/incident_model.js");
const url = require('url');

const incident_index = (req,res) => {
    
}

const incident_create = (req,res) => {
    res.render('incident/create_incident.ejs', { title: 'Create a new incident',controller:'incident_controller' });
}


const incident_update = (req,res) => {
    
    const requestUrl = new URL('http:/'+req.url);
    const searchParams = requestUrl.searchParams;
    const id = searchParams.get('id');
   
    let resolutionResult = {
        'Удовлетворено ходотайство об возбуждении уголовного дела':'',
        'Отказано в возбуждении дела.':'',
        'Отправлено по территориальному признаку.':''
    };

    incident.incident_get_all_by_id(id) 
    .then((data)=>{
        const result = data.rows['0'];
       
        resolutionResult[result['resolution_result']] = 'selected'
       


        res.render('incident/update_incident.ejs', { 
        title: 'Create a new incident',
        controller:'incident_update_controller' ,
        date:result['registration_date'].replaceAll(':','-'),
        description:result['description'],
        first_resolution:resolutionResult['Удовлетворено ходотайство об возбуждении уголовного дела'],
        second_resolution:resolutionResult['Отказано в возбуждении дела.'],
        third_resolution:resolutionResult['Отправлено по территориальному признаку.'],
        case_number:result['case_number'] });
    });
    
}

const incident_delete = (req,res) => {
    
}
const incident_get_all = (req,res) => {
    incident.incident_get_all_data().then(
        (data)=>{
             res.json(data.rows);
         })

}
const incident_create_post = (req,res) =>{
    incident.incident_get_id(req.body).then(
        (data) => {
            
            if (data.rowCount > 0) {
                res.json({ result: 'already-exist' });
            } else {
                incident.incident_insert(req.body).then(() => {

                    incident.incident_get_id(req.body).then(
                        (data) => {
                            res.json(data.rows[0]);
                        });
                });
            }
        }
    );
}

module.exports = {
    incident_index,
    incident_create,
    incident_update,
    incident_delete,
    incident_get_all,
    incident_create_post,
}

