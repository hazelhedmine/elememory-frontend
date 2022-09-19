import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import cardService from 'services/cards'

const DeleteCardButton = ({ cardId, cards, setCards }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async e => {
    e.preventDefault()

    const res = await cardService.remove(cardId).catch(error => {
      if (error.response.status === 500) {
        setToast('Please try again.', 'error')
      } else {
        console.log('error :>> ', error)
        setToast('Unknown Error', 'error')
      }
    })
    if (res && res.status === 204) {
      const updatedCards = cards.filter(c => c.id !== cardId)
      setCards(updatedCards)
      onClose() // to close modal
      setToast('Successfully Deleted!', 'success')
    }
  }

  const setToast = (title, type) => {
    toast({
      title: title,
      status: type,
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Td isNumeric>
      <Button
        colorScheme={'red'}
        variant={'ghost'}
        size={'xs'}
        onClick={onOpen}
      >
        DELETE
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Delete Card Confirmation</ModalHeader>
          <ModalCloseButton onClick={onClose}></ModalCloseButton>
          <ModalBody>Are you sure? This action cannot be reversed.</ModalBody>

          <ModalFooter>
            <Button colorScheme={'red'} mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Td>
  )
}

export default DeleteCardButton
