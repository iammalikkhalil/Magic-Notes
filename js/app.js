console.log("Welcome to notes app. This is app.js");
showNotes();

let updateIndex = null;

// If user adds a note, add it to the localStorage
document.getElementById("addBtn").addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let addImportant = document.getElementById("addImportant").checked;

    if (addTitle.value === "") {
        alert("Title cannot be empty");
        return;
    }

    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        important: addImportant
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    document.getElementById("addImportant").checked = false;
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    let html = notesObj.map((element, index) => {
        return `
            <div class="noteCard my-2 mx-2 card ${element.important ? 'border-danger' : ''}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
                    <button id="${index}" onclick="editNote(${index})" class="btn btn-secondary">Edit Note</button>
                </div>
            </div>`;
    }).join("");

    let notesElm = document.getElementById("notes");
    notesElm.innerHTML = notesObj.length ? html : 'Nothing to show! Use "Add a Note" section above to add notes.';
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Function to edit a note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    updateIndex = index;
    document.getElementById("updateTitle").value = notesObj[index].title;
    document.getElementById("updateTxt").value = notesObj[index].text;
    document.getElementById("updateImportant").checked = notesObj[index].important;

    $('#updateModal').modal('show');
}

// Update note
document.getElementById("updateBtn").addEventListener("click", function () {
    let updateTxt = document.getElementById("updateTxt").value;
    let updateTitle = document.getElementById("updateTitle").value;
    let updateImportant = document.getElementById("updateImportant").checked;

    if (updateTitle === "") {
        alert("Title cannot be empty");
        return;
    }

    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    notesObj[updateIndex] = {
        title: updateTitle,
        text: updateTxt,
        important: updateImportant
    };

    localStorage.setItem("notes", JSON.stringify(notesObj));
    $('#updateModal').modal('hide');
    showNotes();
});

document.getElementById('searchTxt').addEventListener("input", function () {
    let inputVal = this.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(element => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        element.style.display = cardTxt.includes(inputVal) ? "block" : "none";
    });
});