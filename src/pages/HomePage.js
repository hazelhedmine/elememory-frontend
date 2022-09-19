import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import CardDeckTable from 'components/cardDeck/CardDeckTable'
import HomePageLayout from 'layouts/HomePageLayout'
import { useEffect, useState } from 'react'

import userService from 'services/users'

const HomePage = ({ storage, removeStorage, getToken }) => {
  const [decks, setDecks] = useState([])
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    console.log('home page effect')
    const token = getToken()
    userService.get(storage.id, token).then(response => {
      setFirstName(response.firstName)
      console.log('homepage response :>> ', response)
      setDecks(response.decks)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomePageLayout storage={storage} removeStorage={removeStorage}>
      <Flex direction={'column'} justify="center">
        <Flex direction={'column'} align={'left'} m={10} gap={2}>
          <Heading
            as={'h3'}
            size={'md'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Hi{' '}
            <Text as={'span'} color={'red.400'}>
              {firstName}
            </Text>
            , here are your
          </Heading>
          <Heading
            as={'h1'}
            size={'2xl'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Card Decks
          </Heading>
        </Flex>

        <Flex justify="center" mb={6}>
          <Button
            rightIcon={<AddIcon />}
            size="md"
            colorScheme="yellow"
            variant="solid"
          >
            Create Deck
          </Button>
        </Flex>

        <Flex justify="center">
          <CardDeckTable decks={decks}></CardDeckTable>
        </Flex>
      </Flex>
    </HomePageLayout>
  )
}

export default HomePage
