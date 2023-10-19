import Image from 'next/image'
import React from 'react'
type Props = {
  label: string
  icon: any
  onClick: () => void
}
const Button = ({label, icon, onClick}: Props) => {
  return (
    <button onClick={onClick} className="  cursor-pointer
    h-12 flex items-center bg-green-900 rounded-md opacity-100 transition-all
     ease-linear duration-300 hover:opacity-80 md:w-[200px]">
      <div className="h-full flex justify-center items-center 
      px-[15px] border-r border-[rgba(255,255,255,.2)]">
        <Image className="h-full" src={icon} alt='reiniciar'/>
      </div>
      <label className="text-white cursor-pointer flex justify-center 
      items-center flex-1 px-5">{label}</label>
    </button>
  )
}

export default Button