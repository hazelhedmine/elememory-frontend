/*
TODO: implement change password functionality
*/

import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Flex,
  Input,
  useBoolean,
  HStack,
  Box,
  useToast,
  FormHelperText,
} from '@chakra-ui/react'
import RequiredInputField from 'components/signupForm/RequiredInputField'
import HomePageLayout from 'layouts/HomePageLayout'
import { useEffect, useState } from 'react'
import userService from 'services/users'

const ProfilePage = ({ storage, removeStorage, getToken }) => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [password, setPassword] = useState(user.password)
  // const [showPassword, setShowPassword] = useState(false)
  const [editMode, setEditMode] = useBoolean()

  const [firstNameMissing, setFirstNameMissing] = useBoolean()
  const [usernameMissing, setUsernameMissing] = useBoolean()
  // const [passwordMissing, setPasswordMissing] = useBoolean()

  const hideOnEditMode = { display: editMode ? 'none' : '' }
  const showOnEditMode = { display: editMode ? '' : 'none' }

  useEffect(() => {
    console.log('effect')
    const token = getToken()
    userService.get(storage.id, token).then(response => {
      setUsername(response.username)
      setFirstName(response.firstName)
      setLastName(response.lastName)
      console.log('homepage response :>> ', response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const errorToast = useToast()

  const handleClose = async event => {
    event.preventDefault()
    setEditMode.off()
  }

  const handleSave = async event => {
    event.preventDefault()

    if (firstName === '') {
      setFirstNameMissing.on()
    }

    if (username === '') {
      setUsernameMissing.on()
    }

    // if (password === '') {
    //   setPasswordMissing.on()
    // }

    if (!firstName || !username) {
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
      const newUser = await userService.update(storage.id, {
        username,
        firstName,
        lastName,
      })
      setFirstName(newUser.firstName)
      setLastName(newUser.lastName)
      setEditMode.off()
      errorToast({
        title: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
    } catch (exception) {
      errorToast({
        title: 'An unexpected error has occurred.',
        description: 'Please try again.',
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
  }

  return (
    <HomePageLayout storage={storage} removeStorage={removeStorage}>
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            {editMode ? 'Edit User Profile' : 'User Profile'}
          </Heading>

          <Stack>
            <FormControl id="username" isInvalid={usernameMissing}>
              <FormLabel>Username</FormLabel>
              <RequiredInputField
                id="usernameInput"
                setIsMissing={setUsernameMissing}
                value={username}
                setValue={setUsername}
                readOnly
              ></RequiredInputField>
              <FormHelperText style={showOnEditMode}>
                Username cannot be changed.
              </FormHelperText>
            </FormControl>
            <HStack>
              <Box>
                <FormControl
                  id="firstName"
                  isInvalid={firstNameMissing}
                  isRequired={editMode}
                >
                  <FormLabel>First Name</FormLabel>
                  <RequiredInputField
                    id="firstNameInput"
                    setIsMissing={setFirstNameMissing}
                    value={firstName}
                    setValue={setFirstName}
                    readOnly={!editMode}
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
                    readOnly={!editMode}
                    onChange={event => setLastName(event.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            {/* <FormControl
              id="password"
              isInvalid={passwordMissing}
              isRequired={editMode}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <RequiredInputField
                  id="passwordInput"
                  setIsMissing={setPasswordMissing}
                  value={password}
                  setValue={setPassword}
                  readOnly={!editMode}
                  type={showPassword ? 'text' : 'password'}
                ></RequiredInputField>
                <InputRightElement h={'full'}>
                  <Button
                    id="seePasswordButton"
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl> */}
            <Stack spacing={10} pt={2} style={hideOnEditMode}>
              <Button
                id="editButton"
                loadingText="Submitting"
                size="lg"
                colorScheme={'yellow'}
                onClick={() => setEditMode.on()}
              >
                Edit
              </Button>
            </Stack>
            <Stack
              spacing={10}
              pt={2}
              direction={['column', 'row']}
              style={showOnEditMode}
            >
              <Button id="cancelButton" w="full" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                id="saveButton"
                colorScheme={'yellow'}
                w="full"
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </HomePageLayout>
  )
}

export default ProfilePage
