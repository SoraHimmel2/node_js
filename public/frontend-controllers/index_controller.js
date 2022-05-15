import { addListElements ,redirect} from '../libraries/async-functions.js'
const incidentUrl = 'http://localhost:3000/incidents/update_incident?id=';
const personUrl = 'http://localhost:3000/incidents/update_person?id=';
const incidentCreateUrl = 'http://localhost:3000/incidents/create_incident';
const personCreateUrl = 'http://localhost:3000/incidents/create_person';
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

});
addListElements('.list-items-ul', 'http://localhost:3000/incidents/get_all_persons', ['surname', 'name', 'patronymic'], 'registration_number')
.then(()=>{
    deleteSelect();
    addRedirectEvent(document.querySelectorAll('.list-items-ul .container-end-part li'),redirectToPerson);
    document.querySelector('.list-items').className = 'list-items-index';
    document.querySelector('body > div > div.block-content > div:nth-child(3) > div:nth-child(3) > button:nth-child(2)')
    .addEventListener('click',redirectToCreatePerson);
}

);

