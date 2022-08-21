import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import HomePage from 'pages/HomePage'
import useUser from 'hooks/useUser'
import ProfilePage from 'pages/ProfilePage'
import { useEffect, useState } from 'react'

import userService from 'services/users'

function App() {
  const { setStorage, setRememberMe, removeStorage, storage, getToken } =
    useUser()

  const [user, setUser] = useState()

  // useEffect(() => {
  //   if (!storage) {
  //     return
  //   }
  //   console.log('effect')
  //   const token = getToken()
  //   userService.get(storage.id, token).then(response => {
  //     setUser(response[0])
  //     console.log('response[0] :>> ', response[0])
  //     console.log('user :>> ', user)
  //   })
  // }, [storage])

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        {/* <Route path="/" element={<LandingPage></LandingPage>}></Route> */}
        <Route
          exact
          path="/"
          element={storage ? <Navigate to="/home" /> : <LandingPage />}
        ></Route>
        <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
        <Route
          path="/login"
          element={
            <LoginPage
              setStorage={setStorage}
              setRememberMe={setRememberMe}
              setUser={setUser}
            ></LoginPage>
          }
        ></Route>
        <Route
          path="/home"
          element={
            storage ? (
              <HomePage
                user={user}
                setUser={setUser}
                storage={storage}
                removeStorage={removeStorage}
                getToken={getToken}
              ></HomePage>
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/profile"
          element={
            storage ? (
              <ProfilePage
                user={user}
                setUser={setUser}
                storage={storage}
                removeStorage={removeStorage}
                getToken={getToken}
              ></ProfilePage>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
