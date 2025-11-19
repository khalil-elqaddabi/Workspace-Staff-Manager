

const addWorkerBtn = document.getElementById('addWorkerBtn');
const addWorkerForm = document.getElementById('addWorkerForm');
const hideWorkerForme = document.getElementById('hideWorkerForme');
const cancelAddBtn = document.getElementById('canceladd');
const viewWorkerForm = document.getElementById('viewWorkerForm');
const hideviewerForme = document.getElementById('hideviewerForme');

const ul = document.getElementById('workerList');
const fullname = document.getElementById('name');
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


const inphoto  = document.getElementById('inputphoto');
const upphoto  = document.getElementById('loudingphoto');
const edit = document.querySelector('.edit'); 


// ===================== locale storyge =======================//
let workers = JSON.parse(localStorage.getItem("workers")) || [];

// =============== show/hide form ===============
cancelAddBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    addWorkerForm.style.display = 'none';
}); 




addWorkerBtn.addEventListener('click', function() {
  // document.body.classList.add("hidden")
    // document.body.style.display = 'none'
    addWorkerForm.style.display = 'block';
});
hideWorkerForme.addEventListener('click', function() {
    // document.body.style.display = 'block'

  addWorkerForm.style.display = 'none';
      // document.body.classList.remove("hidden")


});
// ================= hide view worker form ==================//
hideviewerForme.addEventListener('click', function() {
  viewWorkerForm.style.display = 'none';
}   );


inphoto.addEventListener("input" , changeImage);
function changeImage(){
   
 upphoto.setAttribute("src",inphoto.value.trim());

}


// =============== add workers ===============//
function addWorker() {
    if (!validateForm()) return;

    // Create worker object
    const worker = {
        fullname: fullname.value,
        role: role.value,
        img: inphoto.value,
        company: companyInput.value,
        exrole: EroleInput.value,
        from: fromInput.value,
        to: toInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    // Add to array
    workers.push(worker);

    // Save
    localStorage.setItem("workers", JSON.stringify(workers));

    // Add to UI
    let li = document.createElement('li');
    li.classList.add('listC');

    li.innerHTML = `
        <div class="flex gap-6 h-[40px]">
            <img src="${worker.img}" class="w-[40px] h-[40px] rounded-full border border-black">
            <div>
                <div>${worker.fullname}</div>
                <div>${worker.role}</div>
            </div>
        </div>
        <div class="flex flex-col">
            <button class="editBtn text-yellow-500 font-bold ml-3">edit</button>
            <button class="deleteBtn text-red-500 font-bold ml-3">delete</button>
        </div>
    `;

    ul.appendChild(li);

    addWorkerForm.style.display = 'none';
    clearForm();
}
// 
function clearForm() {
  fullname.value = '';
  role.value = 'none';
  inphoto.value = '';
  loudingphoto.src = '';
  companyInput.value = '';
  EroleInput.value = '';
  fromInput.value = '';
  toInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  document.querySelectorAll('.color').forEach(el => el.textContent = "");
}





// =============== remove workers ===============//
// ul.addEventListener('click', function(event) {
//     if (event.target.classList.contains('removeBtn')) {
//         const li = event.target.closest('li');
//         ul.removeChild(li);
//     }
// });





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


if (fullname.value.trim() === '' || !nameRegex.test(fullname.value.trim())) {
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









