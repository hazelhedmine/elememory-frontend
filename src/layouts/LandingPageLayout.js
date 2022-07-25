import { Flex } from '@chakra-ui/react'
import Footer from 'components/footer/Footer'
import Header from 'components/header/Header'

const LandingPageLayout = props => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      minH="100vh"
      {...props}
    >
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </Flex>
  )
}

export default LandingPageLayout
