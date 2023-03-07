import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

function Main({ saveNote, askDelete, getActiveNote, activeNote, note, isOpen}) {
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
    marginLeft: isOpen ? "40%" : "40%",
    marginTop: isOpen ? "0%" : "0%",
    width: isOpen ? "77%" : "100%",
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
    navigate(`/notes/${activeNote}/edit`); 
  };

  const handleSaveNote = () => {
    const note = {
      id: activeNote,
      title: document.getElementById("title").value,
      date: date,
      body: noteContent,
    };
    navigate(`/notes/${activeNote}`); 
    saveNote(note);
    setEditing(true);
  };

  if (!activeNote) {
    return <div className="no-active-note" style={mainStyle}>Select a note, or create a new one.</div>;
  };

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
              <button onClick={handleEdit} id="editNote">
                Edit
              </button>
            ) : (
              <button onClick={handleSaveNote}  id="saveNote">
                Save
              </button>
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
        </div>

        {!editing ? (
          <div id="noteEdit" style={quillStyle}>
            <ReactQuill id = "ReactQuill"
              placeholder="Your Note Here"
              value={noteContent}
              onChange={handleChange}
            ></ReactQuill>
          </div>
        ) : (<div id="newNoteContent" dangerouslySetInnerHTML={{__html: noteContent}}></div>)}
      
    </>
  );
}

export default Main;