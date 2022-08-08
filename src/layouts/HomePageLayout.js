import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'

const HomePageLayout = ({ user, removeUser, ...props }) => {
  return (
    <Box bg={useColorModeValue('yellow.100')}>
      <Flex
        direction="column"
        justify="space-between"
        maxW={{ xl: '1200px' }}
        m="0 auto"
        minH="100vh"
        {...props}
      >
        <Header user={user} removeUser={removeUser}></Header>
        {props.children}
        <Footer></Footer>
      </Flex>
    </Box>
  )
}

export default HomePageLayout
