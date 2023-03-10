import { useState, useEffect, React } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


function App() {

  function addNote() {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      date: Date.now(),
    };

    setNoteList([newNote, ...noteList]);
    setNewNoteAdded(true);
  }

  const deleteNote = (idToDelete) => {
    const newNoteList = noteList.filter((note) => note.id !== idToDelete);
    localStorage.removeItem(activeNote.id);
    setNoteList(newNoteList);
    setActiveNote(newNoteList[0].id);
    navigate(`/notes/${noteList.indexOf(newNoteList[0])+1}/edit`);
  };
  

  const askDelete = (idToDelete) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      deleteNote(idToDelete);
    }
  }

  const saveNote = (updatedNote) => {
    const updatedNotesArray = noteList.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    setNoteList(updatedNotesArray);
  };

  function getActiveNote() {
    return noteList.find((note) => note.id == activeNote);
  }

  const toggle = () => setIsOpen(!isOpen);
  const [noteList, setNoteList] = useState(JSON.parse(localStorage.getItem("noteList")) || []);
  const [activeNote, setActiveNote] = useState(false);
  const [newNoteAdded, setNewNoteAdded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.noteList) {
      localStorage.setItem("noteList", "[]");
    }
    setNoteList(JSON.parse(localStorage.noteList));
  }, []);

  useEffect(() => {
    localStorage.setItem("noteList", JSON.stringify(noteList));
  }, [noteList]);


  const navigate = useNavigate();
  

  return (
    <>
    <div className = "App">
    <button id="sideMenu" onClick={toggle}>&#9776;</button>
      <header id = "lotion-title">
        <h1>Lotion</h1>
        <p>Like Notion, but worse.</p>
      </header>
      
      <div id="middle">
        {isOpen && (<Sidebar
            noteList={noteList}
            addNote={addNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            newNoteAdded={newNoteAdded}
            isOpen={isOpen}
          ></Sidebar>
        )}

        {noteList.map(
          (note) =>
            note.id === activeNote && (
              <Main
                note={note}
                noteList={noteList}
                askDelete={askDelete}
                getActiveNote={getActiveNote}
                saveNote={saveNote}
                newNoteAdded={newNoteAdded}
                activeNote={activeNote}
                isOpen={isOpen}
              ></Main>
            )
        )}

        {(!activeNote) && (
        <div className="no-active-note">Select a note, or create a new one.</div>
        )}
        
      </div>
      </div>
      </>
  );
}

export default App;