


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

// ...........experience obj --------------------//
function getExperiencesArray() {
  const ul = document.getElementById('expr');
  let experiences = [];
  ul.querySelectorAll('li').forEach(li => {
    const company = li.querySelector('.company').value;
    const role    = li.querySelector('.Erole').value;
    const from    = li.querySelector('.From').value;
    const to      = li.querySelector('.To').value;
    experiences.push({
      company,
      role,
      from,
      to
    });
  });
  return experiences;
}



// =============== add workers ===============//
function addWorker() {
    if (!validateForm()) return;
    const experiences = getExperiencesArray();
    const worker = {
        fullname: fullname.value,
        role: role.value,
        img: inphoto.value,
        email: emailInput.value,
        phone: phoneInput.value,
        experiences: experiences,
        assignedSalle: null 
    };
    // Add to array
    workers.push(worker);
    // Save
    localStorage.setItem("workers", JSON.stringify(workers));
    // ONLY call renderWorkers (NO manual <li>)
    renderWorkers();
    document.getElementById("expr").innerHTML = "";
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
// if (companyInput.value.trim() === '') {
//     errorcompany.textContent = "Company name is required.";
//     isValid = false;
// } else {
//     errorcompany.textContent = "";
// }   
// if (EroleInput.value.trim() === '') {
//     erroreRole.textContent = "Employee role is required.";
//     isValid = false;
// } else {
//     erroreRole.textContent = "";
// }
// if (fromInput.value === '') {
//     errorfrom.textContent = "Start date is required.";  
//     isValid = false;
// } else {
//     errorfrom.textContent = "";
// }   
// if (toInput.value === '') {
//     errorto.textContent = "End date is required.";
//     isValid = false;
// }
//     else {
//     errorto.textContent = "";
// }
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

// ================ add experience ====================//
function addexpr() {
  const ul = document.getElementById('expr');
  let li = document.createElement('li');
  li.innerHTML = `
    <div class=" containex flex flex-col border items-center p-2 gap-4">
      <button class="removeBtn text-red-500 font-bold ml-3" type="button">X</button>
      <div class="flex flex-col w-[100%] ">
        <label>Company : </label>
        <input type="text" class="border rounded h-[30px] w-[100%] company" name="company">
      </div>
      <div class="flex flex-col w-[100%] ">
        <label>Role : </label>
        <input type="text" class="border rounded h-[30px] w-[100%] Erole" name="Erole">
      </div>
      <div class="flex flex-col w-[100%] ">
        <label>From : /label>
        <input type="date" class="border rounded h-[30px] w-[100%] From" name="from">
      </div>
      <div class="flex flex-col w-[100%] ">
        <label>TO : </label>
        <input type="date" class="border rounded h-[30px] w-[100%] To" name="to">
      </div>
    </div>
  `;
  li.querySelector(".removeBtn").addEventListener("click", function() {
    li.remove();
  });
  ul.appendChild(li);
}

// function renderWorkers() {
//   ul.innerHTML = '';
//   workers.forEach((worker, index) => {
//     let li = document.createElement('li');
//     li.classList.add('listC');
//     li.setAttribute('data-index', index);
//     li.innerHTML = `
//       <div class="flex gap-6 h-[40px]">
//         <img src="${worker.img}" class="w-[40px] h-[40px] rounded-full border border-black">
//         <div>
//           <div>${worker.fullname}</div>
//           <div>${worker.role}</div>
//         </div>
//       </div>
//       <div class="flex flex-col">
//         <button class="editBtn text-yellow-500 font-bold ml-3" data-index="${index}">edit</button>
//         <button class="deleteBtn text-red-500 font-bold ml-3" data-index="${index}">delete</button>
//       </div>
//     `;
//     ul.appendChild(li);
//   });
// }


// ul.addEventListener('click', function(event) {
//   const index = event.target.dataset.index;
//   if (event.target.classList.contains('deleteBtn')) {
//     if (confirm("Are you sure you want to delete this worker?")) {
//       workers.splice(index, 1);
//       localStorage.setItem("workers", JSON.stringify(workers));
//       renderWorkers();
//     }
//   }
// });


ul.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        const btn = event.target;
        const index = btn.getAttribute('data-index');
        // Remove from workers array
        workers.splice(index, 1);
        localStorage.setItem("workers", JSON.stringify(workers));
        renderWorkers(); // <-- Refreshes list & handlers!
    }
});



function showWorkerDetails(worker) {
    const viewWorkerForm = document.getElementById('viewWorkerForm');
    document.getElementById('viewName').textContent = worker.fullname;
    document.getElementById('viewRole').textContent = worker.role;
    document.getElementById('viewPhoto').src = worker.img || "";
    document.getElementById('viewEmail').textContent = worker.email || "";
    document.getElementById('viewPhone').textContent = worker.phone || "";
    let exHtml = "";
    worker.experiences.forEach(ex => {
        exHtml += `<div><b>${ex.role}</b> at ${ex.company} (${ex.from} - ${ex.to})</div>`;
    });
    document.getElementById("someExperienceDiv").innerHTML = exHtml;
    viewWorkerForm.style.display = 'block';
}



function renderWorkers() {
    ul.innerHTML = '';
    workers.forEach((worker, index) => {
        // Only show workers NOT assigned to any salle!
        if (worker.assignedSalle == null) {
            let li = document.createElement('li');
            li.classList.add('listC');
            li.setAttribute('data-index', index);
            li.innerHTML = `
                <div class="flex gap-6 h-[40px]">
                    <img src="${worker.img}" class="w-[40px] h-[40px] rounded-full border border-black" onerror="this.src='https://imgs.search.brave.com/r6rR4S_C_Mic8K3MxR-RPvLdyGS568a8undlqqT00_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDcv/MDY4LzgwNi9zbWFs/bC9jdXRlLWVuZ2lu/ZWVyLWNvbnN0cnVj/dGlvbi13b3JrZXIt/Y29uY2VwdC1oYW5k/LWRyYXduLWNhcnRv/b24tZnJlZS12ZWN0/b3IuanBn'">
                    <div>
                        <div>${worker.fullname}</div>
                        <div>${worker.role}</div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <button class="deleteBtn text-red-500 font-bold ml-3" data-index="${index}">delete</button>
                </div>
            `;
            li.addEventListener('click', function(e) {
                if (e.target.classList.contains('deleteBtn')) return;
                showWorkerDetails(worker);
            });
            ul.appendChild(li);
        }
    });
}







// ===============assign=========================//
const assignbtn = document.getElementById('hideassignForme')
const assign = document.getElementById('assignmentForme')
const showAssign = document.querySelectorAll('.div');

// showAssign.forEach(div => {
//   const plusBtn = div.querySelector('button');
//   if (plusBtn) {
//     plusBtn.addEventListener('click', function(event) {
//       event.preventDefault();
//       assign.style.display = 'block';
     
//     });
//   }
// });

assignbtn.addEventListener('click',function(e){
  e.preventDefault()
  assign.style.display ='none'
})
// showAssign.addEventListener('click',function(f){
//   f.preventDefault()
//   assign.style.display ='block'
// })


// --- SALLE NAMES ARRAY ---
const salleNames = [
    "Salle_de_conférence",
    "Salle_de_serveurs",
    "Salle_des_securete",
    "Salle_de_Réception",
    "Salle_de-stuff",
    "salle_de_vault"
];


// When "+" is clicked inside a salle, show assignment modal for that salle:
document.querySelectorAll('.div').forEach(div => {
    const plusBtn = div.querySelector('button');
    if (plusBtn) {
        plusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const salleId = div.id; // the id="Salle_de_conférence" etc
            showAssignModal(salleId);
        });
    }
});








function showAssignModal(salleId) {
    assign.style.display = 'block';
    assign.setAttribute('data-salle', salleId);

    // Map HTML id to Room_Rules key
    let roomName = salleIdToRoomName(salleId);

    const container = document.querySelector('.assign_comtainer');
    container.innerHTML = '';
    workers.forEach((worker, i) => {
        if (
            worker.assignedSalle == null &&
            Room_Rules[roomName] &&
            Room_Rules[roomName].includes(worker.role)
        ) {
            let item = document.createElement('div');
            item.classList.add('hello')
            item.innerHTML = `
            <div class="flex justify-between items-center w-[100%] p-8 gap-4">
            <img src="${worker.img}" class="w-[40px] h-[40px] rounded-full border border-black" onerror="this.src='https://imgs.search.brave.com/r6rR4S_C_Mic8K3MxR-RPvLdyGS568a8undlqqT00_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDcv/MDY4LzgwNi9zbWFs/bC9jdXRlLWVuZ2lu/ZWVyLWNvbnN0cnVj/dGlvbi13b3JrZXIt/Y29uY2VwdC1oYW5k/LWRyYXduLWNhcnRv/b24tZnJlZS12ZWN0/b3IuanBn'">
            <div class="flex flex-col gap-2 w-[80%] h-[30px] ">
               <p> ${worker.fullname}</p> <p>${worker.role}</p>
                </div>
                <button class="assignWorkerBtn text-blue-300 text-lg" data-i="${i}">Assign</button>
                </div>
            `;
            container.appendChild(item);
        }
    });

    container.querySelectorAll('.assignWorkerBtn').forEach(btn => {
        btn.addEventListener('click', function() {
            let idx = parseInt(btn.getAttribute('data-i'));
            assignWorkerToSalle(idx, salleId);
        });
    });
}





// Actually assign worker and update everything
function assignWorkerToSalle(idx, salleId) {
    workers[idx].assignedSalle = salleId;
    localStorage.setItem("workers", JSON.stringify(workers));
    renderWorkers();
    renderSalleMembers(salleId);
    assign.style.display = 'none';
}



function renderSalleMembers(salleId) {
    const salleDiv = document.getElementById(salleId);
    if (!salleDiv) return;
    const assignedDiv = salleDiv.querySelector('.assigned-workers');
    assignedDiv.innerHTML = '';
    workers.forEach((worker, i) => {
        if (worker.assignedSalle === salleId) {
            let item = document.createElement('div');
            item.className = 'w-fit'
            item.innerHTML = `
            <div class="flex w-[60px] flex-col items-center bg-white rounded-full">
                <div class="flex flex-col text-sm items-center ">
                <p>${worker.fullname}</p> <p>(${worker.role})</p>
                </div>
                <button class="unassignWorkerBtn text-red-500" data-i="${i}"><b>X</b></button>
                </div>
            `;
            item.querySelector('.unassignWorkerBtn').addEventListener('click', function() {
                workers[i].assignedSalle = null;
                localStorage.setItem("workers", JSON.stringify(workers));
                renderWorkers();
                renderSalleMembers(salleId);
            });
            assignedDiv.appendChild(item);
        }
    });
}

// Call renderSalleMembers(salleName) for each salle on page load & after every assignment!


assignbtn.addEventListener('click', function(e) {
    e.preventDefault();
    assign.style.display = 'none';
});


window.addEventListener('DOMContentLoaded', function() {
    renderWorkers();
    salleNames.forEach(renderSalleMembers);
});

const Room_Rules = {
  "Conference Room": ["IT Guy", "Receptionist", "Other", "Manager", "Cleaning"],
  "Servers Room": ["IT Guy", "Manager", "Cleaning"],
  "Security Room": ["Security", "Manager", "Cleaning"],
  "Reception": ["Receptionist", "Manager", "Cleaning", "Other"],
  "Staff Room": ["IT Guy", "Receptionist", "Security", "Cleaning", "Other", "Manager"],
  "Vault": ["Security", "Manager"]
};


function salleIdToRoomName(salleId) {
    switch(salleId) {
        case 'Salle_de_conférence': return 'Conference Room';
        case 'Salle_de_serveurs': return 'Servers Room';
        case 'Salle_des_securete': return 'Security Room';
        case 'Salle_de_Réception': return 'Reception';
        case 'Salle_de-stuff': return 'Staff Room';
        case 'salle_de_vault': return 'Vault';
        default: return '';
    }
}



function renderSalleMembers(salleId) {
    const salleDiv = document.getElementById(salleId);
    if (!salleDiv) return;
    const assignedDiv = salleDiv.querySelector('.assigned-workers');
    assignedDiv.innerHTML = '';
    workers.forEach((worker, i) => {
        if (worker.assignedSalle === salleId) {
            let item = document.createElement('div');
            item.className = 'w-fit';

            item.innerHTML = `
                <div class="flex w-[60px] flex-col items-center bg-white rounded-full room-worker-card cursor-pointer">
                    <div class="flex flex-col text-sm items-center ">
                        <p>${worker.fullname}</p> <p>(${worker.role})</p>
                    </div>
                    <button class="unassignWorkerBtn text-red-500" data-i="${i}"><b>X</b></button>
                </div>
            `;
            
            // Show worker details on card click (like sidebar)
            item.querySelector('.room-worker-card').addEventListener("click", function(e) {
                // Prevent show if 'X' is clicked!
                if (e.target.classList.contains('unassignWorkerBtn')) return;
                showWorkerDetails(worker);
            });
            
            // Un-assign button
            item.querySelector('.unassignWorkerBtn').addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent triggering details popup
                workers[i].assignedSalle = null;
                localStorage.setItem("workers", JSON.stringify(workers));
                renderWorkers();
                renderSalleMembers(salleId);
            });
            assignedDiv.appendChild(item);
        }
    });
}







