import Sidebar from "./Sidebar";
import Main from "./Main";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App(){
  //Getter = notes, Setter = setNotes
  const [notes, setNotes] = useState([]);

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = () => {
    
  }

  return <div className = "App">

    <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote}/>
    <Main />
  </div>

}

export default App;
