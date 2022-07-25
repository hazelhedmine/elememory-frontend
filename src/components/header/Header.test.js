import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('<Header />', () => {
  it('successfully renders', () => {
    const { container } = render(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>
    )

    const colorModeButton = container.querySelector('#color-mode-button')
    expect(colorModeButton).toBeDefined()

    const loginButton = screen.getByText('LOGIN')
    expect(loginButton).toBeDefined()

    const signUpButton = screen.getByText('SIGN UP')
    expect(signUpButton).toBeDefined()
  })
})
