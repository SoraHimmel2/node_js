import { sendData } from '../libraries/async-functions.js'
import { getFormData } from '../libraries/async-functions.js'
import { addListElements } from '../libraries/async-functions.js'
import{dispatchData,restrictInput,selectElements} from '../libraries/async-functions.js'





const form = document.querySelector(".form-person");
const select = document.getElementById('resolution_result');



form.addEventListener("submit", invokeDispatch);
select.addEventListener('change',restrictListener);


function restrictListener(event){
    const select = event.target;
    //console.log(select);
    const input = document.getElementById('case-number');
  //  console.log(input);

    restrictInput(select,input);
}





async function invokeDispatch(target) {
    const formUrl = 'http://localhost:3000/incidents/create_incident';
    const intermediaryUrl = 'http://localhost:3000/incidents/incident_intermediary';

    target.preventDefault();
    const dispatchResult = await dispatchData(formUrl, intermediaryUrl, getFormData(form),'.container-end-part');
    console.log(dispatchResult)
}



addListElements('.list-items-ul', 'http://localhost:3000/incidents/get_all_persons', ['surname', 'name', 'patronymic'], 'registration_number')
.then(()=>{
  const urlString = window.location.href;
  const url = new URL(urlString);
  const id = url.searchParams.get('id');
  selectElements(id,'http://localhost:3000/incidents/person_get_intermediary','person_number');
});
   