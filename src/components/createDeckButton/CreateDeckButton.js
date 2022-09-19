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
import deckService from 'services/decks'

const CreateDeckButton = ({ userId, decks, setDecks }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formik = useFormik({
    enableReinitialize: true, //to enable update after rerender
    initialValues: {
      decks,
    },
    onReset: () => {
      onClose()
    },
    onSubmit: async values => {
      const res = await deckService
        .post({
          name: values.name,
          userId: userId,
        })
        .catch(error => {
          if (error.response.status === 400) {
            setToast('Invalid Input!', 'error')
          } else {
            console.log('error :>> ', error)
            setToast('Unknown Error', 'error')
          }
        })
      if (res.status === 201) {
        const newDeck = { name: res.data.name, id: res.data.id }
        setDecks([...decks, newDeck])
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
        Create Deck
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
          <ModalHeader>Create Deck</ModalHeader>
          <ModalCloseButton onClick={formik.handleReset}></ModalCloseButton>
          <ModalBody>
            <FormControl>
              <FormLabel>Deck Name</FormLabel>
              <Input
                id="name-input"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
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

export default CreateDeckButton
