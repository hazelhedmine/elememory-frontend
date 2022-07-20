/*
This component creates the flash card.

useState is used for question and answer values to handle change.
*/

import { EditIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import CardModal from './CardModal'

const Card = props => {
  const [question, setQuestion] = useState(props.question)
  const [answer, setAnswer] = useState(props.answer)
  const [showAnswer, toggleShowAnswer] = useBoolean()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex
      borderWidth="1px"
      borderRadius="3xl"
      w={{ base: '90%', sm: '480px', md: '540px' }}
      height={{ base: '476px', sm: '20rem' }}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      padding={4}
      direction={'column'}
      justify={'space-between'}
      align={'center'}
    >
      <Box display={'grid'} gridTemplateColumns={'1fr 1fr 1fr'}>
        <Stack
          gridColumnStart={2}
          align={'center'}
          justify={'center'}
          direction={'row'}
        >
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            your
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            tags
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            here
          </Badge>
        </Stack>
        <Box marginLeft={'auto'}>
          <IconButton
            colorScheme={'yellow'}
            size={'sm'}
            icon={<EditIcon></EditIcon>}
            onClick={onOpen}
          ></IconButton>
          <CardModal
            question={question}
            answer={answer}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            isOpen={isOpen}
            onClose={onClose}
          ></CardModal>
        </Box>
      </Box>

      <Text
        padding={2}
        fontSize={'lg'}
        textAlign={'center'}
        overflowWrap={'anywhere'}
        wordBreak={'break-word'}
        whiteSpace={'break-spaces'}
      >
        {showAnswer ? answer : question}
      </Text>

      <Box>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          colorScheme={'yellow'}
          onClick={toggleShowAnswer.toggle}
        >
          {showAnswer ? 'Show Question' : 'Show Answer'}
        </Button>
      </Box>
    </Flex>
  )
}

export default Card
