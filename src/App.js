import Sidebar from "./Sidebar";
import Main from "./Main";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App(){
  //Getter = notes, Setter = setNotes
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });
    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const askDelete = (idToDelete) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      onDeleteNote(idToDelete);
    }
  }

  const getActiveNote = () => {
    return(notes.find(( note ) => note.id === activeNote));
  }
  
  

  return <div className = "App">
    <header id = "lotion-title">
      <h1>Lotion</h1>
      <p>Like Notion, but worse.</p>
    </header>

    <Sidebar 
      notes={notes} 
      onAddNote={onAddNote} 
      askDelete={askDelete}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
    />
    <Main 
      activeNote={getActiveNote()} 
      onUpdateNote={onUpdateNote} 
      notes={notes}
      setNotes={setNotes}
      askDelete={askDelete}
    />
  </div>

}

export default App;