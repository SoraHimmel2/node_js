import { addListElements ,redirect, sendData} from '../libraries/async-functions.js'
const incidentUrl = 'http://localhost:3000/incidents/update_incident?id=';
const personUrl = 'http://localhost:3000/incidents/update_person?id=';
const incidentCreateUrl = 'http://localhost:3000/incidents/create_incident';
const personCreateUrl = 'http://localhost:3000/incidents/create_person';

const firstButton = document.querySelector('.person-button');
firstButton.addEventListener('click',addGetIncidents);

const secondButton = document.querySelector('.incident-button');
secondButton.addEventListener('click',addIncidentCount);

function addGetIncidents(){
    const input = document.querySelector('.person-input');
    const url = 'http://localhost:3000/incidents/person_incidents';
    getPersonIncidentsCount(input,url);
}
function addIncidentCount(){
    const url = 'http://localhost:3000/incidents/incident_count';
    const firstDate = document.querySelector('.firstIncidentInput');
    const secondDate = document.querySelector('.secondIncidentInput');
    getIncidentCount(firstDate,secondDate,url);
}

function deleteSelect(){
    document.querySelectorAll('.list-items-select').forEach(
        (element)=>{element.remove();}
    )
}
function addRedirectEvent(elements,redirectType){
    
    elements.forEach(
        (element)=>{
            element.addEventListener('click',redirectType);
            // element.addEventListener('click',redirect);
            // element.addEventListener('click',redirect);
        }
    );

}
function redirectToCreateIncident(){
    redirect(incidentCreateUrl);
}
function redirectToCreatePerson(){
    redirect(personCreateUrl);
}
function redirectToIncident(event){
    const element = event.target;
    const listItem =  element.parentElement.parentElement;
    const listItemId = listItem.firstElementChild.textContent.trim();

    console.log('redirect');
    console.log(incidentUrl+listItemId);
    window.location.href = incidentUrl+listItemId;
}
function redirectToPerson(event){
    const element = event.target;
    const listItem =  element.parentElement.parentElement;
    const listItemId = listItem.firstElementChild.textContent.trim();

    console.log('redirect');
    console.log(personUrl+listItemId);
    window.location.href = personUrl+listItemId;
}

addListElements('.list-items-ul','http://localhost:3000/incidents/get_all_incidents',['description','registration_date'],'registration_number')
.then(()=>{
    const listElement = document.querySelector('.list-items-ul');
    listElement.className = 'incident-list-ul';
    deleteSelect();
    addRedirectEvent(document.querySelectorAll('.incident-list-ul .container-end-part li'),redirectToIncident);
    document.querySelector('.list-items').className = 'list-items-index';
    document.querySelector('body > div > div.block-content > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)')
    .addEventListener('click',redirectToCreateIncident);
    const button = document.querySelector('body > div > div.block-content > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)');
    console.log(button);
    button.addEventListener('click',firstButtonDelete);

});
addListElements('.list-items-ul', 'http://localhost:3000/incidents/get_all_persons', ['surname', 'name', 'patronymic'], 'registration_number')
.then(()=>{
    deleteSelect();
    addRedirectEvent(document.querySelectorAll('.list-items-ul .container-end-part li'),redirectToPerson);
    document.querySelector('.list-items').className = 'list-items-index';
    document.querySelector('body > div > div.block-content > div:nth-child(3) > div:nth-child(3) > button:nth-child(2)')
    .addEventListener('click',redirectToCreatePerson);
    const button = document.querySelector('body > div > div.block-content > div:nth-child(3) > div:nth-child(3) > button:nth-child(1)');
    button.addEventListener('click',secondButtonDelete);

}

);
function firstButtonDelete(){
    const url = 'http://localhost:3000/incidents/delete_incident';
    deleteElements('.incident-list-ul .container-end-part',url);
}
function secondButtonDelete(){
    const url = 'http://localhost:3000/incidents/delete_person';
    deleteElements('.list-items-ul .container-end-part',url);
}

async function deleteElements(listElementSelector,deleteUrl){
    let elements = document.querySelectorAll(listElementSelector);
    
    const parts = [];
    elements.forEach(element => {
        if (element.firstElementChild.checked) {
            let parentElement = element.parentElement;
            let part = { id: parentElement.firstElementChild.textContent.trim()};
            parts.push(part);
            element.parentElement.remove();
        }
     

    });
    console.log(parts);
    const result =   await sendData(parts,deleteUrl);
     console.log(result);
    
    
}
async function getPersonIncidentsCount(input,dispatchUrl){
    if (!input.value){
        console.log('bad input');
        alert('Ошибка ввода')
    }else{
    const result = await sendData({id:input.value},dispatchUrl);
    alert(`Количество инцидентов -> ${result}`);
    }
}

async function getIncidentCount(firstDate,secondDate,dispatchUrl){
    if (!firstDate.value || !secondDate.value){
        console.log('bad input');
        alert('Ошибка ввода')
    }else{
    const result = await sendData({firstDate:firstDate.value,secondDate:secondDate.value},dispatchUrl);
    alert(`Количество инцидентов -> ${result[0]['count']}`);
    }
}