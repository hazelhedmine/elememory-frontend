import { NavLink } from 'react-router-dom'

const { Box, Button, Link } = require('@chakra-ui/react')
const { ColorModeSwitcher } = require('./ColorModeSwitcher')

const Header = props => {
  return (
    <Box
      w={'100%'}
      p={4}
      display={'grid'}
      gridTemplateColumns={'1fr 1fr'}
      {...props}
    >
      <Box
        gridColumnStart={2}
        marginLeft={'auto'}
        display={'flex'}
        gap={4}
        mr={2}
        alignItems="center"
      >
        <ColorModeSwitcher></ColorModeSwitcher>
        <NavLink to={'/login'}>
          <Link>
            <b>LOGIN</b>
          </Link>
        </NavLink>
        <NavLink to={'/sign-up'}>
          <Button colorScheme={'yellow'}>SIGN UP</Button>
        </NavLink>
      </Box>
    </Box>
  )
}

export default Header
