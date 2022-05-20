import { useState } from 'react'

import Navbar from './components/Navbar'
import Bridge from './components/Bridge'
import History from './components/History'
import Footer from './components/Footer'
import ContextProvider from './hooks/useContext'

function App() {
  const [openComponents, setOpenComponents] = useState(false)

  function handleOpen(): void {    
    setOpenComponents(true)
  }

  function handleClose(): void {    
    setOpenComponents(false)
  }
 
  return (
    <ContextProvider>
      <Navbar handleOpen={handleOpen}/>
      <div>
        <Bridge />
        {(<History openHistory={openComponents} handleClose={handleClose} />)}
      </div>
      <Footer />
    </ContextProvider>
  )
}

export default App
