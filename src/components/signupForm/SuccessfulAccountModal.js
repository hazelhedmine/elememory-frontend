import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const SuccessfulAccountModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: 'xs', sm: 'md' }}
    >
      <ModalOverlay></ModalOverlay>
      <ModalContent alignItems={'center'}>
        <ModalHeader m={2} textAlign={'center'}>
          Thank you for signing up!
        </ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody textAlign={'center'}>
          Your account has been successfully created.
        </ModalBody>

        <ModalFooter>
          <VStack gap={2} m={2}>
            <NavLink to={'/login'}>
              <Box>
                <Button colorScheme={'yellow'} w="100%">
                  Login to Your Account
                </Button>
              </Box>
            </NavLink>
            <NavLink to={'/'}>
              <Button variant={'link'}>Return to Main Page</Button>
            </NavLink>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SuccessfulAccountModal
