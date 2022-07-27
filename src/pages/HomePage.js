import { useEffect, useState } from 'react'
import loginService from 'services/login'

const { Box } = require('@chakra-ui/react')

const HomePage = props => {
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

  console.log('user :>> ', user)
  return <Box>hi {user.username}</Box>
}

export default HomePage
