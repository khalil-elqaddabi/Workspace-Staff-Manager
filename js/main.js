

const addWorkerBtn = document.getElementById('addWorkerBtn');
const addWorkerForm = document.getElementById('addWorkerForm');
const hideWorkerForme = document.getElementById('hideWorkerForme');
const cancelAddBtn = document.getElementById('canceladd');

const ul = document.getElementById('workerList');
const nam = document.getElementById('name');
const role = document.getElementById('role');


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




// add workers

function addWorker() {
 let li = document.createElement('li');
li.classList.add('listC');
li.innerHTML = `
  <div>
    <div>${nam.value}</div>
    <div>${role.value}</div>
  </div>
  <button class="removeBtn text-red-500 font-bold ml-3">edit</button>
`;
ul.appendChild(li);
addWorkerForm.style.display = 'none';
nam.value = '';
role.value = '';


}