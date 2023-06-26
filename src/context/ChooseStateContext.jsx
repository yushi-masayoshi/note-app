import { createContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useNotes } from "./NotesContext";


export const ChooseStateContext = createContext();

const Note = () => {
  const notes = useNotes();
  const [active , setActive] = useState(notes[0] || "");

  return (
    <>
      <ChooseStateContext.Provider value={[active,setActive]}>
        <Sidebar />
        <Main />
      </ChooseStateContext.Provider>
    </>
  )
}

export default Note;