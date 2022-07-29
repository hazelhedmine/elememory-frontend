/*
Add return to home page button
*/

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import SignupPageLayout from 'layouts/SignupPageLayout'
import { NavLink } from 'react-router-dom'

import signupService from 'services/signup'
import RequiredInputField from 'components/signupForm/RequiredInputField'
import SuccessfulAccountModal from 'components/signupForm/SuccessfulAccountModal'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [firstNameMissing, setFirstNameMissing] = useBoolean()
  const [usernameMissing, setUsernameMissing] = useBoolean()
  const [passwordMissing, setPasswordMissing] = useBoolean()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const errorToast = useToast()
  const handleSignUp = async event => {
    event.preventDefault()

    if (firstName === '') {
      setFirstNameMissing.on()
    }

    if (username === '') {
      setUsernameMissing.on()
    }

    if (password === '') {
      setPasswordMissing.on()
    }

    if (!firstName || !username || !password) {
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
      await signupService.signup({
        username,
        firstName,
        lastName,
        password,
      })
      console.log('signing up with :>> ', username)
      setUsername('') // form fields emptied
      setFirstName('')
      setLastName('')
      setPassword('')
      onOpen()
    } catch (exception) {
      errorToast({
        title: 'Username already exists.',
        description: 'Please choose another username.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      setUsernameMissing.on()
    }
  }

  return (
    <SignupPageLayout>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} opacity={0.8}>
            to start making your flashcards!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack>
            <HStack>
              <Box>
                <FormControl
                  id="firstName"
                  isInvalid={firstNameMissing}
                  isRequired
                >
                  <FormLabel>First Name</FormLabel>
                  <RequiredInputField
                    id="firstNameInput"
                    setIsMissing={setFirstNameMissing}
                    value={firstName}
                    setValue={setFirstName}
                  ></RequiredInputField>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    id="lastNameInput"
                    type="text"
                    focusBorderColor="yellow.400"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
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
            <Stack spacing={10} pt={2}>
              <Button
                id="signUpButton"
                loadingText="Submitting"
                size="lg"
                colorScheme={'yellow'}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack justify={'center'} direction={'horizontal'} pt={6} gap={2}>
              <Text align={'center'}>Already a user?</Text>
              <NavLink to={'/login'}>
                <Button color={'yellow.500'} variant={'link'}>
                  Login
                </Button>
              </NavLink>
            </Stack>
            <Stack justify={'center'} direction={'horizontal'} gap={2}>
              <NavLink to={'/'}>
                <Button color={'yellow.500'} variant={'link'}>
                  Return to main page
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <SuccessfulAccountModal
        isOpen={isOpen}
        onClose={onClose}
      ></SuccessfulAccountModal>
    </SignupPageLayout>
  )
}

export default SignupPage
