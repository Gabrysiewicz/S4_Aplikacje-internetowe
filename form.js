const Username = document.getElementById('name');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const country = document.getElementById('country');
const countrys = document.getElementsByClassName('take-option');
const email = document.getElementById('email');
const tutorials = document.getElementsByClassName('checkbox-group');
const payments = document.getElementsByClassName('take-radio');

const form = document.getElementById('form');

let user_data = {
    name:'',
    surname:'',
    age:'',
    email:'',
    country:'',
    tutorials:[

    ],
    payments:'',
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(validateForm()){
        let userMsgBox = `Do you want to send the following data ?
        Name: ${user_data.name}
        Surname: ${user_data.surname}
        Age: ${user_data.age}
        Email: ${user_data.email}
        Country: ${user_data.country}`;
        userMsgBox += "\nTutorials: "
        for(let i = 0; i < user_data.tutorials.length; i++){
            userMsgBox += `${user_data.tutorials[i]}, `;
        }
        userMsgBox += `\nPayments: ${user_data.payments} `;
        if(confirm(userMsgBox)){
            document.getElementById('header-text').innerHTML = 'Thanks for your order';
        }
    }
})
let validateForm = () => {
    if(isName(Username.value)){
        user_data.name = Username.value;
        nameVerification = true;
    }else{
        document.getElementById('name-error').innerHTML = "Wprowadź poprawne imię.";
        nameVerification = false;
    }
    if(isSurname(surname.value)){
        user_data.surname = surname.value;
        surnameVerification = true;
    }else{
        document.getElementById('surname-error').innerHTML = "Wprowadź poprawne nazwisko.";
        surnameVerification = false;
    }
    if(isAge(age.value)){
        user_data.age = age.value;
        ageVerification = true;
    }else{
        document.getElementById('age-error').innerHTML = "Wprowadź poprawny wiek.";
        ageVerification = false;
    }
    if(isEmail(email.value)){
        user_data.email = email.value;
        emailVerification = true;
    }else{
        emailVerification = false;
        document.getElementById('email-error').innerHTML = "Wprowadź poprawny email.";
    }
    areCountrys(countrys);
    areTutorials(tutorials);
    arePayments(payments);
    if(nameVerification && surnameVerification && ageVerification && emailVerification){
        return true;
    }
}
let isName = (nameValue) =>{
    if(nameValue != ''){
        return /[A-Z]([a-z]){0,31}/.test(nameValue);
    }else{
        return false;
    }
}
let isSurname = (surname) =>{
    if(surname != ''){
        return /[A-Z]([a-z]){0,31}/.test(surname);
    }else{
        return false;
    }
}
let isAge = (age) =>{
    if(age != ''){
        return /([0-9]{3}|[0-9]{2})/.test(age);
    }else{
        return false;
    }
}
let isEmail = (email) =>{
    if(email != ''){
        return /^[a-zA-Z0-9_]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email);
    }else{
        return false;
    }
}
let areCountrys = (countrys) =>{
    for(let i = 0; i < countrys.length; i++){
        if(countrys[i].selected){
            user_data.country = countrys[i].value; 
        }
    }
}
let areTutorials = (tutorials) =>{
    for(let i = 0; i < tutorials.length; i++){
        if(tutorials[i].checked){
            user_data.tutorials.push(tutorials[i].value);
        }
    }
}
let arePayments = (payments) =>{
    for(let i = 0; i < payments.length; i++){
        if(payments[i].checked){
            user_data.payments = payments[i].value;
        }
    }   
}
for(let i = 0; i < tutorials.length; i++){
    tutorials[i].addEventListener('click', () => {
        let isAnyChecked = false;
        for(let j = 0; j < tutorials.length; j++){
            if(tutorials[j].checked){
                isAnyChecked = true;
            }
        }
        if(isAnyChecked){
            for(let h = 0; h < tutorials.length; h++)
            tutorials[h].required = false;
        }else{
            for(let h = 0; h < tutorials.length; h++)
            tutorials[h].required = true;
        }
    })
}
