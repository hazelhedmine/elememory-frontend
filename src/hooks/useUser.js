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

  const saveUser = (user, isLocalStorage) => {
    if (isLocalStorage) {
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
    removeUser,
    user,
  }
}

export default useUser
