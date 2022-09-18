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

const DeckName = ({ name }) => {
  return (
    <Td>
      <Button variant={'link'} colorScheme={'black'} size={'s'}>
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

const DeleteButton = () => {
  return (
    <Td isNumeric>
      <Button colorScheme={'red'} variant={'ghost'} size={'xs'}>
        DELETE
      </Button>
    </Td>
  )
}

const CardDeckTable = ({ decks }) => {
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
              <DeckName name={deck.name}></DeckName>
              <StartButton></StartButton>
              <DeleteButton></DeleteButton>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CardDeckTable
