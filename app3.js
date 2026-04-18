

const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const addBtn = document.getElementById("addBtn");
const deleteOneBtn = document.getElementById("deleteOneBtn");

const list = document.getElementById("nameList");

const masterView = document.getElementById("masterView");
const detailView = document.getElementById("detailView");

const editName = document.getElementById("editName");
const editAge = document.getElementById("editAge");

const saveBtn = document.getElementById("saveBtn");
const backBtn = document.getElementById("backBtn");

// data
let people = JSON.parse(localStorage.getItem("people")) || [];
let currentId = null;

// render master list
function renderList() {
    list.innerHTML = "";

    people.forEach(function(person) {
        const li = document.createElement("li");
        li.textContent = person.name + " - " + person.age;

        li.addEventListener("click", function () {
            openDetail(person.id);
        });

        list.appendChild(li);
    });
}

// switch views
function showMaster() {
    masterView.style.display = "block";
    detailView.style.display = "none";
}

function showDetail() {
    masterView.style.display = "none";
    detailView.style.display = "block";
}

// open detail view
function openDetail(id) {
    const person = people.find(p => p.id === id);

    currentId = id;
    editName.value = person.name;
    editAge.value = person.age;

    showDetail();
}

// add record
addBtn.addEventListener("click", function () {
    const name = nameInput.value;
    const age = ageInput.value;

    if (name === "" || age === "") return;

    const newPerson = {
        id: Date.now(),
        name: name,
        age: age
    };

    people.push(newPerson);

    localStorage.setItem("people", JSON.stringify(people));

    renderList();

    nameInput.value = "";
    ageInput.value = "";
});

// save edits
saveBtn.addEventListener("click", function () {
    const person = people.find(p => p.id === currentId);

    person.name = editName.value;
    person.age = editAge.value;

    localStorage.setItem("people", JSON.stringify(people));

    renderList();
    showMaster();
});

// back button
backBtn.addEventListener("click", function () {
    showMaster();
});

// initial load
renderList();
showMaster();

deleteOneBtn.addEventListener("click", function () {
    people = people.filter(function(person) {
        return person.id !== currentId;
    });

    localStorage.setItem("people", JSON.stringify(people));

    renderList();
    showMaster();
});





