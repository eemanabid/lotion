import ReactQuill from "react-quill";

function Main({activeNote, onUpdateNote}){

    function debounce(a,b,c){
        var d,e;
        return function(){
          function h(){
            d=null;
            c||(e=a.apply(f,g));
          }
          var f=this,g=arguments;
          return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
        }
      }
      
      function removeHTMLTags (str) {
        return str.replace(/<[^>]*>?/gm, '');
      };


    const onEditField = async (key, value) => {
        onUpdateNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),
        });
    };

    if(!activeNote) {
        return <div className="no-active-note">Select a note, or create a new one.</div>
    }


    return <div className="app-main">
        <div className="app-main-note-edit">
            <input type="text" id="title" value={activeNote.title} onChange={(e) => onEditField("title", e.target.value)} autoFocus/>
            <div className= "editorContainer">
                <ReactQuill id="body" placeholder="Your Note Here" 
                    value={activeNote.body} 
                    onChange={(content) => onEditField("body", content)}>
                </ReactQuill>
            </div>
            
        </div>

        <div className="app-main-note-preview">
            <h1 className="preview-title">{activeNote.title}</h1>
            <div className="markdown-preview">{activeNote.body}</div>
        </div>
    </div>
}

export default Main;