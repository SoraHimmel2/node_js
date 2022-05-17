import {getFormData} from '../libraries/async-functions.js'
import {addListElements}from '../libraries/async-functions.js'
import {dispatchData,selectElements,dispatchDataForUpdate} from '../libraries/async-functions.js'





const form = document.querySelector(".form-person");


form.addEventListener("submit",invokeDispatch);



async function invokeDispatch(target) {
    const formUrl = 'http://localhost:3000/incidents/update_person';
    const intermediaryUrl = 'http://localhost:3000/incidents/person_intermediary';
  

    target.preventDefault();
    console.log(getFormData(form));
    dispatchDataForUpdate(formUrl, intermediaryUrl, getFormData(form),getUrlParametr('id'),'.container-end-part');
}

function getUrlParametr(parametr){
    const urlString = window.location.href;
      const url = new URL(urlString);
      const id = url.searchParams.get(parametr);
      return id;
    }

addListElements('.list-items-ul','http://localhost:3000/incidents/get_all_incidents',['description','registration_date'],'registration_number')
.then(()=>{
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get('id');
    selectElements(getUrlParametr('id'),'http://localhost:3000/incidents/incident_get_intermediary','incident_number');
  });
