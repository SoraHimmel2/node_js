

async function sendData(data, url) {
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        // console.log(JSON.stringify(data));
        const dat = await response.json();
        return dat;

    } catch (error) {
        console.log(error);
    }
}
function getFormData(form) {
    const formEntries = new FormData(form);
    const formData = Object.assign(...Array.from(formEntries, ([name, value]) => ({ [name]: value })));
    return formData;
}

function createListElement(id, listItems) {
    let middlePart = `<div class="container-end-part">
    <input id="data" class="list-items-checkbox" type="checkbox">
    `

    let endPart =
        ` <select class="list-items-select">
            <option value="Виновник">
                Виновник
            </option>
            <option value="Потерпевший">
                Потерпевший
            </option>
            <option value="Подозреваемый">
                Подозреваемый
            </option>
            <option value="Свидетель">
                Свидетель
            </option>

        </select>
        </div>
        </div>` ;
    let firstPart =
        `<div class="list-items-container">
     <div class="container-start-part">
        ${id}
    </div>`
    listItems.forEach(element => {
        middlePart += `<li>${element}</li>`;
    });
    return firstPart + middlePart + endPart;
}
function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
async function addListElements(parentSelector, url, rowKeys, rowId) {
    let result = await sendData({ type: 'get_elements' }, url);

    console.log(result);
    result.forEach(element => {
        let liElements = [];
        rowKeys.forEach(key => {
         //   console.log(element[key]);
            liElements.push(element[key]);
        });
       // console.log(liElements);

        document.querySelector(parentSelector).appendChild(htmlToElement(createListElement(element[rowId], liElements)));


    });



}

async function dispatchData(formUrl, intermediaryUrl, formData,listElementSelector) {
    const resultId = await sendData(formData, formUrl);
    console.log(resultId);
    if (resultId.result != 'already-exist') {
        const parts = [];
        let elements = document.querySelectorAll(listElementSelector);
        elements.forEach(element => {
            if (element.firstElementChild.checked) {
                let parentElement = element.parentElement;
                let part = { id: parentElement.firstElementChild.textContent.trim(), guilty: element.lastElementChild.value }

                parts.push(part);
            }


        });
        let resultArray = { id_number: resultId.registration_number, rows: parts };
        const dispatchResult = await sendData(resultArray, intermediaryUrl);
        return dispatchResult;
    }
    alert('ошибка введеные данные уже существуют');
    return false;
  
}
function restrictInput(select,input){
    if(select.value != 'Удовлетворено ходотайство об возбуждении уголовного дела.'){
        input.disabled = true;
    }else{
        input.disabled = false;
    }
}

function redirect(url){
    window.location.href = url;
}
async function selectElements(requestId,requestUrl,element){
   const result = await sendData({id:requestId},requestUrl);
   console.log(result);
}

export {
    sendData,
    getFormData,
    htmlToElement,
    createListElement,
    addListElements,
    dispatchData,
    restrictInput,
    redirect,
    selectElements,
    
}