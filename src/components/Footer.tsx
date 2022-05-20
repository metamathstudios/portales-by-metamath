import home from '../assets/svg/home.svg'
import twitter from '../assets/svg/tt.svg'
import discord from '../assets/svg/discord.svg'
import linkedin from '../assets/svg/linkedin.svg'
import medium from '../assets/svg/medium.svg'

import metamath from '../assets/logo/meta.svg'

function Footer() {
  return (
    <div className='flex flex-col items-center xl:mt-[3%]'>
      <div className='flex flex-row justify-center pt-5 space-x-4 w-full'>
        <div className='p-4 bg-button-gray rounded-xl'>
          <img src={home} alt="Home" width={15} />
        </div>

        <div className='p-4 bg-button-gray rounded-xl'>
          <img src={twitter} alt="Twitter" width={15} />
        </div> 
          
        <div className='p-4 bg-button-gray rounded-xl'>
          <img src={discord} alt="Discord" width={15} />
        </div>

        <div className='p-4 bg-button-gray rounded-xl'>
          <img src={linkedin} alt="LinkedIn" width={15} />
        </div> 

        <div className='p-3 bg-button-gray rounded-xl'>
          <img className='mt-[25%]' src={medium} alt="Medium" width={20} />
        </div>
      </div>
      <div className='pt-4 text-gray-200 text-sm'> Developed By</div>
      <div className='pt-3'><img src={metamath} width={140} /></div>
      <div className='flex flex-row justify-between space-x-10'>
        <button className='text-gray-200 underline underline-offset-1'>Terms of Service</button>
        <button className='text-gray-200 underline underline-offset-1'>Contact Support</button>
      </div>
    </div>
  )
}

export default Footer