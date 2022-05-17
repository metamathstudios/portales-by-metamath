import './index.css'
import Navbar from './components/Navbar'
import Bridge from './components/Bridge'
import SliTol from './components/SliTol'
import TransLiqSwitcher from './components/TransLiqSwitcher'

function App() {

  return (
    <div>
      <Navbar />
      <div>
        <TransLiqSwitcher />
        <SliTol />
      </div>
    </div>
  )
}

export default App
