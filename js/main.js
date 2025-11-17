

const addWorkerBtn = document.getElementById('addWorkerBtn');
const addWorkerForm = document.getElementById('addWorkerForm');
const hideWorkerForme = document.getElementById('hideWorkerForme');
const cancelAddBtn = document.getElementById('canceladd');

const ul = document.getElementById('workerList');
const Name = document.getElementById('name');
const role = document.getElementById('role');
const photoInput = document.getElementById('photo');
const companyInput = document.getElementById('company');
const EroleInput = document.getElementById('Erole');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');



const errorname = document.getElementById('err_name');
const erroremail = document.getElementById('err_email');
const errorphone = document.getElementById('err_phone');
const errorselect = document.getElementById('err_select');
const errorcompany = document.getElementById('err_company');
const erroreRole = document.getElementById('err_role');
const errorfrom = document.getElementById('err_from');
const errorto = document.getElementById('err_to');


const photo  = document.getElementById('profileImg'); 

// =============== show/hide form ===============
cancelAddBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    addWorkerForm.style.display = 'none';
}); 


addWorkerBtn.addEventListener('click', function() {
    addWorkerForm.style.display = 'block';
});
hideWorkerForme.addEventListener('click', function() {
  addWorkerForm.style.display = 'none';
});




// =============== add workers ===============//

function addWorker() {
    if(!validateForm() )return;
    
 let li = document.createElement('li');
li.classList.add('listC');
li.innerHTML = `
    <div class="flex gap-6 h-[40px]">
        <!-- Profile Image -->
        <img src="${photoDataUrl}" alt="Photo" class="w-[40px] h-[40px] rounded-full border border-black" id="profileImg">
       
  <div>
    <div>${Name.value}</div>
    <div>${role.value}</div>
  </div>
</div>
  <button class="removeBtn text-red-500 font-bold ml-3">edit</button>
`;
ul.appendChild(li);
addWorkerForm.style.display = 'none';
Name.value = '';
role.value = '';
photoInput.value = ''
 photoDataUrl = '';

}

let photoDataUrl = '';


// =============== remove workers ===============//
// ul.addEventListener('click', function(event) {
//     if (event.target.classList.contains('removeBtn')) {
//         const li = event.target.closest('li');
//         ul.removeChild(li);
//     }
// });


// =============== add picture preview ===============//
photoInput.addEventListener('change', function() {
    const file = this.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoDataUrl = e.target.result; // Save DataURL globally
            const label = document.querySelector('label[for="photo"]');
            label.innerHTML = `<img src="${photoDataUrl}" alt="Profile Picture" class="w-full h-full object-cover">`;
        }
        reader.readAsDataURL(file);
    }
});


// ==================validation form ==================//
    // regex
    function validateForm() {
const allerrors = document.querySelectorAll('.color');
allerrors.forEach((error)=> {
  error.style.color='red'
  error.textContent=""
})
let isValid = true;

 const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^\+212[67]\d{8}$/;


if (Name.value.trim() === '' || !nameRegex.test(Name.value.trim())) {
    errorname.textContent = "Please enter a valid name (at least 3 letters).";
    isValid = false;
}   else {  
    errorname.textContent = "";
}   
if (companyInput.value.trim() === '') {
    errorcompany.textContent = "Company name is required.";
    isValid = false;
} else {
    errorcompany.textContent = "";
}   
if (EroleInput.value.trim() === '') {
    erroreRole.textContent = "Employee role is required.";
    isValid = false;
} else {
    erroreRole.textContent = "";
}
if (fromInput.value === '') {
    errorfrom.textContent = "Start date is required.";  
    isValid = false;
} else {
    errorfrom.textContent = "";
}   
if (toInput.value === '') {
    errorto.textContent = "End date is required.";
    isValid = false;
}
    else {
    errorto.textContent = "";
}
if(emailInput.value.trim() === '' || !emailRegex.test(emailInput.value.trim())) {
    erroremail.textContent = "Please enter a valid email address.";
    isValid = false;
} else {
    erroremail.textContent = "";
}
if(phoneInput.value.trim() === '' || !phoneRegex.test(phoneInput.value.trim())) {
    errorphone.textContent = "Please enter a valid Moroccan phone number (+2126XXXXXXXX or +2127XXXXXXXX).";
    isValid = false;
} else {
    errorphone.textContent = "";
}
if(role.value === '' || role.value === 'none') {
    errorselect.textContent = "Please select a role.";
    isValid = false;
} else {
    errorselect.textContent = "";
}
return isValid;
}


// ================== view worker form ==================//

photo.addEventListener('click', function(event) {
    event.preventDefault(); 
    addWorkerForm.style.display = 'black';
}); 
