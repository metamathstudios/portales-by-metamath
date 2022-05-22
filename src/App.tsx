import 'react-notifications/lib/notifications.css';

import { useState } from 'react'

import Navbar from './components/Navbar'
import Bridge from './components/Bridge'
import History from './components/History'
import Footer from './components/Footer'
import ContextProvider from './contexts/useContext'
import Web3ModalProvider from "./contexts/Web3ModalProvider"
import { NotificationContainer } from 'react-notifications'

function App() {
  const [openComponents, setOpenComponents] = useState(false)

  function handleOpen(): void {    
    setOpenComponents(true)
  }

  function handleClose(): void {    
    setOpenComponents(false)
  }
 
  return (
    <Providers>
      <Navbar handleOpen={handleOpen}/>
      <div>
        <Bridge />
        {(<History openHistory={openComponents} handleClose={handleClose} />)}
      </div>
      <Footer />
      <NotificationContainer />
    </Providers>
  )
}

const Providers = (props: any) => {
  return (
    <Web3ModalProvider>
      <ContextProvider>
        {props.children}
      </ContextProvider>
    </Web3ModalProvider>
  )
}

export default App
