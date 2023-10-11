import React from 'react'

type Props = {
  label: string
  value: string
}
const InfoItem = ({label, value}: Props) => {
  return (
    <div className="my-5">
      <label className="text-lg text-[#6a7d8b]">{label}</label>
      <div className="text-5xl font-bold text-[#101c40]">{value}</div>
    </div>
  )
}

export default InfoItem