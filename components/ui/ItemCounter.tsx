import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
  currentValue: number
  maxValue: number

  // Method
  updatedQuantity: (newValue: number) => void
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue,
  updatedQuantity,
}) => {
  const addOrRemove = (value: number) => {
    const newValue = currentValue + value

    if (newValue >= 0 && newValue <= maxValue) {
      updatedQuantity(newValue)
    }
  }

  return (
    <Box display={'flex'} alignItems={'center'}>
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
