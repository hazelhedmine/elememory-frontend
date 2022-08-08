import { Flex, Heading } from '@chakra-ui/react'
import CardDeckTable from 'components/cardDeck/CardDeckTable'
import HomePageLayout from 'layouts/HomePageLayout'

const HomePage = ({ user, removeUser }) => {
  return (
    <HomePageLayout user={user} removeUser={removeUser}>
      <Flex direction={'column'} justify="center">
        <Flex direction={'column'} align={'left'} m={10} gap={2}>
          <Heading
            as={'h3'}
            size={'md'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Hi {user.username}, here are your
          </Heading>
          <Heading
            as={'h1'}
            size={'2xl'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Card Decks
          </Heading>
        </Flex>

        <Flex justify="center">
          <CardDeckTable></CardDeckTable>
        </Flex>
      </Flex>
    </HomePageLayout>
  )
}

export default HomePage
