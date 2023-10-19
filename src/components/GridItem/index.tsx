import { GridItemType } from '@/types/GridItemType'
import Image from 'next/image'
import React from 'react'
import dino from '../../assets/android-icon-96x96.png'
import { dinoObject } from '@/data/dinoObject'
type Props = {
  item: GridItemType
  onClick: () => void
}
const GridItem = ({item, onClick}: Props) => {
  return (
    <div onClick={onClick} 
      className={`${item.permanentShown || item.shown?"bg-[#1550ff]":"bg-[#e2e3e3]"}
      flex items-center justify-center h-[200px] w-[130px] rounded-3xl cursor-pointer`}
    >
      {item.permanentShown == false && item.shown === false &&
         <Image width={60} height={60} src={dino} alt='dino-logo'/>
      }
      {
        (item.permanentShown || item.shown) && item.item !== null &&
        <Image className="rounded-3xl w-full h-full overflow-hidden"  width={60} height={60} src={dinoObject[item.item].urlImage} alt={dinoObject[item.item].name}/>
      }
    </div>
  )
}

export default GridItem