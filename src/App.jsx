import './App.css'
import Note from './context/ChooseStateContext';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <div className='App'>
      <NotesProvider>
        <Note />
      </NotesProvider>
    </div>    
  )
}

export default App
