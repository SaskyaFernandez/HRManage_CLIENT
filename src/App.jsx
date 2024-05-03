import { useEffect } from 'react';
import {login} from './services/hrmanage.service.js';

function App() {
  useEffect(() => {
    login("fernandez@hrmange.com", "oui")
      .then(e => {
        console.log('connection à la db')
        console.log(e)
      })
      .catch((e) => {
        console.error(e.response.data.error); // "oh, no!"
      })
  },[])
  return (
    <>
      
    </>
  )
}

export default App