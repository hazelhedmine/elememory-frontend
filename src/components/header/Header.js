import {
  Box,
  Button,
  useColorModeValue,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
  IconButton,
  Hide,
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon, LockIcon } from '@chakra-ui/icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const Header = ({ user, removeUser }) => {
  const hideWithUser = { display: user ? 'none' : '' }
  const showWithUser = { display: user ? '' : 'none' }
  const navigate = useNavigate()
  const handleLogout = event => {
    event.preventDefault()
    removeUser()
    navigate('/', { replace: true })
  }

  return (
    <Box w={'100%'} p={4} display={'grid'} gridTemplateColumns={'1fr 1fr'}>
      <Box
        gridColumnStart={2}
        marginLeft={'auto'}
        display={'flex'}
        gap={4}
        alignItems="center"
      >
        <ColorModeSwitcher></ColorModeSwitcher>
        <Flex gap={4} mr={2} alignItems="center" style={hideWithUser}>
          <NavLink to={'/login'}>
            <Button
              color={useColorModeValue('blackAlpha.900', 'whiteAlpha.900')}
              variant={'link'}
            >
              LOGIN
            </Button>
          </NavLink>
          <NavLink to={'/sign-up'}>
            <Button colorScheme={'yellow'}>SIGN UP</Button>
          </NavLink>
        </Flex>
        <Flex gap={4} mr={2} alignItems="center" style={showWithUser}>
          <Menu>
            <Hide below="sm">
              <MenuButton
                as={Button}
                colorScheme={'yellow'}
                rightIcon={<ChevronDownIcon></ChevronDownIcon>}
              >
                Account
              </MenuButton>
            </Hide>
            <Show below="sm">
              <MenuButton
                as={IconButton}
                colorScheme={'yellow'}
                icon={<HamburgerIcon></HamburgerIcon>}
              ></MenuButton>
            </Show>
            <MenuList>
              {/* <MenuItem icon={<SettingsIcon></SettingsIcon>}>Settings</MenuItem> */}
              <MenuItem icon={<LockIcon></LockIcon>} onClick={handleLogout}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Box>
  )
}

export default Header
