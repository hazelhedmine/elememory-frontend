import { Box } from '@chakra-ui/react'
import Card from 'components/card/Card'
import LandingPageLayout from 'layouts/LandingPageLayout'

const LandingPage = props => {
  return (
    <LandingPageLayout>
      <Box h="100%" textAlign="center" fontSize="xl">
        <Card
          question="This is where your question or prompt is!"
          answer="This is where your answer will be!"
        ></Card>
      </Box>
    </LandingPageLayout>
  )
}

export default LandingPage
