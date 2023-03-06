function Sidebar({notes, onAddNote, askDelete, activeNote, setActiveNote}){
    const handleNoteClick = (note) => {
        setActiveNote(note.id);
      };

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

    return <div className="app-sidebar">
        <div className="app-sidebar-header">
            <h1>Notes</h1>
            <button onClick={onAddNote}>&#43;</button>
        </div>

        <div className="app-sidebar-notes">
            {notes.map((note) => (
              <div key={note.id} className={`app-sidebar-note ${note.id === activeNote && "active"}`} onClick={() => handleNoteClick(note)}>
              <div className="sidebar-note-title">
                  <strong>{note.title}</strong>
              </div>

              <p>{note.body.substr(0, 50) && note.body.replace(/<[^>]*>?/gm, '').substr(0, 50) + "..."}</p>

              <small className="note-meta">
                  {formatDate(note.lastModified)}
              </small>
          </div>          
            ))}
        </div>
    
    </div>
}

export default Sidebar;