"use client"
import InfoItem from '@/components/InfoItem'
import logo from '../assets/trexLogo.png'
import RestartIcon from '../svgs/restart.svg'
import Image from 'next/image'
import Button from '@/components/Button'
import { useEffect } from 'react'
const Page = () => {

  useEffect(() => {
    resetAndCreateGrid()
  },[])
  const resetAndCreateGrid = () => {

  }
  return (
    <div className="w-full
     max-w-[750px] mx-auto py-12 px-5 flex flex-col items-center 
     md:px-0 md:flex-row md:items-start ">

      <div className="flex flex-col  w-auto mb-[50px] md:m-0">
        <a className="flex items-center gap-2" href="">
          <Image className="w-[110px]" src={logo} alt="dinossauro" />
          <h1 className="text-4xl font-bold">DinoMemory</h1>
        </a>

        <div className="w-full my-[10px] flex justify-around  md:flex-col">
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem label='Movimentos' value="0"/>
        </div>

      <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>

      </div>

      <div className="w-full flex  flex-1 md:justify-end">
        <div className="max-w-md grid grid-cols-4 gap-2">

        </div>
      </div>
    </div>
  )
}
export default Page