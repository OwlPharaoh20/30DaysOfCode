// Function to get notes from localStorage
function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Function to save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to render the notes in the DOM
function renderNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Clear the current list

    const notes = getNotes();
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center';

        const span = document.createElement('span');
        span.textContent = note;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'text-red-500 hover:text-red-700';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteNote(index);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

// Function to add a new note
function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        const notes = getNotes();
        notes.push(noteText);
        saveNotes(notes);
        renderNotes();
        noteInput.value = ''; // Clear input field
    }
}

// Function to delete a note
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes();
}

// Add event listener to the "Add Note" button
document.getElementById('addNoteBtn').addEventListener('click', addNote);

// Initial render of notes on page load
document.addEventListener('DOMContentLoaded', renderNotes);


/*
good, it  worked, retaining the existing code, 
write me  codes (HTML button + JS function), 
to clear all the listed notes at once.
Position the button at the top,  before the Notes list 
 don't forget to retain the current code,
  just write me new ones so i add them accordingly
*/