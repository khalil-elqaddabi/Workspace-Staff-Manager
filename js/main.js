

const addWorkerBtn = document.getElementById('addWorkerBtn');
const addWorkerForm = document.getElementById('addWorkerForm');
const hideWorkerForme = document.getElementById('hideWorkerForme');
const cancelAddBtn = document.getElementById('canceladd');
const viewWorkerForm = document.getElementById('viewWorkerForm');
const hideviewerForme = document.getElementById('hideviewerForme');

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
const edit = document.querySelector('.edit'); 

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
// ================= hide view worker form ==================//
hideviewerForme.addEventListener('click', function() {
  viewWorkerForm.style.display = 'none';
}   );





// =============== add workers ===============//
function addWorker() {
  if (!validateForm()) return;

  if (currentEditingWorker) {
    // EDIT MODE: Update existing worker
    currentEditingWorker.dataset.name = Name.value;
    currentEditingWorker.dataset.role = role.value;
    currentEditingWorker.dataset.photo = photoDataUrl;
    
    currentEditingWorker.innerHTML = `
      <div class="flex gap-6 h-[40px]">
        <img src="${photoDataUrl}" alt="Photo" class="w-[40px] h-[40px] rounded-full border border-black">
        <div>
          <div>${Name.value}</div>
          <div>${role.value}</div>
        </div>
      </div>
      <button class="editBtn text-red-500 font-bold ml-3">edit</button>
    `;
    currentEditingWorker = null; // Reset after editing
  } else {
    // ADD MODE: Create new worker
    let li = document.createElement('li');
    li.classList.add('listC');
    li.dataset.name = Name.value;
    li.dataset.role = role.value;
    li.dataset.photo = photoDataUrl;

    li.innerHTML = `
      <div class="flex gap-6 h-[40px]">
        <img src="${photoDataUrl}" alt="Photo" class="w-[40px] h-[40px] rounded-full border border-black">
        <div>
          <div>${Name.value}</div>
          <div>${role.value}</div>
        </div>
      </div>
      <div class="flex flex-col">
      <button class="editBtn text-yellow-500 font-bold ml-3">edit</button>
      <button class="deleteBtn text-red-500 font-bold ml-3">delete</button>
      </div>
      
    `;
    ul.appendChild(li);
  }

  // Clear form
  addWorkerForm.style.display = 'none';
  Name.value = '';
  role.value = '';
  photoInput.value = '';
  photoDataUrl = '';
  const label = document.querySelector('label[for="photo"]');
  if (label) label.innerHTML = '';
}
let currentEditingWorker = null; // To track the worker being edited

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

ul.addEventListener('click', function(event) {
  if (event.target.classList.contains('editBtn')) {
    const workerItem = event.target.closest('li.listC');
    if (workerItem) {
      currentEditingWorker = workerItem;
      Name.value = workerItem.dataset.name;
      role.value = workerItem.dataset.role;
      photoDataUrl = workerItem.dataset.photo;
      const label = document.querySelector('label[for="photo"]');
      if (label && photoDataUrl)
        label.innerHTML = `<img src="${photoDataUrl}" alt="Profile Picture" class="w-full h-full object-cover">`;
      addWorkerForm.style.display = 'block';
    }                                                                   
  } else if (event.target.closest('li.listC') && !event.target.classList.contains('editBtn')) {
    // Only show view form if NOT clicking the edit button
    const workerItem = event.target.closest('li.listC');
    if (workerItem) {
      document.getElementById('viewName').textContent = workerItem.dataset.name;
      document.getElementById('viewRole').textContent = workerItem.dataset.role;
      document.getElementById('viewPhoto').src = workerItem.dataset.photo;
      viewWorkerForm.style.display = 'block';
    }
  }
});


// ==========remove worker ==============//
function removecard() {
  if (currentEditingWorker) {
    // Ask for confirmation
    if (confirm('Are you sure you want to remove this worker?')) {
      // Remove the <li> from the list
      currentEditingWorker.remove();
      
      // Reset the variable
      currentEditingWorker = null;
      
      // Hide the view form
      viewWorkerForm.style.display = 'none';
    }
  } else {
    alert('No worker selected to remove');
  }
}

