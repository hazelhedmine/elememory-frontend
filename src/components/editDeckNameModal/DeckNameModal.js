/*
This component creates the modal popover to change the question and
answer values of the card. Formik was used for form.

The success toast is also created here.
*/

import {
  Button,
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
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import deckService from 'services/decks'

const DeckNameModal = ({ id, label, name, setName, isOpen, onClose }) => {
  const toast = useToast()
  const formik = useFormik({
    enableReinitialize: true, //to enable update after rerender
    initialValues: {
      name: name,
    },
    onReset: () => {
      onClose()
    },
    onSubmit: async values => {
      const res = await deckService
        .update(id, {
          name: values.name,
        })
        .catch(error => {
          if (error.response.status === 400) {
            setToast('Invalid Input!', 'error')
          } else {
            console.log('error :>> ', error)
            setToast('Unknown Error', 'error')
          }
        })
      if (res.status === 200) {
        setName(values.name)
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onEsc={formik.handleReset} // these lines are reset fields if unsaved
      onOverlayClick={formik.handleReset}
      isCentered
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader>Edit value</ModalHeader>
        <ModalCloseButton onClick={formik.handleReset}></ModalCloseButton>
        <ModalBody>
          <FormControl>
            <FormLabel>{label}</FormLabel>
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
            Save
          </Button>
          <Button variant={'ghost'} onClick={formik.handleReset}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeckNameModal
