import DeleteDeckButton from 'components/deleteDeckButton/DeleteDeckButton'
import { Link } from 'react-router-dom'

const {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  useColorModeValue,
  Tbody,
  Td,
  Button,
} = require('@chakra-ui/react')

const DeckName = ({ name, id }) => {
  return (
    <Td>
      <Button
        variant={'link'}
        colorScheme={'black'}
        size={'s'}
        as={Link}
        to={`/deck/${id}`}
      >
        {name}
      </Button>
    </Td>
  )
}

const StartButton = () => {
  return (
    <Td isNumeric>
      <Button colorScheme={'green'} size={'xs'}>
        START
      </Button>
    </Td>
  )
}

const CardDeckTable = ({ decks, setDecks }) => {
  return (
    <TableContainer
      borderRadius={'2xl'}
      w={'92%'}
      bg={useColorModeValue('white', 'gray.900')}
      p={4}
    >
      <Table>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {decks.map(deck => (
            <Tr key={deck.id}>
              <DeckName name={deck.name} id={deck.id}></DeckName>
              <StartButton></StartButton>
              <DeleteDeckButton
                deckId={deck.id}
                decks={decks}
                setDecks={setDecks}
              ></DeleteDeckButton>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CardDeckTable
