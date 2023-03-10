import { useEffect} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

function Sidebar({noteList, addNote, activeNote, setActiveNote, newNoteAdded, isOpen}) {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const sideBarStyle = {
    left: isOpen ? 0 : "-23%",
  };

  useEffect(() => {
    const index = Number(noteId) - 1;
    if (index >= 0) {
      setActiveNote(noteList[index].id);
    }
  }, [setActiveNote, noteList, useParams]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  if(!activeNote && noteList.length === 0){
    return(
    <Link to={`/notes`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="app-sidebar">
        <div className="app-sidebar-header">
            <h1>Notes</h1>
            <button onClick={addNote}>&#43;</button>
        </div>
        <div id="noNotes">No Note Yet.</div>
      </div>
      </Link>
    )
  }


  if (noteList.length == 0) {
    return (
      <Link to={`/notes`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="app-sidebar">
        <div className="app-sidebar-header">
            <h1>Notes</h1>
            <button onClick={addNote}>&#43;</button>
        </div>
        <div id="noNotes">No Note Yet.</div>
      </div>
      </Link>
    );
  }

  return (
      <div className="app-sidebar" style = {sideBarStyle}>
        <div className="app-sidebar-header">
            <h1>Notes</h1>
            <button onClick={addNote}>&#43;</button>
        </div>

        <div className="app-sidebar-notes">
          {noteList.map((note) => (
            <Link to={`/notes/${noteList.indexOf(note)+1}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div key={note.id} className={`app-sidebar-note ${note.id === activeNote && "active"}`} onClick={() => {setActiveNote(note.id);}}>
                <div className="sidebar-note-title">
                  <strong>{note.title}</strong>
                </div>
                <small className="note-meta">
                  {formatDate(note.date)}
                </small>
                <ReactQuill id="ReactQuillPreview" readOnly={true} modules={{ toolbar: false }} value={note.body.slice(0, 50) + "..."}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
  );
}

export default Sidebar;