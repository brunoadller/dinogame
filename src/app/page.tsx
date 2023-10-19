"use client"
import { useEffect, useState } from 'react'
import InfoItem from '@/components/InfoItem'
import logo from '../assets/trexLogo.png'
import RestartIcon from '../svgs/restart.svg'
import Image from 'next/image'
import Button from '@/components/Button'
import { Dino } from '@/types/Dino'
import { dinoObject } from '@/data/dinoObject'
import { GridItemType } from '@/types/GridItemType'
import GridItem from '@/components/GridItem'
import { formatTimeElapsed } from '@/helpers/formatTimeElapsed'

const Page = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(),[])
  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000);

    return () => clearInterval(timer)
  }, [playing, timeElapsed])
  //verifica se os abertos são iguais
  useEffect(() => {
    if(shownCount === 2){
      let opened = gridItems.filter(item => item.shown == true);
      if(opened.length == 2){
        
        // se eles são iguais tornálos permanent
        if(opened[0].item === opened[1].item){
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShown = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShownCount(0)
        
        }else{
         setTimeout(() => {
          let tmpGrid = [...gridItems]
          //se não forem iguais
          for(let i in tmpGrid){
            tmpGrid[i].shown = false

          }
          setGridItems(tmpGrid)
          setShownCount(0)
         }, 1000);
        }
       
        
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  },[shownCount, gridItems])

  const resetAndCreateGrid = () => {
    //passo 1 resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
    


    //passo 2 criar o grid e começar o jogo

    //2.1 criar o grid
    let tmpGrid: GridItemType[] = []
    for(let i = 0; i < (dinoObject.length * 2); i++){
      tmpGrid.push({item: null,shown:false,permanentShown: false});
    }
   
    //2.2 preencher o grid

    for(let i = 0; i < 2; i++){
      for(let j = 0; j < dinoObject.length; j++){
        let pos = -1
        while(pos < 0 || tmpGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (dinoObject.length * 2))
        }
        tmpGrid[pos].item = j
      }
    }
    //2.3 jogar no state
    setGridItems(tmpGrid)

    //passo 3 começar o jogo
    setPlaying(true)

  }
  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2){
      let tmpGrid = [...gridItems]
      
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1)
      }
      setGridItems(tmpGrid)
    }
  }
  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false)
    }
  },[moveCount, gridItems])
  
 
  return (
    <div className="max-w-[750px] md:max-w-[1120px] mx-auto  
    p-5  flex gap-5 items-center flex-col md:flex-row md:items-start md:justify-center">
      <div className="flex flex-col  w-auto mb-[50px] md:m-0 ">
        <a className="flex items-center gap-2" href="">
          <Image className="w-[110px]" src={logo} alt="dinossauro" />
          <h1 className="text-4xl font-bold">DinoMemory</h1>
        </a>

        <div className="w-full my-[10px] flex justify-around  md:flex-col">
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label='Movimentos' value = {moveCount.toString()} />
        </div>

      <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>

      </div>

      <div className="flex flex-1 ">

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
          {
            gridItems.map((item, index) => 
               (
                <GridItem 
                key={index}
                item = {item}
                onClick = {() => handleItemClick(index)}
                />
              )
            )
          }
        </div>

      </div>
    </div>
  )
}
export default Page