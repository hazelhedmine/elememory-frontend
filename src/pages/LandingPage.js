import { Box, Flex, Heading } from '@chakra-ui/react'
import Card from 'components/card/Card'
import LandingPageLayout from 'layouts/LandingPageLayout'

const LandingPage = ({ user }) => {
  return (
    <LandingPageLayout user={user}>
      <Flex direction={'column'} align={'center'} gap={24}>
        <Heading>Try out the card below!</Heading>
        <Box textAlign="center" fontSize="xl">
          <Card
            question="This is where your question or prompt is!"
            answer="This is where your answer will be!"
          ></Card>
        </Box>
      </Flex>
    </LandingPageLayout>
  )
}

export default LandingPage
