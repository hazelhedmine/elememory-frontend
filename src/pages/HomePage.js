import HomePageLayout from 'layouts/HomePageLayout'
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
    <HomePageLayout user={user} removeUser={removeUser}>
      <Box>hi {user.username}</Box>
      <Button colorScheme={'yellow'} onClick={handleLogout}>
        Log out
      </Button>
    </HomePageLayout>
  )
}

export default HomePage
