import { useContext, useEffect} from "react";
import "./Sidebar.css";
import { ChooseStateContext } from "../context/ChooseStateContext";
import { useNotes, useNotesDispatch } from "../context/NotesContext";




const Sidebar = () => {
  const notes = useNotes();
  const dispatch = useNotesDispatch();
  const [active, setActive] = useContext(ChooseStateContext);
  const sortedNotes = notes.sort((a ,b ) => b.modDate - a.modDate);

  const onClickActive = (note) => {
    setActive(note)
  }

  const addNote = () => {
    const newNotes ={
      id: Math.floor(Math.random() * 1e5),
      title: "新しいノート",
      content: "新しいノートの内容",
      activeID: active,
      modDate: Date.now()      
    }
    dispatch({type:'note/add' , payload: newNotes})
  };

  const deleteNote = (id) => {
    dispatch({type:'note/delete' , payload: id})
  };

  useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes]);

  return (
    <>
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>ノート</h1>
          <button onClick={addNote}>追加</button>
        </div>
        <div className="app-sidebar-notes">
          <div className="app-sidebar-note">
            {sortedNotes.map((note) => {
              return (
                  <div className={`sidebar-content ${active.id === note.id && "gray"}`} key={note.id} onClick={()=> onClickActive(note)}>
                    <div className="sidebar-note-title">
                      <strong>{note.title}</strong>
                      <button onClick={() => deleteNote(note.id)}>削除</button>
                    </div>
                    <p>{note.content}</p>
                    <small>{new Date(note.modDate).toLocaleDateString("ja-JP",{
                      hour: "2-digit",
                      minute: "2-digit"
                    })}</small>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
    )
}

export default Sidebar;