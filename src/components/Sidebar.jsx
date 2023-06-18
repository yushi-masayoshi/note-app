import { useReducer, useState} from "react";
import "./Sidebar.css";

const notesReducer = (notes, {type,payload}) => {
  // console.log(payload);

  switch(type) {
    case 'note/add':
      return [...notes,payload];
    case 'note/delete':
      console.log(payload)
      return notes.filter((note) =>{
        return note.id !== payload;
      });
      // case 'note/choose':
      //   (payload => !payload);
      //   return;
      default: 
    return notes;
  }
}

const Sidebar = () => {
  const [notes , dispatch] = useReducer(notesReducer, []);
  const [active , setActive] = useState("");


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

  const onClickActive = (id) => {
    console.log(id)
    setActive(id)
    // dispatch({type:'note/choose' , payload: activeNote})
  }


  return (
    <>
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>ノート</h1>
          <button onClick={addNote}>追加</button>
        </div>
        <div className="app-sidebar-notes">
          <div className="app-sidebar-note">
            {notes.map((note) => {
              return (
                  <div className={`sidebar-content ${active === note.id && "gray"}`} key={note.id} onClick={()=> onClickActive(note.id)}>
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