import React from 'react'
import { ButtonProps, Button as MuiButton } from '@mui/material'

const Button:React.FC<ButtonProps> = ({onClick,title}:ButtonProps) => {
  return (
    <MuiButton onClick={onClick}>{title}</MuiButton>
  )
}

export default Button