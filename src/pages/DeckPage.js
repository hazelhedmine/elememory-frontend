import { AddIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import DeckNameModal from 'components/editDeckNameModal/DeckNameModal'
import HomePageLayout from 'layouts/HomePageLayout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import deckService from 'services/decks'

const DeleteButton = () => {
  return (
    <Td isNumeric>
      <Button colorScheme={'red'} variant={'ghost'} size={'xs'}>
        DELETE
      </Button>
    </Td>
  )
}

const DeckPage = ({ storage, removeStorage, getToken }) => {
  const params = useParams() //deckId is params.id

  const [deckName, setDeckName] = useState('')
  const [cards, setCards] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    console.log('deck page effect')
    deckService.get(params.id).then(response => {
      console.log('deck page response :>> ', response)
      setCards(response.cards)
      setDeckName(response.name)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomePageLayout storage={storage} removeStorage={removeStorage}>
      <Flex direction={'column'} justify="center">
        <Flex direction={'column'} align={'left'} m={10} gap={2}>
          <Heading
            as={'h1'}
            size={'2xl'}
            textAlign={{ base: 'center', md: 'left' }}
          >
            {deckName}{' '}
            <IconButton
              colorScheme={'blackAlpha'}
              variant={'ghost'}
              aria-label="Edit deck name"
              icon={<EditIcon></EditIcon>}
              onClick={onOpen}
            ></IconButton>
            <DeckNameModal
              id={params.id}
              label={'Deck Name'}
              name={deckName}
              setName={setDeckName}
              isOpen={isOpen}
              onClose={onClose}
            ></DeckNameModal>
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

        <Flex justify={'center'}>
          <TableContainer
            borderRadius={'2xl'}
            w={'92%'}
            bg={useColorModeValue('white', 'gray.900')}
            p={4}
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Question</Th>
                  <Th>Answer</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cards.map(card => (
                  <Tr key={card.id}>
                    {card.question}
                    <DeleteButton></DeleteButton>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </HomePageLayout>
  )
}

export default DeckPage
