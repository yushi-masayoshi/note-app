import { createContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";


export const ChooseStateContext = createContext();

const Note = () => {
  const [active , setActive] = useState("");

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