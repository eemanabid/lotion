import ReactQuill from "react-quill";
import { useEffect, useState } from "react";

function Main({ activeNote, onUpdateNote, notes, setNotes, askDelete }) {

  const onEditBody = async (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const onEditField = async (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const saveNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === activeNote.id ? activeNote : note
    );
    setNotes(updatedNotes);
  };

  if (!activeNote) {
    return <div className="no-active-note">Select a note, or create a new one.</div>;
  }

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

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <small className="time-and-calendar">
            <input type="datetime-local" defaultValue={new Date(activeNote.lastModified - 25200000)
                  .toISOString()
                  .slice(0, 19)} onChange={(e) => onEditField("lastModified", e.target.value)} />
        </small>
        <button className="delete" onClick={() => {askDelete(activeNote.id)}}>Delete</button>
        <button className="save" onClick={saveNote}>Save</button>
        <div className="editorContainer">
          <ReactQuill
            id="body"
            placeholder="Your Note Here"
            value={activeNote.body}
            onChange={(content) => onEditBody("body", content)}
          ></ReactQuill>
        </div>
      </div>
      </div>
  );
}

export default Main;
