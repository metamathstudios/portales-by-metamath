import { useState } from 'react'

import './index.css'
import Navbar from './components/Navbar'
import Bridge from './components/Bridge'
import SliTol from './components/SliTol'
import TransLiqSwitcher from './components/TransLiqSwitcher'
import History from './components/History'

function App() {
  const [openComponents, setOpenComponents] = useState(false)

  function handleOpen(): any {
    console.log("chegou aqui");
    
    setOpenComponents(oldOpenComponent => !oldOpenComponent)
  }

 
  return (
    <>
      <Navbar handleOpen={handleOpen}/>
      <div className=''>
        <Bridge />
        {openComponents && (<History  />)}
      </div>
    </>
  )
}

export default App
