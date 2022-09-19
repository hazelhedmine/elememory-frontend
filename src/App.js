import { ChakraProvider, theme } from '@chakra-ui/react'
import LandingPage from 'pages/LandingPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import HomePage from 'pages/HomePage'
import useUser from 'hooks/useUser'
import ProfilePage from 'pages/ProfilePage'
import DeckPage from 'pages/DeckPage'

function App() {
  const { setStorage, setRememberMe, removeStorage, storage, getToken } =
    useUser()

  return (
    <ChakraProvider theme={theme}>
      <Routes>
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
            ></LoginPage>
          }
        ></Route>
        <Route
          path="/home"
          element={
            storage ? (
              <HomePage
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
                storage={storage}
                removeStorage={removeStorage}
                getToken={getToken}
              ></ProfilePage>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          exact
          path="/deck/:id"
          element={
            storage ? (
              <DeckPage
                storage={storage}
                removeStorage={removeStorage}
                getToken={getToken}
              ></DeckPage>
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
