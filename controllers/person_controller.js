const person = require("../models/person_model.js");
const url = require('url');

const person_index = (req, res) => {


}

const person_create = (req, res) => {
    
    res.render('person/create_person.ejs', { title: 'Create a new person', controller: 'person_controller' });

}


const person_update = (req,res) => {
    
    const requestUrl = new URL('http:/'+req.url);
    const searchParams = requestUrl.searchParams;
    const id = searchParams.get('id');
   
   
    person.person_get_all_by_id(id) 
    .then((data)=>{
        const result = data.rows['0'];
        console.log(result);
        res.render('person/update_person.ejs', { 
        title: 'Изменить данные человека',
        controller:'person_update_controller' ,
        surname:result['surname'],
        name:result['name'],
        patronymic:result['patronymic'],
        place_of_residence:result['place_of_residence'],
        criminal_record_count:result['criminal_record_count']});
    });
    
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
const person_update_post = (req,res)=>{
    console.log(req.body);

    person.person_get_id(req.body.form).then(
        (data) => {
            
            if (data.rowCount > 1) {
               
                res.json({ result: 'already-exist' });
            } else {
              
                person.person_update(req.body.id,req.body.form).then(() => {
                    res.json({result:'good'});
                });
            }
        }
    ).catch((error)=>{console.log(error)});
    
}

module.exports = {
    person_index,
    person_create,
    person_update,
    person_delete,
    person_get_all,
    person_create_post,
    person_update_post,
    
}