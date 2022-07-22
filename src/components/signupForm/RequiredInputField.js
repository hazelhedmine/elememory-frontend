import { Input } from '@chakra-ui/react'

const RequiredInputField = props => {
  const { setIsMissing, value, setValue, ...rest } = props
  const handleChange = event => {
    event.preventDefault()
    setValue(event.target.value)
    setIsMissing.off()
  }

  return (
    <Input
      type="text"
      focusBorderColor="yellow.400"
      value={value}
      onChange={handleChange}
      {...rest}
    />
  )
}

export default RequiredInputField
