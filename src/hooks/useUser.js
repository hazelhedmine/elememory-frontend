import { useState } from 'react'
import userService from '../services/users'

const useUser = () => {
  let token = null

  const STORAGE_KEY = 'loggedUser'

  // const saveUser = async () => {
  //   try {
  //     console.log('saveuser storage :>> ', storage)
  //     const response = await userService.get(storage.id, token)
  //     return response
  //   } catch (e) {
  //     console.log('exception in useUser :>> ', e)
  //   }
  // }

  const getStorage = () => {
    const loggedUserJSON =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.sessionStorage.getItem(STORAGE_KEY)
    const storage = JSON.parse(loggedUserJSON)
    if (storage) {
      token = storage.token
      // setUser(saveUser())
    }
    return storage
  }

  // const [user, setUser] = useState()
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
    // setUser(saveUser())
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
