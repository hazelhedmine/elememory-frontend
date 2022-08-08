const {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  useColorModeValue,
  Tbody,
  Td,
  Button,
} = require('@chakra-ui/react')

const StartButton = () => {
  return (
    <Td isNumeric>
      <Button colorScheme={'green'} size={'xs'}>
        START
      </Button>
    </Td>
  )
}

const EditButton = () => {
  return (
    <Td isNumeric>
      <Button variant={'ghost'} size={'xs'}>
        VIEW / EDIT
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

const CardDeckTable = props => {
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
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>Test1</Td>
            <StartButton></StartButton>
            <EditButton></EditButton>
            <DeleteButton></DeleteButton>
          </Tr>
          <Tr>
            <Td>Test2</Td>
            <StartButton></StartButton>
            <EditButton></EditButton>
            <DeleteButton></DeleteButton>
          </Tr>
          <Tr>
            <Td>Test3</Td>
            <StartButton></StartButton>
            <EditButton></EditButton>
            <DeleteButton></DeleteButton>
          </Tr>
          <Tr>
            <Td>Test4</Td>
            <StartButton></StartButton>
            <EditButton></EditButton>
            <DeleteButton></DeleteButton>
          </Tr>
          <Tr>
            <Td>Test5</Td>
            <StartButton></StartButton>
            <EditButton></EditButton>
            <DeleteButton></DeleteButton>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CardDeckTable
