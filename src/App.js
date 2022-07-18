import React from 'react'
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import Card from 'components/Card.js'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Card
            question="This is where your question or prompt is!"
            answer="This is where your answer will be!"
          ></Card>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
