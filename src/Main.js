import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useNavigate, Link } from "react-router-dom";

function Main({ noteList, saveNote, askDelete, getActiveNote, activeNote, note, isOpen, key}) {
  const [noteContent, setNoteContent] = useState("");
  const [date, setDate] = useState(Date.now());
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const mainStyle = {
    marginLeft: isOpen ? "19%" : 0,
    marginTop: isOpen ? "4%" : "4%",
    width: isOpen ? "77%" : "100%",
  };
  const quillStyle = {
    marginLeft: isOpen ? "40%" : "31%",
    marginTop: isOpen ? "0%" : "0%",
    width: isOpen ? "77%" : "80%",
  }
  const savedStyle = {
    marginLeft: isOpen ? "1.5%" : "1.75%",
    marginTop: isOpen ? "-20%" : "-15.2%",
    width: isOpen ? "100%" : "95%",
  }

  useEffect(() => {
    setNoteContent(getActiveNote().body);
    setTitle(getActiveNote().title);
  }, [activeNote]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChange = (value) => {
    setNoteContent(value);
  };

  const handleEdit = () => {
    setEditing(false);
    const activeNoteIndex = noteList.findIndex((note) => note.id === activeNote.id);
    navigate(`/notes/${activeNoteIndex + 1}/edit`);
  };

  const handleSaveNote = () => {
    const note = {
      id: activeNote,
      title: document.getElementById("title").value,
      date: date,
      body: noteContent,
    };
    const activeNoteIndex = noteList.findIndex((note) => note.id === activeNote.id);
    navigate(`/notes/${activeNoteIndex + 1}/edit`);
    saveNote(note);
    setEditing(true);
  };


  if(!activeNote){
    return(
    <Link to={`/notes`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="no-active-note">Select a note, or create a new one.</div>
      </Link>
    )
  }

  return (
    <>
    <div className="app-main" style={mainStyle}>
      <div className="app-main-note-edit">
      {!editing ? (
            <input
              type="text"
              id="title"
              placeholder="Untitled Note"
              value={title}
              onChange={handleTitleChange}
              autoFocus
            ></input>
      ) : (
        <input
        type="text"
        id="title"
        placeholder="Untitled Note"
        value={title}
        onChange={handleTitleChange}
        autoFocus
        readOnly
      ></input>
      )}
            <small className="time-and-calendar">
              <input
                type="datetime-local"
                defaultValue={new Date(note.date - 25200000)
                  .toISOString()
                  .slice(0, 19)}
                onChange={(e) => setDate(Date.parse(e.target.value))}
              />
            </small>
          </div>

          <div id="rightTop">
            {editing ? (
              <Link to={`/notes/${note.id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <button onClick={handleEdit} id="editNote">
                Edit
              </button>
              </Link>
            ) : (
              <Link to={`/notes/${note.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <button onClick={handleSaveNote}  id="saveNote">
                Save
              </button>
              </Link>
            )}

            <button onClick={() => {
                const activeNote = getActiveNote();
                if (activeNote) {
                  askDelete(activeNote.id);
                }
              }}
              id="deleteNote"
            >
              Delete
            </button>
          </div>
          <div className="typing">
          {!editing ? (
          <div id="noteEdit" style={quillStyle}>
            <ReactQuill id = "ReactQuill"
              placeholder="Your Note Here"
              value={noteContent}
              onChange={handleChange}
            ></ReactQuill>
          </div>
        ) : (<div id="newNoteContent" style={savedStyle} dangerouslySetInnerHTML={{__html: noteContent}}></div>)}
        </div> 
        </div>
    </>
  );
}

export default Main;