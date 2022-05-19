import home from '../assets/svg/home.svg'
import twitter from '../assets/svg/tt.svg'
import discord from '../assets/svg/discord.svg'
import linkedin from '../assets/svg/linkedin.svg'
import medium from '../assets/svg/medium.svg'


function Footer() {
  return (
    <div className='flex justify-center'>
      <div className='flex-row space-x-4'>
        <img src={home} alt="Home" />
        <img src={twitter} alt="Twitter" />
        <img src={discord} alt="Discord" />
        <img src={linkedin} alt="LinkedIn" />
        <img src={medium} alt="Medium" />
      </div> 
    </div>
  )
}

export default Footer