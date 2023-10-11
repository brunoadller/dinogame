"use client"
import InfoItem from '@/components/InfoItem'
import logo from '../assets/trexLogo.png'
import RestartIcon from '../svgs/restart.svg'
import Image from 'next/image'
import Button from '@/components/Button'
import { useEffect, useState } from 'react'
import { Dino } from '@/types/Dino'
import { dinoObject } from '@/data/dinoObject'
import { GridItemType } from '@/types/GridItemType'
import GridItem from '@/components/GridItem'

const Page = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])


  useEffect(() => {
    resetAndCreateGrid()
  },[])
  const resetAndCreateGrid = () => {
    //passo 1 resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
    

    //passo 2 criar o grid e começar o jogo

    //2.1 criar o grid
    let tmpGrid: GridItemType[] = []
    for(let i = 0; i < (dinoObject.length * 2); i++)
    tmpGrid.push({item: null,shown: false,permanentShown: false});
    
    //2.2 preencher o grid
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < dinoObject.length; i++){
        let pos = -1
        while(pos < 0 || tmpGrid[pos].item != null){
          pos = Math.floor(Math.random() * (dinoObject.length * 2))
        }
        tmpGrid[pos].item = i
        
      }
    }
    
    //2.3 jogar no state
    setGridItems(tmpGrid)

    //passo 3 começar o jogo
    setPlaying(true)
  }
  const handleItemClick = (index: number) => {
    
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
          {
            gridItems.map((item, index) => {
              return (
                <GridItem 
                key={index}
                item = {item}
                onClick = {() => handleItemClick(index)}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Page