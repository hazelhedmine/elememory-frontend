import React, { useEffect, useState } from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import HomePage from 'pages/HomePage'
import loginService from 'services/login'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedUser') ||
      window.sessionStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        {/* <Route path="/" element={<LandingPage></LandingPage>}></Route> */}
        <Route
          exact
          path="/"
          element={user ? <Navigate to="/home" /> : <LandingPage />}
        ></Route>
        <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
        <Route
          path="/login"
          element={<LoginPage setUser={setUser}></LoginPage>}
        ></Route>
        <Route
          path="/home"
          element={user ? <HomePage></HomePage> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
