const form = document.getElementById('contact-form');
const cetegory = document.getElementById('category'); 
// set default select option to other bcs it doesn't require extensions to be loaded
category.value = 'other';
// used to track category swithes
let currentCategory = cetegory.value;
// section handlers
const errorExtension = document.getElementById('error-extension');
const cooperateExtension = document.getElementById('cooperate-extension');
const socialsExtension = document.getElementById('socials-extension');
// button handlers
const send = document.getElementById('send');
const preview = document.getElementById('preview');
const modify = document.getElementById('modify');
// form data-object handlers
const inputs = document.getElementsByClassName('take-input');
const select = document.getElementsByClassName('take-select')[0];
const options = select.getElementsByTagName('option');
const checkboxes = document.getElementsByClassName('take-checkbox');
const radios = document.getElementsByClassName('take-radio');
  
// const FormSection = document.getElementById('form-section');
// FormSection.addEventListener('resize', () => {
//     console.log("XD");
//     FormSection.style.height = `${window.innerHeight}px`;
//     console.log(FormSection.style.height);
// })
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(validateForm()){
        document.getElementById('form-section').classList.add('form-approved');
        document.getElementById('feedback').classList.add('text-approved');
        form.reset()
    }
})

// Hides unneeded extensions 
let hideUnneeded = () => {
    errorExtension.style.display = 'none';
    cooperateExtension.style.display = 'none';
    socialsExtension.style.display = 'none';

    select.required = false;
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].required = false;
    }
    for(let i = 0; i < radios.length; i++){
        radios[i].required = false;
    }
}
// All extensions are "loaded on load" 
// so we run it once to hide em
hideUnneeded();

// Load additional extensions and hides unneeded
let switchRequiredCheckbox = () => {
    isAnyChecked = false;
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked == true){
            isAnyChecked = true;
        }
    }
    if(isAnyChecked){
        for(let i = 0; i < checkboxes.length; i++){
            checkboxes[i].required = false;
        }
    }else{
        for(let i = 0; i < checkboxes.length; i++){
            checkboxes[i].required = true;
        }
    }
}
let swapExtension = () =>{
    if(category.value != currentCategory){
        hideUnneeded();
        if(category.value === 'website error' || category.value === 'content isnt correct' || category.value === 'website propositions'){
            errorExtension.style.display = 'flex';
            select.required = true;
        }else if(category.value === 'I want to cooperate' ){
            cooperateExtension.style.display = 'flex';
            for(let i = 0; i < radios.length; i++){
                radios[i].required = true;
            }
        }else if(category.value === 'social media error' ){
            socialsExtension.style.display = 'flex';
            for(let i = 0; i < checkboxes.length; i++){
                checkboxes[i].required = true;
                checkboxes[i].addEventListener('click', switchRequiredCheckbox);
            }
        }
        currentCategory = category.value;
    }
}
category.addEventListener('click', swapExtension);

let validateForm = () => {
        let user_data_form = {
            name: '',
            surname: '',
            email: '',
            phone: '',
            category: '',
            subpages: [
            
            ],
            socials:[

            ],
            business: '',
            text:''
        };
        for(let i = 0; i < inputs.length; i++){ // collects data from <input>s
            user_data_form[i] = inputs[i].value;
        }
        user_data_form.name = inputs[0].value;
        user_data_form.surname = inputs[1].value;
        user_data_form.email = inputs[2].value;
        user_data_form.phone = inputs[3].value;
        switch(currentCategory){
            case 'website error':
            case 'content isnt correct':
            case 'website propositions':
                user_data_form.category = currentCategory;
                for(let i = 0; i < options.length; i++){ // collects data from <select>
                    if(options[i].selected)
                    user_data_form.subpages.push(options[i].value);
                }
                break;
            case 'social media error':
                for(let i = 0; i < checkboxes.length; i++){ // collects data from checkboxes
                    if(checkboxes[i].checked){
                        user_data_form.socials.push(checkboxes[i].value);
                    }
                }
                break;
            case 'I want to cooperate':
                user_data_form.business.push(radios.value);
                break;
            default:
                console.log("switch error");

        }
        for(let i = 0; i < radios.length; i++){
            if(radios[i].selected)
            user_data_form.business = radios[i].value; 
        }
        let textarea = document.getElementById('take-text');
        user_data_form.text = textarea.value;
        localStorage.setItem('user_form_json', user_data_form);
        console.log(localStorage.getItem('user_form_json'));
        
        let userMsgBox = "Do you want to send following data ?";
        userMsgBox += `\nName:${user_data_form.name}`;
        userMsgBox += `\nSurname${user_data_form.surname}`;
        userMsgBox += `\nEmail:${user_data_form.email}`;
        userMsgBox += `\nPhone:${user_data_form.phone}`;
        userMsgBox += `\nCategory:${user_data_form.category}`;
        userMsgBox += `\nSubpages:`;
        for(let i = 0; i < user_data_form.subpages.length; i++){ // collects data from <select>
            if(user_data_form.subpages[i] != '')
            userMsgBox += `${user_data_form.subpages[i]}, `;
        }
        userMsgBox += `\nSocials:`;
        for(let i = 0; i < user_data_form.socials.length; i++){
            if(user_data_form.socials[i] != '')
            userMsgBox += `${user_data_form.socials[i]}. `;
        }
        userMsgBox += `\nBusiness:${user_data_form.business}`;
        userMsgBox += `\nMessage:\n${user_data_form.text}`;
        return confirm(userMsgBox);
}