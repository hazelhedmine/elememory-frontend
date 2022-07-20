import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'
import { Route, Router, Routes } from 'react-router-dom'
import SignUpForm from 'components/SignUpForm/SignUpForm'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/sign-up" element={<SignUpForm></SignUpForm>}></Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
