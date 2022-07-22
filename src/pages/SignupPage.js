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
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import SignupPageLayout from 'layouts/SignupPageLayout'
import { NavLink } from 'react-router-dom'

import signupService from 'services/signup'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const errorToast = useToast()
  const handleSignUp = async event => {
    event.preventDefault()
    console.log('signing up with :>> ', username)

    try {
      await signupService.signup({
        username,
        firstName,
        lastName,
        password,
      })
      setUsername('') // form fields emptied
      setFirstName('')
      setLastName('')
      setPassword('')
    } catch (exception) {
      errorToast({
        title: 'Sign up failed.',
        description: 'Please fill in the required fields.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
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
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    focusBorderColor="yellow.400"
                    onChange={({ target }) => setFirstName(target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    focusBorderColor="yellow.400"
                    onChange={({ target }) => setLastName(target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                focusBorderColor="yellow.400"
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  focusBorderColor="yellow.400"
                  onChange={({ target }) => setPassword(target.value)}
                />
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
          </Stack>
        </Box>
      </Stack>
    </SignupPageLayout>
  )
}

export default SignupPage
