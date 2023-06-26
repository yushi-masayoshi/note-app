import { useContext} from "react";
import "./Main.css";
import { ChooseStateContext } from "../context/ChooseStateContext";
import { useNotesDispatch } from "../context/NotesContext";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Main = () => {
  const [active , setActive] = useContext(ChooseStateContext);
  const dispatch = useNotesDispatch();
    
  // const updateNote = (note) => {
  //   dispatch({type:'note/update' , payload: note})
  // };

  const onChangeTitle = (e) => {
    setActive({...active,title : e.target.value})
    dispatch({type:'note/update' , payload: {title:e.target.value, id: active.id,modDate: Date.now()}})
  }
  const onChangeContent = (e) => {
    setActive({...active,content : e.target.value})
    dispatch({type:'note/update' , payload: {content:e.target.value,id: active.id ,modDate: Date.now()}})
  }
  

  if(active === "") {
    return <div className="no-active-note">ノートを選択してください</div>
  }

  return (
  <div className="app-main">
    <div className="app-main-note-edit">
      <input type="text" value={active.title} onChange={onChangeTitle}/>
      <textarea id="" placeholder="ノート内容を記入" value={active.content} onChange={onChangeContent}></textarea>
      {/* <button onClick={() => updateNote}>編集する</button> */}
    </div>
    <div className="app-main-note-preview">
      <h1 className="preview-title">{active.title}</h1>
      <ReactMarkdown className="preview-markdown">
        {active.content}
      </ReactMarkdown>
    </div>
  </div>
  )
}

export default Main;