import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Footer from 'components/footer/Footer'

describe('<Footer />', () => {
  beforeEach(() => {
    render(<Footer></Footer>)
  })

  test('successfully renders', () => {
    const copyright = screen.findByText(
      'Hazel Hedmine Tan. All Rights Reserved.'
    )
    expect(copyright).toBeDefined()
  })
})
