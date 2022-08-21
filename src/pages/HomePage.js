import { Flex, Heading } from '@chakra-ui/react'
import CardDeckTable from 'components/cardDeck/CardDeckTable'
import HomePageLayout from 'layouts/HomePageLayout'
import { useEffect, useState } from 'react'

import userService from 'services/users'

const HomePage = ({ user, setUser, storage, removeStorage, getToken }) => {
  const [decks, setDecks] = useState([])
  const [firstName, setFirstName] = useState()

  useEffect(() => {
    console.log('effect')
    const token = getToken()
    userService.get(storage.id, token).then(response => {
      setUser(response[0])
      setFirstName(response[0].firstName)
      console.log('response[0] :>> ', response[0])
      console.log('user :>> ', user)
      setDecks(response[0].decks)
      console.log('decks :>> ', decks)
    })
  }, [storage])

  return (
    <HomePageLayout storage={storage} removeStorage={removeStorage}>
      <Flex direction={'column'} justify="center">
        <Flex direction={'column'} align={'left'} m={10} gap={2}>
          <Heading
            as={'h3'}
            size={'md'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Hi {firstName}, here are your
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
