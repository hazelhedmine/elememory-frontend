/*
Add return to home page button
*/

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import LoginPageLayout from 'layouts/LoginPageLayout'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

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
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="email" focusBorderColor="yellow.400" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  focusBorderColor="yellow.400"
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox colorScheme={'yellow'}>Remember me</Checkbox>
                <Link color={'yellow.500'}>Forgot password?</Link>
                {/* TODO: implement functionality for above */}
              </Stack>
              <Button colorScheme={'yellow'}>Sign in</Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Not a user?{' '}
              <NavLink to={'/sign-up'}>
                <Link color={'yellow.500'}>Sign up</Link>
              </NavLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </LoginPageLayout>
  )
}

export default LoginPage
