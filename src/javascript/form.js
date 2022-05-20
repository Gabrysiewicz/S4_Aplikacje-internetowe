const form = document.getElementById('contact-form');
// +++ In This Order
    const cetegory = document.getElementById('category'); 
    // set default select option to 'other' bcs it doesn't require extensions to be loaded
    category.value = 'other';
    // used to track category switches
    let currentCategory = cetegory.value;
// --- 
// section handlers
const errorExtension = document.getElementById('error-extension');
const cooperateExtension = document.getElementById('cooperate-extension');
const socialsExtension = document.getElementById('socials-extension');
// form data-object handlers
const inputs = document.getElementsByClassName('take-input');
const select = document.getElementsByClassName('take-select')[0];
const options = select.getElementsByTagName('option');
const checkboxes = document.getElementsByClassName('take-checkbox');
const radios = document.getElementsByClassName('take-radio');
const textarea = document.getElementById('take-text');
// button handlers
const send = document.getElementById('send');
const preview = document.getElementById('preview');
const modify = document.getElementById('modify');
const remove = document.getElementById('remove');

form.addEventListener('submit', (e) => { // Validate and send form
    e.preventDefault();
    
    if(validateForm()){
        document.getElementById('feedback').classList.remove('text-approved');
        // document.getElementById('form-section').classList.add('form-approved');
        document.getElementById('feedback').classList.add('text-approved');
        form.reset()
    }
})
preview.addEventListener('click', (e) => { // Show last sended form
    // e.preventDefault();
    
    previewForm();
})
modify.addEventListener('click', (e) => { // Modify sended form
    // e.preventDefault();
    
    previewForm();
    disableForm(false);
})
remove.addEventListener('click', (e) => { // Modify sended form
    // e.preventDefault();
    disableForm(false);
    localStorage.setItem('user_form_json', '');
    alert("Data from Form has been deleted");
    form.reset();
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

        // let phonePattern = /^\+?[0-9]{2,3}(\ [0-9]{3}){3}/;

        // if(phonePattern.test(inputs[3].value)){
        //     user_data_form.phone = inputs[3].value;
        // }
        
        
        user_data_form.phone = inputs[3].value;

        user_data_form.category = currentCategory;
        switch(currentCategory){
            case 'website error':
            case 'content isnt correct':
            case 'website propositions':
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
                for(i = 0; i < radios.length; i++){
                    if(radios[i].checked)
                        user_data_form.business = radios[i].value;
                }
                break;
            default:

        }
        for(let i = 0; i < radios.length; i++){
            if(radios[i].selected)
            user_data_form.business = radios[i].value; 
        }
        
        user_data_form.text = textarea.value;
        localStorage.setItem('user_form_json', JSON.stringify(user_data_form));
        
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
        // if(phonePattern.test(inputs[3].value)){
        //     return confirm(userMsgBox);
        // }else{
        //     return alert("Your Phone number is incorrect.\n Start with + then 2 up to 3 digits and 3x3 digits separated with spaces\n Example: +48 111 222 333 or +123 456 789 012")
        // }
        return confirm(userMsgBox);
}
let previewForm = () =>{
    let userData = JSON.parse(localStorage.getItem('user_form_json'));
    for(i = 0; i < inputs.length; i++){
        inputs[i].value = userData[i];
        inputs[i].setAttribute('disabled', true);
    }
    category.value = userData.category;
    swapExtension();
    console.log(userData.category);
    switch(userData.category){
        case 'website error':
        case 'content isnt correct':
        case 'website propositions':
            for(i = 0; i < options.length; i++){ 
                for(j = 0; j < userData.subpages.length; j++){
                    if(options[i].value == userData.subpages[j])
                        options[i].selected = true;
                }
            }
            break;
        case 'social media error':
            for(i = 0; i < checkboxes.length; i++){
                for(j = 0; j < userData.socials.length; j++){
                    if(checkboxes[i].value == userData.socials[j])
                        checkboxes[i].checked = true;
                }
            }
            break;
        case 'I want to cooperate':
            for(i = 0; i < radios.length; i++){
                if(radios[i].value == userData.business){
                    radios[i].checked = true;
                }
            }
            break;
        default:
    }
    textarea.value = userData.text;
    disableForm(true);
}
let disableForm = (state) =>{
    if(state){
        for(i = 0; i < inputs.length; i++){
            inputs[i].setAttribute('disabled', true);
        }
        for(i = 0; i < options.length; i++){ 
            document.getElementById('category').setAttribute('disabled', true);
            options[i].setAttribute('disabled', true);
        }
        for(i = 0; i < checkboxes.length; i++){
            checkboxes[i].setAttribute('disabled', true);
        }
        for(i = 0; i < radios.length; i++){
            radios[i].setAttribute('disabled', true);
        }
        textarea.setAttribute('disabled', true);
        send.setAttribute('disabled', true);
    }else{
        for(i = 0; i < inputs.length; i++){
            inputs[i].removeAttribute('disabled');
        }
        for(i = 0; i < options.length; i++){ 
            document.getElementById('category').removeAttribute('disabled');
            options[i].removeAttribute('disabled');
        }
        for(i = 0; i < checkboxes.length; i++){
            checkboxes[i].removeAttribute('disabled');
        }
        for(i = 0; i < radios.length; i++){
            radios[i].removeAttribute('disabled');
        }
        textarea.removeAttribute('disabled');
        send.removeAttribute('disabled');
    }
}
// Fancy
const FormSection = document.getElementById('form-section');
let FormBgRed = 254;
let FormBgGreen = 254;
let FormBgBlue = 254;
let FormBgAlpha = .5;
let FormBgDeg = 90;
let FormColorDelta = 1;
let FormDegDelta = .5;
let rate = 1;
let rateLimit = 2;
let FormBgColor = `rgba( ${FormBgRed}, ${FormBgGreen}, ${FormBgBlue}, ${FormBgAlpha})`;
FormSection.style.background = "linear-gradient(90deg, rgba(200, 200, 200 ,1) 0%, rgba(255,255,255) 100%)";
let switchColors = () => {
    if(FormBgRed - FormColorDelta >= 1 && FormBgRed <= 254){
        FormBgRed -= FormColorDelta;
    }else
    if(FormBgGreen - FormColorDelta >= 1 && FormBgGreen <= 254){
        FormBgGreen -= FormColorDelta;
    }else
    if(FormBgBlue - FormColorDelta >= 1 && FormBgBlue <= 254){
        FormBgBlue -= FormColorDelta;
    }else{
        FormColorDelta = -FormColorDelta;
        FormBgRed -= FormColorDelta
        FormBgGreen -= FormColorDelta
        FormBgBlue -= FormColorDelta;
    }
    if(FormBgDeg > 360){
        FormBgDeg = 0;
    }
    FormBgDeg += FormDegDelta;
    FormBgColor = `rgba( ${FormBgRed}, ${FormBgGreen}, ${FormBgBlue}, ${FormBgAlpha})`;
    console.log(FormBgColor);
    FormSection.style.background = `linear-gradient(${FormBgDeg}deg, ${FormBgColor} 0%, rgba(255,255,255,1) 100%)`;
}
let animation = () =>{
    requestAnimationFrame(animation);
    if(rate % rateLimit == 0){
        switchColors();
        rate = 1;
    }
    rate++;
}
animation();