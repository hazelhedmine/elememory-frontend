import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LandingPage></LandingPage>
    </ChakraProvider>
  )
}

export default App
