/*
Add return to home page button
*/

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useBoolean,
  useToast,
} from '@chakra-ui/react'
import RequiredInputField from 'components/signupForm/RequiredInputField'
import LoginPageLayout from 'layouts/LoginPageLayout'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import loginService from 'services/login'

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [usernameMissing, setUsernameMissing] = useBoolean()
  const [passwordMissing, setPasswordMissing] = useBoolean()
  const [saveUser, setSaveUser] = useBoolean()

  const navigate = useNavigate()

  const errorToast = useToast()
  const handleLogin = async event => {
    event.preventDefault()

    if (username === '') {
      setUsernameMissing.on()
    }

    if (password === '') {
      setPasswordMissing.on()
    }

    if (!username || !password) {
      errorToast({
        title: 'Missing fields.',
        description: 'Please fill in all the required fields.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      return
    }

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log('user logged in :>> ', username)
      setUsername('') // form fields emptied
      setPassword('')
      setUser(user, saveUser)
      navigate('/home')
    } catch (exception) {
      console.log('exception :>> ', exception)
      errorToast({
        title: 'Username does not exist.',
        description:
          "Please check if you've entered the correct username or create a new account.",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      setUsernameMissing.on()
    }
  }

  return (
    <LoginPageLayout>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username" isInvalid={usernameMissing} isRequired>
              <FormLabel>Username</FormLabel>
              <RequiredInputField
                id="usernameInput"
                setIsMissing={setUsernameMissing}
                value={username}
                setValue={setUsername}
              ></RequiredInputField>
            </FormControl>
            <FormControl id="password" isInvalid={passwordMissing} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <RequiredInputField
                  id="passwordInput"
                  setIsMissing={setPasswordMissing}
                  value={password}
                  setValue={setPassword}
                  type={showPassword ? 'text' : 'password'}
                ></RequiredInputField>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox
                  colorScheme={'yellow'}
                  onChange={() => setSaveUser.toggle()}
                >
                  Remember me
                </Checkbox>
                <Link color={'yellow.500'}>Forgot password?</Link>
                {/* TODO: implement functionality for above */}
              </Stack>
              <Button colorScheme={'yellow'} onClick={handleLogin}>
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Stack justify={'center'} direction={'horizontal'} pt={6} gap={2}>
            <Text align={'center'}>Not a user?</Text>
            <NavLink to={'/sign-up'}>
              <Button color={'yellow.500'} variant={'link'}>
                Sign up
              </Button>
            </NavLink>
          </Stack>
        </Box>
      </Stack>
    </LoginPageLayout>
  )
}

export default LoginPage
