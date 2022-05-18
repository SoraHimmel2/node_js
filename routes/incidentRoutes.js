const express = require('express');
const incidentController = require('../controllers/incident_controller');
const personController = require('../controllers/person_controller');
const intermediaryController = require('../controllers/intermediary_controller');
const index = require('../controllers/index_controller');


const router = express.Router();
router.get('/',incidentController.incident_index);

router.get('/create_incident',incidentController.incident_create);
router.post('/get_all_incidents',incidentController.incident_get_all);
router.post('/create_incident',incidentController.incident_create_post);
router.get('/update_incident',incidentController.incident_update);
router.post('/update_incident',incidentController.incident_update_post);
router.post('/incident_count',incidentController.incident_get_count);

router.get('/create_person',personController.person_create);
router.post('/get_all_persons',personController.person_get_all);
router.post('/create_person',personController.person_create_post);
router.get('/update_person',personController.person_update);
router.post('/update_person',personController.person_update_post);

router.post('/incident_intermediary',intermediaryController.incident_part);
router.post('/incident_get_intermediary',intermediaryController.person_part_update);
router.post('/person_intermediary',intermediaryController.person_part);
router.post('/person_get_intermediary',intermediaryController.incident_part_update);

router.post('/delete_person',intermediaryController.person_delete);
router.post('/delete_incident',intermediaryController.incident_delete);

router.post('/person_incidents',intermediaryController.person_incidents);


router.get('/main_page',index.index_index);


module.exports = router;

