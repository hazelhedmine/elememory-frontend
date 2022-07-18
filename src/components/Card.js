import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react'

const Card = ({ question, answer }) => {
  const [showAnswer, toggleShowAnswer] = useBoolean()

  return (
    <Center>
      <Flex
        borderWidth="1px"
        borderRadius="3xl"
        w={{ base: '90%', sm: '480px', md: '540px' }}
        height={{ base: '476px', sm: '20rem' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}
      >
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Stack align={'center'} justify={'center'} direction={'row'}>
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

          <Text
            padding={2}
            fontSize="lg"
            textAlign="center"
            overflowWrap="anywhere"
            wordBreak="break-word"
            whiteSpace="break-spaces"
          >
            {showAnswer ? answer : question}
          </Text>

          <Box>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme="yellow"
              onClick={toggleShowAnswer.toggle}
            >
              {showAnswer ? 'Show Question' : 'Show Answer'}
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Center>
  )
}

export default Card
