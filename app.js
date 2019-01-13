"use strict";

    const closeBtn = mySelector('.js-btn-close');
    const createBtn = mySelector('.js-btn-create');
    const createForm = mySelector('.js-form');
    const contactArr = [];
    const saveBtn = mySelector('.js-btn-save');
    const table = mySelector('.table-responsive');    
    const tableBody = document.querySelector('tbody');
    const updateBtn = mySelector('.js-btn-update');

    class Contact {
        constructor(id, name, number, gender, category, country) {
            this.id = id;
            this.name = name;
            this.number = number;
            this.gender = gender;
            this.category = category;
            this.country = country;
        }

    }
          
    createBtn.addEventListener('click', () => openForm());

    closeBtn.addEventListener('click', () => removeForm());

    saveBtn.addEventListener('click', () => contactSubmit());
    
    function contactSubmit() {  
        let id = mySelector('#primaryKey').value;
        let name = mySelector('#name').value || '-';
        let number = mySelector('#number').value || '-';
        let gender = document.querySelector('input[name="gender"]:checked').value || '';
        let category = document.querySelectorAll('input[name="category"]:checked');
        let arr = [];        
        if(category.length > 0) {
            for(var i = 0; i < category.length; i++) {
                arr.push(category[i].value);
            }
        } else {
            arr = '-';
        }
        let country = mySelector('#country').value || '-';

        if(id > contactArr.length) {
            let person = new Contact(id, name, number, gender, arr, country);
            contactArr.push(person);
            let data = '';
            if(contactArr.length > 0) {
                table.classList.remove('hide');
                for(let j = 0; j < contactArr.length; j++) {
                    const {id: a, name: b, number: c, gender: d, country: e} = contactArr[j];            
                        data += `
                        <tr id="tr${a}">
                            <td class="text-capitalize">${b}</td>
                            <td>${c}</td>
                            <td class="text-capitalize">${d}</td>
                            <td class="text-capitalize">${e}</td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-primary js-btn-update" onclick="updateForm(${a})">
                                        Update Contact
                                    </button>
                                    <button class="btn btn-danger js-btn-delete" onclick="deleteContact(${a})">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;             
                }        
            }
            removeForm();        
            return tableBody.innerHTML = data;
        } else {
            let i = id - 1;
            contactArr[i].name = name;
            contactArr[i].number = number;
            contactArr[i].gender = gender;
            contactArr[i].category = arr;
            contactArr[i].country = country;
            let tableRow =document.querySelectorAll('tbody > tr');
            for(let j = 0; j < tableRow.length; j++){
                if(tableRow[j].getAttribute('id')[2] == id){
                    tableRow[j].innerHTML = `
                        <td class="text-capitalize">${contactArr[i].name}</td>
                        <td>${contactArr[i].number}</td>
                        <td class="text-capitalize">${contactArr[i].gender}</td>
                        <td class="text-capitalize">${contactArr[i].country}</td>
                        <td>
                                <div class="btn-group">
                                    <button class="btn btn-primary js-btn-update" onclick="updateForm(${id})">
                                        Update Contact
                                    </button>
                                    <button class="btn btn-danger js-btn-delete"  onclick="deleteContact(${id})">
                                        Delete
                                    </button>
                                </div>
                            </td>
                    `
                    break;
                }
            };            
            removeForm();
        }
        // let arr = [];
        // for(var i = 0; i < category.length; i++) {
        //     arr.push(category[i].value);
        // }
        // let gender = document.getElementsByName('gender');
        // for(var i = 0; i < gender.length; i++) {
        //     if(gender[i].checked) {
        //         gender = gender[i].value;
        //         break;
        //     }
        // }

        // alert(gender);
    }

    function deleteContact(id) {
        for(let i = 0; i < contactArr.length; i++) {
            if(contactArr[i].id == id) {
                let ind = contactArr.indexOf(contactArr[i]);
                contactArr.splice(ind, 1);
                let tableRow =document.querySelectorAll('tbody > tr');
                tableRow[ind].remove();
                if(contactArr.length <= 0) {
                    table.classList.add('hide');
                }
                break;
            }
        }        
    }

    function mySelector(selector) {
        let firstChar = selector[0];
        if(firstChar === '.'){
            return document.querySelector(selector);
        } else if(firstChar === '#') {
            let char = selector.substr(1);
            return document.getElementById(char);
        } else {
            console.log('This is either class nor id');
        }
        
    }
    
    function openForm(){
        createBtn.classList.add('hide');
        createForm.classList.add('show');
    }

    function removeForm() {
        createBtn.classList.remove('hide');
        createForm.classList.remove('show');

        mySelector('#primaryKey').value = contactArr.length + 1;
        mySelector('#name').value = '';
        mySelector('#number').value = '';
        document.querySelector('input[name="gender"]').checked = true;
        let emptyCategory =  document.querySelectorAll('input[name="category"]');
        for (let k= 0; k <emptyCategory.length; k++){
            if(emptyCategory[k].checked === true) {
                emptyCategory[k].checked = false;
            }
        }
        mySelector('#country').value = '';

    }    

    function updateForm(id) {
        let person;
        for(let i = 0; i < contactArr.length; i++) {
            if(contactArr[i].id == id) {
                person = contactArr[i];
                break;
            }
        }

        openForm();

        const {id: a, name: b, number: c, gender: d, category: e, country: f} = person;
        mySelector('#primaryKey').value = a;
        mySelector('#name').value = b;
        mySelector('#number').value = c;
        let radio = document.querySelectorAll('input[name="gender"]');
        for(let u = 0; u < radio.length; u++) {
            if(radio[u].value == d){
                radio[u].checked = true;
                break;
            }
        }
        let category =  document.querySelectorAll('input[name="category"]');
        if(e.length > 0) {
            for (let k= 0; k < category.length; k++){
                for(let l= 0; l< e.length; l++) {
                    if(category[k].value == e[l]) {
                        category[k].checked = true;
                    }
                }
            }
        }
        
        mySelector('#country').value = f;

        
    }



    
