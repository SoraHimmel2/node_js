const express = require('express');
const incidentController = require('../controllers/incident_controller');
const personController = require('../controllers/person_controller');
const intermediary = require('../controllers/intermediary_controller');


const router = express.Router();
router.get('/',incidentController.incident_index);
router.get('/create_incident',incidentController.incident_create);
router.post('/get_all_incidents',incidentController.incident_get_all);
router.post('/create_incident',incidentController.incident_create_post);

router.get('/create_person',personController.person_create);
router.post('/get_all_persons',personController.person_get_all);
router.post('/create_person',personController.person_create_post);

router.post('/incident_intermediary',intermediary.incident_part);
router.post('/person_intermediary',intermediary.person_part);


module.exports = router;

