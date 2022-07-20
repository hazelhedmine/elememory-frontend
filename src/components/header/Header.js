import { Link } from 'react-router-dom'

const { Box, Button } = require('@chakra-ui/react')
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
      >
        <ColorModeSwitcher></ColorModeSwitcher>
        <Link to={'/sign-up'}>
          <Button colorScheme={'yellow'}>SIGN UP</Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Header
