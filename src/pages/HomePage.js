import { useNavigate } from 'react-router-dom'

const { Box, Button } = require('@chakra-ui/react')

const HomePage = ({ user, removeUser }) => {
  const navigate = useNavigate()

  console.log('user :>> ', user)

  const handleLogout = event => {
    event.preventDefault()
    removeUser()
    navigate('/', { replace: true })
  }

  return (
    <Box>
      <Box>hi {user.username}</Box>
      <Button colorScheme={'yellow'} onClick={handleLogout}>
        Log out
      </Button>
    </Box>
  )
}

export default HomePage
