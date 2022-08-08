import { useState } from 'react'

const useUser = () => {
  const getUser = () => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedUser') ||
      window.sessionStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    return user
  }

  const [user, setUser] = useState(getUser())
  const [rememberUser, setRememberUser] = useState(false)

  const saveDetails = isLocalStorage => {
    setRememberUser(isLocalStorage)
  }

  const saveUser = user => {
    if (rememberUser) {
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } else {
      window.sessionStorage.setItem('loggedUser', JSON.stringify(user))
    }
    setUser(user)
  }

  const removeUser = user => {
    window.localStorage.removeItem('loggedUser')
    window.sessionStorage.removeItem('loggedUser')
    setUser(null)
  }

  return {
    setUser: saveUser,
    setRememberMe: saveDetails,
    removeUser,
    user,
  }
}

export default useUser
