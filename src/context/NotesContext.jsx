import { createContext, useContext, useReducer} from "react";
import { ChooseStateContext } from "./ChooseStateContext";



const NotesContext = createContext();
const NotesDispatchContext = createContext();

const notesReducer = (notes, {type,payload}) => {
  switch(type) {
    case 'note/add':
      return [...notes,payload];
    case 'note/delete':
      return notes.filter((note) =>{
        return note.id !== payload;
      });
      // case 'note/choose':
      //   (payload => !payload);
      //   return;
    case 'note/update':
      return notes.map((_note) => {
        console.log(payload.id,_note.id)
        return _note.id === payload.id ? {
          ..._note,...payload} : { ..._note };
      });

    default: 
    return notes;
  }
};


const NotesProvider = ({children}) => {
  const [notes , dispatch] = useReducer(notesReducer, []);
  // const [active, setActive] = useContext(ChooseStateContext);


  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  )

}
const useNotes = () => {
  return useContext(NotesContext);
};
const useNotesDispatch = () => {
  return useContext(NotesDispatchContext);
};

export { NotesProvider, useNotes, useNotesDispatch}