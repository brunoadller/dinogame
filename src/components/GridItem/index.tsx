import { GridItemType } from '@/types/GridItemType'
import React from 'react'
type Props = {
  item: GridItemType
  onClick: () => void
}
const GridItem = ({item, onClick}: Props) => {
  return (
    <div onClick={onClick} className="text-black">
      sasasasas
    </div>
  )
}

export default GridItem