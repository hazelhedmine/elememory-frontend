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

const CardModal = ({
  question,
  answer,
  setQuestion,
  setAnswer,
  isOpen,
  onClose,
}) => {
  const successToast = useToast()
  const formik = useFormik({
    initialValues: {
      question: question,
      answer: answer,
    },
    onReset: () => {
      onClose()
    },
    onSubmit: values => {
      console.log('values :>> ', values)
      setQuestion(values.question)
      setAnswer(values.answer)
      onClose() // to close modal
      successToast({
        title: 'Card has been updated.',
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
    },
  })
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
        <ModalHeader>Edit your card</ModalHeader>
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

export default CardModal
