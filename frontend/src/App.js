import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import React , {useState} from 'react';
import Main from './pages/Main';

export const AppContext = React.createContext();

function App() {
  const [library,setLibrary] = useState([])
  const [bookmark,setBookmark] =  useState([])
  return (
  <>
  <AppContext.Provider value={{library,setLibrary,bookmark,setBookmark}}>
    <Main />
  </AppContext.Provider>
  </>
  );
}

export default App;
