import { sendData } from '../libraries/async-functions.js'
import { getFormData } from '../libraries/async-functions.js'
import { addListElements } from '../libraries/async-functions.js'
import{dispatchData} from '../libraries/async-functions.js'





const form = document.querySelector(".form-person");



form.addEventListener("submit", invokeDispatch);












async function invokeDispatch(target) {
    const formUrl = 'http://localhost:3000/incidents/create_incident';
    const intermediaryUrl = 'http://localhost:3000/incidents/incident_intermediary';

    target.preventDefault();
    const dispatchResult = await dispatchData(formUrl, intermediaryUrl, getFormData(form));
    console.log(dispatchResult)
}



addListElements('.list-items-ul', 'http://localhost:3000/incidents/get_all_persons', ['surname', 'name', 'patronymic'], 'registration_number').
    then(() => {



    });