import React from 'react'
import {Box, Typography} from '@mui/material'
import Navbar from '../shared/components/navbar/NavBar'
const Home = () => {
  React.useEffect(() => {console.log('oi')},[])
  return (
    <Box>
      <Navbar/>
      <Typography>New Home</Typography>
    </Box>
  )
}

export default Home