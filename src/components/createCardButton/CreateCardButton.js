import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import cardService from 'services/cards'

const CreateCardButton = ({ deckId, cards, setCards }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formik = useFormik({
    enableReinitialize: true, //to enable update after rerender
    initialValues: {
      question: '',
      answer: '',
    },
    onReset: () => {
      onClose()
    },
    onSubmit: async values => {
      const res = await cardService
        .post({
          question: values.question,
          answer: values.answer,
          deckId: deckId,
        })
        .catch(error => {
          if (error.response.status === 400) {
            setToast('Invalid Input!', 'error')
          } else {
            console.log('error :>> ', error)
            setToast('Unknown Error', 'error')
          }
        })
      if (res && res.status === 201) {
        const newCard = {
          question: res.data.question,
          answer: res.data.answer,
          id: res.data.id,
        }
        setCards([...cards, newCard])
        onClose() // to close modal
        setToast('Successfully Updated!', 'success')
      }
    },
  })

  const setToast = (title, type) => {
    toast({
      title: title,
      status: type,
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Flex justify="center" mb={6}>
      <Button
        rightIcon={<AddIcon />}
        size="md"
        colorScheme="yellow"
        variant="solid"
        onClick={onOpen}
      >
        Create Card
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onEsc={formik.handleReset} // these lines are reset fields if unsaved
        onOverlayClick={formik.handleReset}
        isCentered
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Create Card</ModalHeader>
          <ModalCloseButton onClick={formik.handleReset}></ModalCloseButton>
          <ModalBody>
            <FormControl>
              <FormLabel>Question</FormLabel>
              <Input
                id="question-input"
                name="question"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.question}
                autoComplete="off"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Answer</FormLabel>
              <Input
                id="answer-input"
                name="answer"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answer}
                autoComplete="off"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme={'yellow'}
              mr={3}
              onClick={formik.handleSubmit}
            >
              Create
            </Button>
            <Button variant={'ghost'} onClick={formik.handleReset}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default CreateCardButton
