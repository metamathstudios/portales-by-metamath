import { useState } from 'react'

import './index.css'

import Navbar from './components/Navbar'
import Bridge from './components/Bridge'
import SliTol from './components/SliTol'
import TransLiqSwitcher from './components/TransLiqSwitcher'
import History from './components/History'
import SearchChain from './components/SearchChain'
import Footer from './components/Footer'

function App() {
  const [openComponents, setOpenComponents] = useState(false)

  function handleOpen(): void {    
    setOpenComponents(true)
  }

  function handleClose(): void {    
    setOpenComponents(false)
  }
 
  return (
    <>
      <Navbar handleOpen={handleOpen}/>
      <div>
        <Bridge />
        {(<History openHistory={openComponents} handleClose={handleClose} />)}
      </div>
      <Footer />
    </>
  )
}

export default App
