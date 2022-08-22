import { useState } from 'react'

const useUser = () => {
  let token = null

  const STORAGE_KEY = 'loggedUser'

  const getStorage = () => {
    const loggedUserJSON =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.sessionStorage.getItem(STORAGE_KEY)
    const storage = JSON.parse(loggedUserJSON)
    if (storage) {
      token = storage.token
    }

    return storage
  }

  // const getUser = async () => {
  //   const response = await userService.get(user.id, user.token)
  //   return response[0]
  // }

  // const [user, setUser] = useState(getUser())
  const [storage, setStorage] = useState(getStorage())
  const [rememberUser, setRememberUser] = useState(false)

  const saveDetails = isLocalStorage => {
    console.log('isLocalStorage :>> ', isLocalStorage)
    setRememberUser(isLocalStorage)
    console.log('rememberUser :>> ', rememberUser)
  }

  const saveStorage = (storage, remember) => {
    if (remember) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
    } else {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
    }
    token = storage.token
    setStorage(storage)
  }

  const removeStorage = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    window.sessionStorage.removeItem(STORAGE_KEY)
    setStorage(null)
    token = null
  }

  const getToken = () => token

  return {
    setStorage: saveStorage,
    setRememberMe: saveDetails,
    removeStorage,
    storage,
    getToken,
  }
}

export default useUser
