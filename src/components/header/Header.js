const { Flex } = require('@chakra-ui/react')
const { ColorModeSwitcher } = require('./ColorModeSwitcher')

const Header = props => {
  return (
    <Flex align="center" justify="space-between" w="100%" p={4} {...props}>
      <span></span>
      <ColorModeSwitcher justifySelf="flex-end"></ColorModeSwitcher>
    </Flex>
  )
}

export default Header
