import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import HomePage from 'pages/HomePage'
import useUser from 'hooks/useUser'

function App() {
  const { user, setUser, removeUser } = useUser()

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
          element={
            user ? (
              <HomePage user={user} removeUser={removeUser}></HomePage>
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
