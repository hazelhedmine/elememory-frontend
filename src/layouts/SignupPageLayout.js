import { Flex, useColorModeValue } from '@chakra-ui/react'

const SignupPageLayout = props => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      {...props}
    >
      {props.children}
    </Flex>
  )
}

export default SignupPageLayout
