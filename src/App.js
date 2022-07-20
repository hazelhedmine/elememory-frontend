import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
